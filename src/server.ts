import cors from "cors";
import express, { Express } from "express";
import credentialRouter from "./Routers/credentialsRouter";
import userRouter from "./Routers/usersRouter";
import wifiRouter from "./Routers/wifiRouter";
import Cryptr from "cryptr";

export const app = express()

app
    .use(cors())
    .use(express.json())
    .use("/health", (_req, res) => res.send("OK"))
    .use(userRouter)
    .use(wifiRouter)
    .use(credentialRouter);

     
export const cryptr = new Cryptr("myTotallySecretKey");
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`app is running on PORT ${port}`)
})