import {createServer} from "node:http";
import { createJobAnnouncement, getAllJobs } from "./controllers/jobController.js";
import { createAccount, authenticate, userLogout } from "./controllers/authController.js";
import { createAdClient, getClientAds } from "./controllers/addClientController.js"
import {getClients, getWorkers, changePassword} from "./controllers/userController.js";
import { getConnectionDb } from "./utils/getConnectionDb.js";
import authMiddleware from "./middleware/authMiddleware.js";
import corsMiddleware from "./middleware/crosMiddleware.js"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken';

//env.config();
dotenv.config();
const port = 3000;

const server = createServer(async (req,res) => {
    corsMiddleware(req, res, () => {
        if(req.url === "/api/user/worker" && req.method === "GET") {
            getWorkers(req,res);
        }
        else if(req.url === "/api/user/client" && req.method === "GET")
        {
            getClients(req,res);
        }
        else if(req.url === "/api/user/password" && req.method === "POST")
        {
            changePassword(req,res);
        }
        else if(req.url === "/api/jobs" && req.method === "GET")
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
        else if (req.url === "/api/logout" && req.method === "POST")
        {
            //userLogout(req, res);
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Access denied. No token provided.' }));
                return;
            }
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                userLogout(req, res);
            } catch (ex) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid token.' }));
            }
        }
        else if (req.url === "/api/client" && req.method === "POST") {
            createAdClient(req, res);
        }
        else if (req.url === "/api/client" && req.method === "GET") {
            getClientAds(req, res);
        }
        else 
        {
            res.writeHead(404, {'Content-Type': "application/json"})
            res.end(JSON.stringify({message: "Route not found!"}));
        }
    });
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})