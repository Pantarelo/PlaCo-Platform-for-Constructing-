import { getCookie } from "../utils/cookies.js";

const workerList = document.getElementById('list');

document.addEventListener("DOMContentLoaded", async () => {

    const searchParams = new URLSearchParams(window.location.search);
    const token = getCookie("token");
    const id = searchParams.get("id");

    const getOffers = async () => {
        const response = await fetch(`http://localhost:3000/api/offer/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.json();
    }

    const offersList = await getOffers();

    console.log(offersList);
    
    offersList.map((offer)=> {
        const workerContainer = document.createElement('div');
        workerContainer.className = "worker_container";
    
        const anchorTag = document.createElement('a');
        anchorTag.href=`../pages/public_worker_profile.html?id=${offer.idWorker}`;
    
        const workerImg = document.createElement('img');
        workerImg.className="worker_img"
        workerImg.src="../assets/images/ad_5.jpg"
        anchorTag.appendChild(workerImg);
    
    
        const workerOffer = document.createElement('span');
        workerOffer.className = "worker_offer";
        workerOffer.innerText = offer.offerValue;
    
        const divButtons = document.createElement('div');
    
        const iconAccept = document.createElement('i');
        iconAccept.className = "fa-solid fa-circle-check fa-2xl";
        iconAccept.style = "color: #ffffff;"
    
        const acceptButton = document.createElement('button');
        acceptButton.className = "accept_button";
        acceptButton.appendChild(iconAccept);
    
    
        const iconReject = document.createElement('i');
        iconReject.style = "color: #ffffff;"
        iconReject.className ="fa-solid fa-eraser fa-2xl";
    
        const rejectButton = document.createElement('button'); 
    
        rejectButton.className = "reject_button";
        rejectButton.appendChild(iconReject);
    
        divButtons.appendChild(acceptButton);
        divButtons.appendChild(rejectButton);
    
        workerContainer.appendChild(anchorTag);
        workerContainer.appendChild(workerOffer);
        workerContainer.appendChild(divButtons);
    
        workerList.appendChild(workerContainer);
    })


   
})