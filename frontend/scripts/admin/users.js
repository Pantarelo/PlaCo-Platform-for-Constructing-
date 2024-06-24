import { getCookie } from "../utils/cookies.js";

document.addEventListener('DOMContentLoaded', async () => {

    const users = await fetch('http://localhost:3000/api/admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('token'),
        }
    })

    console.log(users);

    const usersList = await users.json();
    const dashboard = document.getElementById('dashboard');

    usersList.forEach(user => {

        const userContainer = document.createElement('div');
        userContainer.className = "user_container";

        const userText = document.createElement('span');
        userText.className = "user_text";
        userText.innerText = user.email;

        const userType = document.createElement('span');
        userType.className = "user_type";

        if(user.type === 0) {
            userType.innerText = "Admin";
        } else if(user.type === 1) {
            userType.innerText = "CLient";
        }
        else if(user.type === 2) {
            userType.innerText = "Worker";
        }

        const deleteButton = document.createElement('button');
        deleteButton.className = "delete_button";
        deleteButton.innerText = "Delete";

        userContainer.appendChild(userText);
        userContainer.appendChild(userType);
        userContainer.appendChild(deleteButton);

        dashboard.appendChild(userContainer);
    });

});