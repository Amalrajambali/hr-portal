import express, { Application, Request, Response } from "express";

const City=require("./cityModel")
const app=express.Router();


app.get("/",async (req: Request, res: Response) => {
    try {
        let city=await City.find()
        res.send(city)
    } catch (e) {
        res.send(e);
    }
})

module.exports = app;