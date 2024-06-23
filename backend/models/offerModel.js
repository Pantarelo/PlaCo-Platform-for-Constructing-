import { getConnectionDb } from "../utils/getConnectionDb.js";

function createNewOffer(offer) {
    return new Promise(async (resolve,reject) => {
        try {
            const db = await getConnectionDb();
            const {idWorker, idAd, offerValue} = offer;

            // console.log(idWorker);  

            db.connect().then(
                async () => {
                    const query = `INSERT INTO public."WorkersOffers" ("idAd", "idWorker", "offerValue") VALUES ($1, $2, $3) RETURNING *`;
                    const values = [idAd, idWorker,offerValue];

                    const res = await db.query(query,values);

                    console.log(res.rows[0]);
                    resolve(res.rows[0]);
                    // await db.end();
                }
            )
            .catch((error) => reject(error))
        } catch (error) {
            reject(error);
        }
    })
}

function getOffers(idAd) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getConnectionDb();

            db.connect()
            .then(async ()=> {
                const query = `SELECT * from public."WorkersOffers" where "idAd"=${idAd};`;

                const res = await db.query(query);

                resolve(res.rows);
            })
            .catch((error) => console.log(error)) 
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

function deleteOffer(idOffer) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getConnectionDb();

            db.connect()
            .then(async () => {
                const query = `DELETE FROM public."WorkersOffers" WHERE "idOffer"=${idOffer};`;

                const res = await db.query(query);

                resolve(res.rows[0]);
            })
            .catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

export {createNewOffer, getOffers, deleteOffer};