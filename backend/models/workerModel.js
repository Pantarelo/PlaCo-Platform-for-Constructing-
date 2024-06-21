import { getConnectionDb } from "../utils/getConnectionDb.js";

function details(addDetails) {
    return new Promise(async (resolve, reject) => {
        try {
            const addDB = await getConnectionDb();
            const { contact, description, img, id_client } = addDetails;

            addDB.connect()
                .then(async () => {
                    try {
                        const res = await addDB.query('SELECT 1 FROM public."WorkerDetails" WHERE id_client = $1', [id_client]);
                        console.log(res);

                        if (res.rows.length > 0) {
                            await addDB.query(
                                'UPDATE public."WorkerDetails" SET img = $1, contact = $2, description = $3 WHERE id_client = $4',
                                [img, contact, description, id_client]
                            );
                        } else {
                            const text = `INSERT INTO public."WorkerDetails" (img, contact, description, id_client) VALUES ($1, $2, $3, $4) RETURNING *`;
                            const values = [img, contact, description, id_client];
                            const insertedProfile = await addDB.query(text, values);
                        }

                        resolve("Operation successful");
                    } catch (queryError) {
                        reject(`Database operation failed: ${queryError.message}`);
                    } finally {
                        await addDB.end();
                    }
                })
                .catch(connectError => {
                    reject(`Connection to database failed: ${connectError.message}`);
                });
        } catch (error) {
            reject(error);
        }
    });
}

function getDetailsById(id_client) {
    return new Promise(async (resolve, reject) => {
        try {
            const adDB = await getConnectionDb();

            adDB.connect()
            .then(async () => {

                const query = `SELECT * FROM public."WorkerDetails" WHERE id_client = $1`;
                const values = [id_client];

                const res = await adDB.query(query, values);
                
                if (res.rows.length === 0) {
                    reject(new Error('No details found for the given client ID'));
                    return;
                }

                const workerDetails = res.rows[0];
                const imgBase64 = workerDetails.img ? workerDetails.img.toString('base64') : null;

                const details = {
                    ...workerDetails,
                    img: imgBase64
                };

                await adDB.end();

                resolve(details);

            })
        } catch(error) {
            reject(error);
        }
    })
}

export { details, getDetailsById };
