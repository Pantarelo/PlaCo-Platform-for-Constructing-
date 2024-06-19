async function getAllJobs(url) {
    
    const response = await fetch(url, {
        method: "GET",
    })

    return response.json();
}


getAllJobs("http://localhost:3000/api/user/worker").then((data)=> {

    const listAnnouncements = document.getElementsByClassName("list-announcements");
    console.log(listAnnouncements[0]);
    data.map((worker) =>
        {
            const profile = document.createElement('div');
            profile.id = worker.id;
            profile.className = "profile";
            
            const view = document.createElement('div');
            view.className = "view";
            profile.appendChild(view);
            
            const img = document.createElement('img');
            let imgUrl = "/";

            img.src= imgUrl;
            img.alt="img";

            const infoContainer = document.createElement('div');
            infoContainer.className = "info-container";

            const title = document.createElement('h1');
            title.textContent = worker.title;
            title.className = "title"
            
            const description = document.createElement('p');
            description.textContent = worker.description;

            view.appendChild(img);
            infoContainer.appendChild(title);
            infoContainer.appendChild(description);

            view.appendChild(infoContainer);

            const info = document.createElement('div');
            info.className = "info";

            // const salary = document.createElement('span');
            // salary.textContent = worker.salary + " lei";

            const contactUs = document.createElement('button');
            contactUs.className = "solid-button";
            contactUs.textContent= "Add to project"

            // info.appendChild(salary);
            info.appendChild(contactUs);

            profile.appendChild(info);

            listAnnouncements[0].appendChild(profile)
        }
    )
})
