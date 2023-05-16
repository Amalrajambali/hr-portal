import express, { Application, Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";

const app = express.Router();

const multer = require("multer");
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        cb(null, `${__dirname}/../../Fileuploads`);
    },
    filename: (req: Request, file: any, cb: Function) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.get("/", async (req: Request, res: Response) => {
    try {
        const items: any[] = await sp.web.lists.getByTitle("users").items();
        res.send(items)
    } catch (e) {
        res.send(e);
    }
})

app.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const items: any[] = await sp.web.lists.getByTitle("users").items.getById(+id)();
        res.send(items)
    } catch (e) {
        res.send(e);
    }
})


app.post("/adduser", async (req: Request, res: Response) => {
    const form = req.body
    try {
        const addedUser = await sp.web.lists.getByTitle("users").items.add(form)
        const resp = await sp.web.getFolderByServerRelativePath("usersLibrary").addSubFolderUsingPath(`${addedUser.data.Id}`)
        res.send(addedUser)
    } catch (e) {
        res.send(e);
    }

})

app.delete("/delete/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const list = await sp.web.lists.getByTitle("users");
        list.items.getById(+id).delete();
        res.send("User Deleted")
    } catch (e) {
        res.send(e);
    }
})

app.patch("/update/:id", upload.single("userImage"), async (req: Request, res: Response) => {

    const { id } = req.params;
    const data = JSON.parse(req.body.userData);
    try {
        const list = await sp.web.lists.getByTitle("users");
        if ((req as any).file) {
            const image = fs.readFileSync((req as any).file?.path);
            let addedImage = await sp.web.getFolderByServerRelativePath(`usersLibrary/${id}`).files.addUsingPath((req as any).file.originalname, image, { Overwrite: true });
            await list.items.getById(+id).update({
                imageUrl: addedImage?.data?.ServerRelativeUrl,
            });
        }
        await list.items.getById(+id).update({
            name: data.name,
            department: data.department,
            designation: data.designation,
            email: data.email,
            phone: data.phone,
            city: data.city,
        });
        res.send("user updated")
    }
    catch (e) {
        res.send(e);
    }
})
module.exports = app




