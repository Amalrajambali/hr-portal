import express, { Application, Request, Response } from "express"
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");

const usersRouter=require("./routes/UserRoute")
const documentRouter=require("./routes/DocumentRoute")

const SpfxConnection = () => {
    sp.setup({
      sp: {
        fetchClientFactory: () =>
          new SPFetchClient(
            "https://2mxff3.sharepoint.com/sites/Amalraj",
  
            "82f6321f-641b-4457-b69b-a1daeb46c101",
  
            "tbS1nEE37MNxRwVQJIS1XDrcF7/GPxF5cCeupotUWw0="
          ),
      },
    });
  };
  SpfxConnection();

//const express=require("express")
const cors = require("cors")
const app: Application = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/users",usersRouter)
app.use("/doc",documentRouter)

app.get("/", async(req: Request, res: Response) => {
   res.send("hii")
})


app.listen(8081, () => {
    console.log(`port started at${8080} `)
})