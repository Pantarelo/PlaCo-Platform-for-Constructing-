import { getConnectionDb } from "../utils/getConnectionDb.js"

function register(user) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            const {email, phone, password1} = user;
            console.log(email);
            console.log(phone);
            console.log(password1);

            client
            .connect()
            .then(async () => {

                console.log("The connection was established!")

                const text = `INSERT INTO public."User" (email, phone, password) VALUES ($1, $2, $3) RETURNING *`;
                const values = [email, phone, password1];

                const res = await client.query(text, values);
                console.log(res.rows[0]);
    
                await client.end();
    
                console.log('Connection to PostgreSQL closed');
    
                resolve(res.rows[0]);
            })
        } catch (error) {
            reject(error);
        }
    })
}

export { register };

