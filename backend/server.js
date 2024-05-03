import {createServer} from "node:http";
import { createJobAnnouncement } from "./controllers/jobController.js";
import { getConnectionDb } from "./utils/getConnectionDb.js";
import * as env from "dotenv"

env.config();
const port = 3000;

const client = await getConnectionDb();

client
    .connect()
    .then(async () => {
        console.log("The connection was established!")

        console.log("All the ads from jobs table:");
        const result = await client.query(`SELECT * FROM public."Jobs"`);
        console.log(result.rows);

        client
            .end()
            .then(() => {
                console.log('Connection to PostgreSQL closed');
            })
            .catch((err) => {
                console.error('Error closing connection', err);
            });
        
    }) 

const server = createServer(async (req,res) => {

    if(req.url === "/api/createJobAd" && req.method == "POST")
    {
        createJobAnnouncement(req,res);
    }
    else 
    {
        res.writeHead(404, {'Content-Type': "application/json"})
        res.end(JSON.stringify({message: "Route not found!"}));
    }
})

server.listen(port, '127.0.0.1', () => {
    console.log("Listening on 127.0.0.1")
})