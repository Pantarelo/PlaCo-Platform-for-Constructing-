import { getCookie } from "../utils/cookies.js";

const title = document.getElementById("title-input");
const description = document.getElementById("description-input");
const category = document.getElementById("category-input");
const addPhoto = document.getElementById("upload-photo");

async function createNewAd(url, data) {
    const token = getCookie('token');

    console.log(data.img);
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
    const createAd = document.getElementById("create-ad-button");

    createAd.addEventListener('click', async (e) => {
        e.preventDefault();

        const titleText = title.value;
        const descriptionText = description.value;
        const categoryText = category.value;
        const imageInput = addPhoto.files[0];

        const binaryImg = new Blob([imageInput], {type: imageInput.type});


        if(titleText && descriptionText && categoryText && imageInput) {
            const data = {
                "title": titleText,
                "description": descriptionText,
                "category": categoryText,
                "img" : binaryImg
            }

            // console.log(data.img);

            const res = await createNewAd("http://localhost:3000/api/client", data);

            console.log("Result:" + JSON.stringify(res));
        }
    })
});