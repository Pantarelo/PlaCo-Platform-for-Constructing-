const userType = {ADMIN: 0, CLIENT: 1, WORKER: 2};

function isTokenExpired(token) {
    if (!token) return true;

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const exp = tokenData.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime > exp;
}

const token = localStorage.getItem('token');
if (isTokenExpired(token)) {
    console.log(isTokenExpired(token));

    localStorage.removeItem('token');
    localStorage.removeItem('logged');
    localStorage.removeItem('typeOfUser');
    localStorage.removeItem('userId');
}
else {

    let logged = localStorage.getItem('logged');
    let typeOfUser = parseInt(localStorage.getItem('typeOfUser'), 10);

    console.log(logged + ": " + typeOfUser);

    if (logged == 1) {
        logged == 1;
    }

    if(logged == 1)
    {
        if(typeOfUser == userType.CLIENT || typeOfUser == userType.WORKER)
        {
            const heroSection = document.getElementsByClassName("hero-section")[0];
            heroSection.style.display = 'none';

            const topCompanies = document.getElementById("top-companies");
            topCompanies.style.display = "none";
        
            const siteDetails = document.getElementById("site-details");
            siteDetails.style.display = "none";
        }

        if(typeOfUser == userType.CLIENT)
        {

            const welcomeSection = document.getElementById("welcome-section");
            welcomeSection.style.display = "flex";

            const welcomeMsg = document.getElementById("welcome-msg");

            welcomeMsg.innerText = "Welcome " + "new Client!"; 

            const exploreTitle = document.getElementsByClassName("title-explore");

            exploreTitle[0].innerHTML = "Find workers";

            const linksHomePage = document.getElementsByClassName("linksHomePage");

            const profile = document.createElement("a");
            profile.href = "./pages/client_profile.html";
            profile.innerText = "Profile";
            const findWorkers = document.createElement("a");
            findWorkers.href = "./pages/explore.html";
            findWorkers.innerText = "Find workers";
            linksHomePage[0].append(findWorkers);
            linksHomePage[0].append(profile);
            
        }

        if(typeOfUser == userType.WORKER)
        {

            const welcomeSection = document.getElementById("welcome-section");
            welcomeSection.style.display = "flex";

            const welcomeMsg = document.getElementById("welcome-msg");

            welcomeMsg.innerText = "Welcome " + "new Worker!"; 

            const exploreTitle = document.getElementsByClassName("title-explore");

            exploreTitle[0].innerHTML = "Find jobs";

            const linksHomePage = document.getElementsByClassName("linksHomePage");

            const profile = document.createElement("a");
            profile.href = "./pages/worker_profile.html";
            profile.innerText = "Profile";
            const findWorkers = document.createElement("a");
            findWorkers.href = "./pages/explore.html";
            findWorkers.innerText = "Find jobs";
            linksHomePage[0].append(findWorkers);
            linksHomePage[0].append(profile);
            
        }
    }
}
