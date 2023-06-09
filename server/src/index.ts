require("dotenv").config()
import express, { Application, Request, Response } from "express"
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
const dbConnect = require("./config/mongoConnect")
const usersRouter = require("./routes/UserRoute")
const documentRouter = require("./routes/DocumentRoute")
const cityRouter = require("./city/cityRoute")

const SpfxConnection = () => {
  sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/Amalraj",
          process.env.CLIENT_ID as string,
          process.env.CLIENT_SECRET as string
        ),
    },
  });
};
SpfxConnection();

const cors = require("cors")
const app: Application = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/users", usersRouter)
app.use("/doc", documentRouter)
app.use("/city", cityRouter)

app.get("/", async (req: Request, res: Response) => {
  res.send("hii")
})

app.listen(8081, async () => {
  await dbConnect();
  console.log(`port started at 8081 `)
})