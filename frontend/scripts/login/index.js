const email = document.getElementById("emailLogin");
const password = document.getElementById("password");

async function accountLogin(url, data) {
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const emailText = email.value;
        const passwordText = password.value;

        if(emailText && passwordText) {
            const data = {
                "email": emailText,
                "password": passwordText
            }

            const res = await accountLogin("http://localhost:3000/api/login", data);

            if (res.token) {
                localStorage.setItem('token', res.token);
                console.log('Autentificare reusita:', res);
            } else {
                console.error('Autentificare esuata:', res);
            }
        }
    });
});