import {createServer} from "node:http";
import { createJobAnnouncement, getAllJobs } from "./controllers/jobController.js";
import { createAccount, authenticate } from "./controllers/authController.js";
import { getConnectionDb } from "./utils/getConnectionDb.js";
import * as env from "dotenv"

env.config();
const port = 3000;

const server = createServer(async (req,res) => {

    if(req.url === "/api/jobs" && req.method === "GET")
    {
        getAllJobs(req,res);   
    }
    else if(req.url === "/api/createJobAd" && req.method === "POST")
    {
        createJobAnnouncement(req,res);
    }
    else if (req.url === "/api/register" && req.method === "POST")
    {
        createAccount(req, res);
    }
    else if (req.url === "/api/login" && req.method === "POST")
    {
        authenticate(req, res);
    }
    else 
    {
        res.writeHead(404, {'Content-Type': "application/json"})
        res.end(JSON.stringify({message: "Route not found!"}));
    }
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})