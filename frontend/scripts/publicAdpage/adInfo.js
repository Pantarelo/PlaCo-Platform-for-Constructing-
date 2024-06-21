import { getCookie } from "../utils/cookies.js";

const description = document.getElementById('description');
const title = document.getElementById('title');
const makeOfferButton = document.getElementById('makeOfferButton');
const offer = document.getElementById('offer');
const adImg = document.getElementById('ad_img');

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = getCookie('token');
    
    const getAdInfo = async () => {
        const id = searchParams.get('id');
        
    
        const response = await fetch(`http://localhost:3000/api/ad/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }); 
    
        return response.json();
    }

    const makeOffer = async () => {
        const idAd = searchParams.get('id');
        const idWorker = getCookie('userId');
        const pending = false;
        console.log(offer);
        const offerValue = parseInt(offer.value);

        console.log(offerValue);

        const offerDetails = {
            "idAd" : idAd,
            "idWorker": idWorker,
            "offerValue": offerValue,
            "pending" : pending
        }

        const response = await fetch(`http://localhost:3000/api/offer`, {
            method: "PUT",
            body: JSON.stringify(offerDetails),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(response);
    }

    const adInfo = await getAdInfo();

    console.log(adInfo);
    description.textContent = adInfo[0].description;
    title.textContent = adInfo[0].title;

    makeOfferButton.onclick = makeOffer;
    // adImg.src = adInfo[0].img;

})


