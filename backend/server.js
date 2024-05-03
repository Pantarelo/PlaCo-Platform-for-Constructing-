import {createServer} from "node:http";
import { createJobAnnouncement } from "./controllers/jobController.js";


const port = 3000;

const server = createServer(async (req,res) => {

    if(req.url === "/api/createJobAd" && req.method == "POST")
    {
        createJobAnnouncement(req,res);
    }
})

server.listen(port, '127.0.0.1', () => {
    console.log("Listening on 127.0.0.1")
})