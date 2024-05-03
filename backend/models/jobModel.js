import { getConnectionDb } from "../utils/getConnectionDb.js"

function create(job) {
    return new Promise ((resolve, reject) => {
        try {
            const client = getConnectionDb();
            const {title, description, salary, img} = job;

            client
            .connect()
            .then(()=> {
                
                client.query(`INSERT INTO jobs(title, description, salary, img) VALUES (${title}, ${description}, ${salary}, ${img})`)
                client
				.end()
				.then(() => {
					console.log('Connection to PostgreSQL closed');
				})
				.catch((err) => {
					console.error('Error closing connection', err);
				});
            })

            resolve(product);
        } catch (error) {
            reject(error)
        }
    })
}

export {create}