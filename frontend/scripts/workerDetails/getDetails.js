import { getCookie } from "../utils/cookies.js";

async function getDetailsWorker(url) {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const workerDetails = await getDetailsWorker("http://localhost:3000/api/worker/details");

        document.getElementById('contact').value = workerDetails.contact;
        document.getElementById('description-input').value = workerDetails.description;

        const dropArea = document.getElementById("drop-area");
        dropArea.style.backgroundImage = `url(${`data:image/jpeg;base64,${workerDetails.img}`})`;

        const imgView = document.getElementById("img-view");
        imgView.textContent = "";

    } catch (error) {
        console.error('Error fetching worker details:', error);
    }
});