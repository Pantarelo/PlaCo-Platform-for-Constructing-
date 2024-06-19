import {getAllWorkers, getAllClients} from "../models/userModel.js";

async function getWorkers(req, res) {
    try {
        const jobs = await getAllWorkers();

        console.log(jobs);


        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(jobs));

    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "Workers was not find!"}));
    }
}

async function getClients(req, res) {
    try {
        const jobs = await getAllClients();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(jobs));

    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "Clients was not find!"}));
    }
}

export {getClients,getWorkers}