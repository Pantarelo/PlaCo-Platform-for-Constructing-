import { getCookie } from "../utils/cookies.js";

const category = document.getElementById("category-input");
const details = document.getElementById("skills-description-input");
const img = document.getElementById("skills-upload-photo");

async function skillsWorker(url, data) {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const post = document.getElementById("new_skill");

    post.addEventListener('click', async (e) => {
        e.preventDefault();

        const categoryText = category.value;
        const detailsText = details.value;
        const imgText = img.files[0];

        const binaryImg = new Blob([imgText], {type: imgText.type});

        if(categoryText && detailsText && imgText) {
            const data = {
                "category": categoryText,
                "description": detailsText,
                "img": binaryImg
            }

            const res = await skillsWorker("http://localhost:3000/api/worker/skills", data);
        }
    })
});