const email = document.getElementById("emailLogin");
const password = document.getElementById("password");

async function accountLogin(url, data) {
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })

    return response.json();
}

function handleSuccessfulAuth(res) {
    // localStorage.setItem('token', res.token);
    document.cookie = "token=" + res.token + "; path=/";
    console.log('login reusita:', res);

    const tokenData = JSON.parse(atob(res.token.split('.')[1]));
    document.cookie = 'userId='+ tokenData.id + "; path=/";
    document.cookie = 'logged='+ 1 + "; path=/";
    document.cookie = 'typeOfUser='+ tokenData.type + "; path=/";

    window.location.href = "../index.html";
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
                handleSuccessfulAuth(res);
            } else {
                console.error('Login esuat:', res);
            }
        }
    });
});