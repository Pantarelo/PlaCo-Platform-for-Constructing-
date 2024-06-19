import { getConnectionDb } from "../utils/getConnectionDb.js";

function getAllWorkers() {
    return new Promise(async (resolve,reject) => {
        try {
            const client = await getConnectionDb();

            client
            .connect()
            .then(async ()=> {
                
                console.log("The connection was established!")

                const query = `SELECT * FROM public."User" WHERE TYPE='1';` 
                const res = await client.query(query);

                resolve(res.rows);
                
                client
                    .end()
                    .then(() => {
                        console.log('Connection to PostgreSQL closed');
                    })
                    .catch((err) => {
                        console.error('Error closing connection', err);
                    });
            })
            .catch((error) => {reject(error)})
            
        } catch (error) {
            reject(error)
        }
    })
}

function getAllClients() {
    return new Promise(async (resolve,reject) => {
        try {
            const client = await getConnectionDb();

            client
            .connect()
            .then(async ()=> {
                
                console.log("The connection was established!")

                const query = `SELECT * FROM public."User" WHERE TYPE='2';` 
                const res = await client.query(query);

                resolve(res.rows);
                
                client
                    .end()
                    .then(() => {
                        console.log('Connection to PostgreSQL closed');
                    })
                    .catch((err) => {
                        console.error('Error closing connection', err);
                    });
            })
            .catch((error) => {reject(error)})
            
        } catch (error) {
            reject(error)
        }
    })
}

export {getAllWorkers, getAllClients};