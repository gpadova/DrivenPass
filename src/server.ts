import cors from "cors";
import express from "express";

const server = express()

server
    .use(cors())
    .use(express.json())

const port = +process.env.PORT || 4000;
server.listen(port, () =>{
    console.log(`Server is running on PORT ${port}`)
})