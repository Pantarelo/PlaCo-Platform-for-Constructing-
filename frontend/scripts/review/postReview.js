import { getCookie } from "../utils/cookies.js";

const stars = document.querySelectorAll('.star-rating .fa-star');
let rating = 0;
const comments = document.getElementById('comments');

async function review(url, data) {
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
    const saveButton = document.getElementById("saveButton");

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            rating = index + 1;
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.remove('fa-regular');
                    s.classList.add('fa-solid');
                } else {
                    s.classList.remove('fa-solid');
                    s.classList.add('fa-regular');
                }
            });
        });
    });

    saveButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams(window.location.search);
        const workerId = searchParams.get("id");

        const starsNumber = rating;
        const commentText = comments.value;
        console.log(workerId + " " + starsNumber);

        const reviewData = {
            "stars": starsNumber,
            "comment": commentText
        };

        const response = await review(`http://localhost:3000/api/review/${workerId}`, reviewData);

    });
});