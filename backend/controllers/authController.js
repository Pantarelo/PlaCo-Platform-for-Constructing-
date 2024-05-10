import {getBodyData} from "../utils/getBodyData.js"
import {register, login, logout} from "../models/authModel.js"

async function createAccount(req, res) {
    try {
        const {email, phone, password1, password2} = await getBodyData(req);

        const user = {
            email, 
            phone, 
            password1
        };

        console.log(password1);
        console.log(password2);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Adresa de email nu este valida' }));
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Numarul de telefon trebuie să aiba 10 cifre și să fie format doar din cifre' }));
            return;
        }

        if (password1 !== password2) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Parolele nu coincid' }));
            return;   
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password1)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Parola trebuie să contina cel putin o litera mare, o litera mica, o cifra, un caracter special si sa aiba minim 8 caractere' }));
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

async function authenticate(req, res) {
    try {
        const {email, password} = await getBodyData(req);

        const details = {
            email,
            password
        };

        const user = await login(details);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Autentificare reusita', user }));

    } catch(error) {
        console.error("Eroare la autentificare: ", error);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Autentificare esuata' }));
    }
}

async function userLogout(req, res) {
    try {
        const { email } = await getBodyData(req);

        await logout(email);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Logout reusit.' }));
    } catch(error) {
        console.error("Eroare la deconectare: ", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'A aparut o eroare la deconectare.' }));
    }
}

export { createAccount, authenticate, userLogout };