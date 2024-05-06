import {getBodyData} from "../utils/getBodyData.js"
import { create, findAllJobs } from "../models/jobModel.js";

async function createJobAnnouncement(req,res) {
    try {
        const {title, description, salary, img} = await getBodyData(req);

        const job = {
            title,
            description,
            salary,
            img
        }

        const newJob = await create(JSON.stringify(job));

        res.writeHead(202, {"Content-Type": "appliction/json"});
        res.end(JSON.stringify(newJob));

    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "The job was not created!"}));
    }
}

async function getAllJobs(req,res) {
    try {
        const jobs = await findAllJobs();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(jobs));

    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "The jobs was not find!"}));
    }
}

export {createJobAnnouncement,getAllJobs}