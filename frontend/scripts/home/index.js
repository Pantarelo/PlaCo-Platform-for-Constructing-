
const userType = {ADMIN: 0, CLIENT: 1, WORKER: 2};

let logged = true;
let typeOfUser = userType.WORKER;

if(logged === true)
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