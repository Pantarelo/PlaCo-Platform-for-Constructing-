import { getConnectionDb } from "../utils/getConnectionDb.js"
import bcrypt from 'bcrypt';

function register(user) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            const {email, phone, password1, type} = user;

            const salt = await bcrypt.genSalt(10);

            const hashPasword = await bcrypt.hash(password1, salt);

            client
            .connect()
            .then(async () => {

                console.log("The connection was established!")

                const text = `INSERT INTO public."User" (email, phone, password, type) VALUES ($1, $2, $3, $4) RETURNING *`;
                const values = [email, phone, hashPasword, type];

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

function login(user) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            const {email, password} = user;

            const query = `SELECT * FROM public."User" WHERE email = $1`;
            const values = [email];

            console.log(email);

            client
            .connect()
            .then(async () => {
                const result = await client.query(query, values);

                    if (result.rows.length === 0) {
                        reject("Emailul nu exista in baza de date.");
                    } else {
                        const user = result.rows[0];
                        const passwordMatch = await bcrypt.compare(password, user.password);
                        
                        if (passwordMatch) {
                            const updateQuery = `UPDATE public."User" SET "logStatus" = true WHERE email = $1`;
                            const updateValues = [email];
                            await client.query(updateQuery, updateValues);
                            resolve(user);
                        } else {
                            reject("Parola incorecta.");
                        }
                    }

                    await client.end();
            })
        } catch (error) {
            reject(error);
        }
    })
}

function logout(email) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();

            const query = `SELECT * FROM public."User" WHERE email = $1`;
            const values = [email];

            console.log(email);

            client.connect().then(async () => {
                const result = await client.query(query, values);

                if (result.rows.length === 0) {
                    reject("Emailul nu exista in baza de date.");
                } else {
                    const user = result.rows[0];

                    const updateQuery = `UPDATE public."User" SET "logStatus" = false WHERE email = $1`;
                    const updateValues = [email];
                    await client.query(updateQuery, updateValues);
                    resolve(user);
                }
            })
        } catch(error) {
            reject(error);
        }
    })
}

export { register, login, logout };

