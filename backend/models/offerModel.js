import { getConnectionDb } from "../utils/getConnectionDb.js";

function createNewOffer(offer) {
    return new Promise(async (resolve,reject) => {
        try {
            const db = await getConnectionDb();
            const {idWorker, idAd, offerValue, pending} = offer;

            // console.log(idWorker);  

            db.connect().then(
                async () => {
                    const query = `INSERT INTO public."WorkersOffers" ("idAd", "idWorker", "offerValue", pending) VALUES ($1, $2, $3, $4) RETURNING *`;
                    const values = [idAd, idWorker,offerValue,pending];

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

export {createNewOffer};