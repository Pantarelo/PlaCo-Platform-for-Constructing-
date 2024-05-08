import {getBodyData} from "../utils/getBodyData.js"
import {register} from "../models/authModel.js"

async function createAccount(req, res) {
    try {
        const {email, phone, password1, password2} = await getBodyData(req);

        const user = {
            email, 
            phone, 
            password1
        }

        console.log(password1);
        console.log(password2);
        
        if (password1 !== password2) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Parolele nu coincid' }));
            return;
        }

        await register(user);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Contul a fost creat cu succes' }));

    } catch(error) {
        console.error("Eroare la crearea contului: ", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'A aparut o eroare la crearea contului' }));

    }
}

export { createAccount };