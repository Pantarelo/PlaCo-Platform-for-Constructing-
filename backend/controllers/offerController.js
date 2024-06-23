import { createNewOffer, getOffers, deleteOffer } from "../models/offerModel.js";
import {getBodyData} from "../utils/getBodyData.js";

async function createNewWorkOffer(req,res) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }
        
        const offer = await getBodyData(req);        
        const response = await createNewOffer(offer);

        res.writeHead(201, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({"message": "Oferta a fost creata", "offer": response}));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Oferta nu a fost creata"}));
    }
}

async function getAdOffersList(req, res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const offers = await getOffers(id);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(offers));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la furnizare listei de oferte!"}));
    }
}

async function deleteOfferFromList(req,res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const offerDeleted = await deleteOffer(id);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(offerDeleted));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la stergerea ofertei!"}));
    }
}

export {createNewWorkOffer,getAdOffersList, deleteOfferFromList};