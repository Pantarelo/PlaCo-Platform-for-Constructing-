import { getConnectionDb } from "../utils/getConnectionDb.js"

function create(job) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            const {title, description, salary, img} = JSON.parse(job);

            client
            .connect()
            .then(async ()=> {
                
                console.log("The connection was established!")

                const text = `INSERT INTO public."Jobs" (title, description, img, salary) VALUES($1, $2, $3, $4) RETURNING *`;
                const values = [title, description, img, salary];
               
                const res = await client.query(text,values);
                console.log(res.rows[0]);
                
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

           
            resolve(JSON.parse(job));
        } catch (error) {
            reject(error)
        }
    })
}

function findAllJobs() {
    return new Promise(async(resolve, reject) => {
        const client = await getConnectionDb();
        client
            .connect()
            .then(async ()=> {
                console.log("The connection was established!")

                const query = `SELECT * FROM public."Jobs";` 
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
            .catch((error) => reject(error));
    })
}

export {create, findAllJobs}