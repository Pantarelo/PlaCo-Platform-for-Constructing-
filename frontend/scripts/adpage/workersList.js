
const workerList = document.getElementById('list')

for(let i = 0 ; i < 10; i++) {
    const workerContainer = document.createElement('div');
    workerContainer.className = "worker_container";

    const anchorTag = document.createElement('a');
    anchorTag.href=`../pages/public_worker_profile.html?id=${i}`;

    const workerImg = document.createElement('img');
    workerImg.className="worker_img"
    workerImg.src="../assets/images/ad_5.jpg"
    anchorTag.appendChild(workerImg);


    const workerOffer = document.createElement('span');
    workerOffer.className = "worker_offer";
    workerOffer.innerText = "1000lei";

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
}