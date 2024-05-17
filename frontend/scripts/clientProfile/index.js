const adsList = document.getElementById("ads_list");


for(let i = 0 ; i < 6; i++) {
    const ad = document.createElement('div');
    ad.className="ad";
    ad.id = i;


    const imgAd = document.createElement('img');
    imgAd.className = "img_ad";
    imgAd.src="../assets/images/ad_5.jpg";  

    const titleAd = document.createElement('h1');
    titleAd.className = "title_ad";
    titleAd.innerText = "Title"


    const viewButton = document.createElement('a');
    viewButton.className = "solid-button";
    viewButton.innerText = "View"
    viewButton.href=`./adpage.html?id=${ad.id}`

    ad.appendChild(imgAd);
    ad.appendChild(titleAd);
    ad.appendChild(viewButton);

    adsList.appendChild(ad);
}

/*
    <div class="ad">
        <img class="img_ad">
        <h1 class="title_ad">
        <button class="view_ad">
    <div>
*/