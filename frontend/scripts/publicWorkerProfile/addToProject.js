import { getCookie } from '../utils/cookies.js';

const projectSelected = document.getElementById('ads_selector');
const addProjectButton = document.getElementById('add_project_button');

addProjectButton.addEventListener('click', async () => {

    const projectId = projectSelected.value;
    console.log(projectId);
    const searchParams = new URLSearchParams(window.location.search);
    const workerId = searchParams.get('id');
    const token = getCookie('token');

    await fetch(`http://localhost:3000/api/offer`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            idAd: projectId,
            idWorker: workerId
        }),
    })
        .then(response => response.json())
        .then((data) => {console.log(data);})
        .catch((error) => {
            console.error('Error:', error);
        });
});