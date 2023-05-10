import express, { Application, Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";

const app = express.Router();

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

app.patch("/update/:id", async (req: Request, res: Response) => {
    // let addedImage;
    // if (image) {
    //     addedImage = await sp.web.getFolderByServerRelativePath(`usersLibrary/${id}`).files.addUsingPath(fileNamePath, image, { Overwrite: true });
    // }

    const { id } = req.params
    const { name, phone, email, city, department, designation } = req.body;
    try {
        const list = await sp.web.lists.getByTitle("users");
        await list.items.getById(+id).update({
            name: name,
            department: department,
            designation: designation,
            email: email,
            phone: phone,
            city: city,
            // imageUrl: addedImage?.data?.ServerRelativeUrl
        });
        res.send("user updated")
    }
    catch (e) {
        res.send(e);
    }
})
module.exports = app