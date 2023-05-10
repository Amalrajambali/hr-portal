import express, { Application, Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";

const app = express.Router();


app.get("/:id",async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const Documents = await sp.web.getFolderByServerRelativePath(`usersLibrary/${id}`).files();
        res.send(Documents)
    }catch(e)
    {
        res.status(404).send(e)
    }
})


module.exports=app;