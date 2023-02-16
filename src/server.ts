import cors from "cors";
import express from "express";
import credentialRouter from "./Routers/credentialsRouter";
import userRouter from "./Routers/usersRouter";
import wifiRouter from "./Routers/wifiRouter";

const server = express()

server
    .use(cors())
    .use(express.json())
    .use(wifiRouter)
    .use(userRouter)
    .use(credentialRouter)

const port = +process.env.PORT || 4000;
server.listen(port, () =>{
    console.log(`Server is running on PORT ${port}`)
})