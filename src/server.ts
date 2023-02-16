import cors from "cors";
import express, { Express } from "express";
import credentialRouter from "./Routers/credentialsRouter.js";
import userRouter from "./Routers/usersRouter.js";
import wifiRouter from "./Routers/wifiRouter.js";
import { connectDb } from "./Config/database.js";

export const app = express()

app
    .use(cors())
    .use(express.json())
    .use(wifiRouter)
    .use(userRouter)
    .use(credentialRouter)

export function init(): Promise<Express> {
        connectDb();
        return Promise.resolve(app);
      }    

const port = +process.env.PORT || 4000;
app.listen(port, () =>{
    console.log(`app is running on PORT ${port}`)
})