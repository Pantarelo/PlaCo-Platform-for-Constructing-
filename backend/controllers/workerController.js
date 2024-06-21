import { details, getDetailsById } from "../models/workerModel.js";
import { getBodyData } from "../utils/getBodyData.js";
import jwt from 'jsonwebtoken';

async function putDetails(req, res) {
    try {
        const {contact, description, img} = await getBodyData(req);

        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id_client = decodedToken.id;

        const addDetails = {
            contact, 
            description,
            img,
            id_client
        }

        const valid = await details(addDetails);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Detalii adaugate cu succes', valid }));
    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "Eroare in adaugarea detaliilor!"}));
    }
}

async function getDetails(req, res) {
    try{
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id_client = decodedToken.id;

        const detail = await getDetailsById(id_client);
        console.log("Worker details:", detail);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(detail));
    } catch(error) {
        console.error("Eroare la obtinerea detaliilor: ", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Nu s-au putut obtine detaliile' }));
    }
}

export { putDetails, getDetails };