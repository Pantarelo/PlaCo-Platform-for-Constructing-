import {createServer} from "node:http";
import { createAccount, authenticate, userLogout } from "./controllers/authController.js";
import { createAdClient, getClientAds,getAllAds, getAdById } from "./controllers/adClientController.js";
import { getClients, getWorkers, changePassword } from "./controllers/userController.js";
import { putDetails, getDetails, newSkill, getSkills, getDetailsByPathParam, getSkillsByWorkerId } from "./controllers/workerController.js";
import corsMiddleware from "./middleware/crosMiddleware.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { createNewWorkOffer, getAdOffersList } from "./controllers/offerController.js";

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
        else if(req.url === "/api/worker/details" && req.method === "PUT")
        { 
            putDetails(req,res);
        }
        else if(req.url === "/api/worker/details" && req.method === "GET")
        { 
            getDetails(req,res);
        }
        else if(req.url.startsWith("/api/worker/details") && req.method === "GET")
        {
            const id = req.url.split("/")[4];
            getDetailsByPathParam(req,res,id);   
        }
        else if(req.url === "/api/worker/skills" && req.method === "POST")
        { 
            newSkill(req,res);
        }
        else if(req.url === "/api/worker/skills" && req.method === "GET")
        { 
            getSkills(req,res);
        }
        else if(req.url.startsWith("/api/worker/skills") && req.method === "GET")
        {
            const id = req.url.split("/")[4];
            getSkillsByWorkerId(req,res,id);   
        }
        else if(req.url === "/api/user/password" && req.method === "POST")
        {
            changePassword(req,res);
        }
        else if(req.url === "/api/jobs" && req.method === "GET")
        {
            getAllJobs(req,res);   
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
        else if(req.url === "/api/client/ads" && req.method === "GET")
        {
            getAllAds(req,res);
        }
        else if (req.url === "/api/client" && req.method === "POST") {
            createAdClient(req, res);
        }
        else if (req.url === "/api/client" && req.method === "GET") {
            getClientAds(req, res);
        }
        else if(req.url.startsWith("/api/ad/") && req.method === "GET") {
            const id = req.url.split("/")[3];
            getAdById(req,res,id);
        }
        else if(req.url === "/api/offer" && req.method === "PUT") {
            createNewWorkOffer(req,res);
        }
        else if(req.url.startsWith("/api/offer") && req.method === "GET")
        {
            const id = req.url.split("/")[3];
            getAdOffersList(req,res,id);
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