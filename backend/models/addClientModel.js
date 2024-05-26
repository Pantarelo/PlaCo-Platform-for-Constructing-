import { getConnectionDb } from "../utils/getConnectionDb.js"

function addAd(add) {
    return new Promise(async (resolve, reject) => {
        try {
            const addDB = await getConnectionDb();

            const { title, description, category, id_client } = add;

            addDB.connect()
            .then(async () => {

                const query = `INSERT INTO public."ClientAdd" (title, description, category, id_client) VALUES ($1, $2, $3, $4) RETURNING *`;
                const values = [title, description, category, id_client];

                const res = await addDB.query(query, values);
                const newAd = res.rows[0];
                console.log(newAd);

                await addDB.end();

                resolve(newAd);
            })
        } catch(error) {
            reject(error);
        }
    })
}

function getAdsByClientId(id_client) {
    return new Promise(async (resolve, reject) => {
        try {
            const addDB = await getConnectionDb();

            addDB.connect()
            .then(async () => {

                const query = `SELECT * FROM public."ClientAdd" WHERE id_client = $1`;
                const values = [id_client];

                const res = await addDB.query(query, values);
                const ads = res.rows;
                console.log(ads);

                await addDB.end();

                resolve(ads);

            })
        } catch(error) {
            reject(error);
        }
    })
}

export { addAd, getAdsByClientId };