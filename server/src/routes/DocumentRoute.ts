import express, { Application, Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";
import fileType from "../fileFormat/fileType";

const app = express.Router();
const multer = require("multer");
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        cb(null, `${__dirname}/../../Imageuploads`);
    },
    filename: (req: Request, file: any, cb: Function) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const Documents = await sp.web.getFolderByServerRelativePath(`usersLibrary/${id}`).files();
        res.send(Documents)
    } catch (e) {
        res.status(404).send(e)
    }
})


app.post("/:id", upload.single("filename"), async (req: Request, res: Response) => {
    const data = fs.readFileSync((req as any).file.path)
    const { id } = req.params;
    if (data) {
        try {
            await sp.web.getFolderByServerRelativePath(`usersLibrary/${id}`)
                .files.addUsingPath((req as any).file.originalname, data,
                    { Overwrite: true, });
            res.send("Document uploaded");

        } catch (error) {
            res.status(400).send(error);
        }
    }
});

app.get("/download", async (req: Request, res: Response) => {
    const serverRelativePath = req.query.serverRelativePath as string;
    const file = sp.web.getFileByServerRelativePath(serverRelativePath);
    const buffer: ArrayBuffer = await file.getBuffer();
    const fileName = serverRelativePath.split("/").pop() || "";
    const contentType = fileType(fileName);
    res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-type", contentType);
    res.status(200).send(Buffer.from(buffer));
})

module.exports = app;