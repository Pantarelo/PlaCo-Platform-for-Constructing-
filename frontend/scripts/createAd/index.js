const title = document.getElementById("title-input");
const description = document.getElementById("description-input");
const salary = document.getElementById("salary-input");
const createAd = document.getElementById("create-ad-button");
const dropArea = document.getElementById("drop-area");
const inputPhoto = document.getElementById("upload-photo");
const imgView = document.getElementById("img-view");

async function createNewAd(url, data) {
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })

    return response.json();
}

createAd.addEventListener('click', async (e) => {
    e.preventDefault();

    const titleText = title.value;
    const descriptionText = description.value;
    const salaryText = salary.value;
    const imageInput = inputPhoto.files[0];

    if(titleText && descriptionText && salaryText) {
        const data = {
            "title": titleText,
            "description": descriptionText,
            "salary": salaryText,
            "img" : new Blob([imageInput], {type: imageInput.type})
        }

        const res = await createNewAd("http://localhost:3000/api/createJobAd", data);

        console.log(res);
    }
})

inputPhoto.addEventListener("change", uploadPhoto);

function uploadPhoto() {
    let imgLink = URL.createObjectURL(inputPhoto.files[0]);
    dropArea.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
}

dropArea.addEventListener("dragover", function (e)  {
    e.preventDefault();
})

dropArea.addEventListener("drop", function (e) {
    e.preventDefault();
    inputPhoto.files = e.dataTransfer.files;
    uploadPhoto();
})