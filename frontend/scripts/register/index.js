const email = document.getElementById("emailRegister");
const phone = document.getElementById("phoneRegister");
const password1 = document.getElementById("password_1");
const password2 = document.getElementById("password_2");

async function createNewAccount(url, data) {
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('registerButton');
    const selectType = document.getElementById('userType');

    registerButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const emailText = email.value;
        const phoneText = phone.value;
        const password1Text = password1.value;
        const password2Text = password2.value;
        const selectedType = selectType.value;

        let typeValue;
        if (selectedType === 'Client') {
            typeValue = 1;
        } else if (selectedType === 'Worker') {
            typeValue = 2;
        }
        console.log(typeValue);


        if(emailText && phoneText && password1Text && password2Text && selectedType) {
            const data = {
                "email": emailText,
                "phone": phoneText,
                "password1": password1Text,
                "password2": password2Text,
                "type": typeValue
            }

            const res = await createNewAccount("http://localhost:3000/api/register", data);

            console.log(res);
        }
    });
});