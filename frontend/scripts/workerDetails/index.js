import { getCookie } from "../utils/cookies.js";

const contact = document.getElementById("contact");
const details = document.getElementById("description-input");
const img = document.getElementById("upload-photo");

async function detailsWorker(url, data) {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const change = document.getElementById("saveButton");

    change.addEventListener('click', async (e) => {
        e.preventDefault();

        const contactText = contact.value;
        const detailsText = details.value;
        const imgText = img.files[0];

        const binaryImg = new Blob([imgText], {type: imgText.type});

        if(contactText && detailsText && imgText) {
            const data = {
                "contact": contactText,
                "description": detailsText,
                "img": binaryImg
            }

            const res = await detailsWorker("http://localhost:3000/api/worker/details", data);
        }
    })
});