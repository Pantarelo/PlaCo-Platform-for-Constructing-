import {getBodyData} from "../utils/getBodyData.js"
import { create } from "../models/jobModel.js";

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

export {createJobAnnouncement}