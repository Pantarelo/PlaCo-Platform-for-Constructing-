async function getAllJobs(url) {
    
    const response = await fetch(url, {
        method: "GET",
    })

    return response.json();
}


getAllJobs("http://localhost:3000/api/jobs").then((data)=> {

    const listAnnouncements = document.getElementsByClassName("list-announcements");
    console.log(listAnnouncements[0]);
    data.map((job) =>
        {
            const announcement = document.createElement('div');
            announcement.className = "announcement";
            
            const view = document.createElement('div');
            view.className = "view";
            announcement.appendChild(view);
            
            const img = document.createElement('img');
            let imgUrl = "/";
            // console.log(job.img);
            // console.log(imgUrl);
            img.src= imgUrl;
            img.alt="img";

            const infoContainer = document.createElement('div');
            infoContainer.className = "info-container";

            const title = document.createElement('h1');
            title.textContent = job.title;
            title.className = "title"
            
            const description = document.createElement('p');
            description.textContent = job.description;

            view.appendChild(img);
            infoContainer.appendChild(title);
            infoContainer.appendChild(description);

            view.appendChild(infoContainer);

            const info = document.createElement('div');
            info.className = "info";

            const salary = document.createElement('span');
            salary.textContent = job.salary + " lei";

            const contactUs = document.createElement('button');
            contactUs.className = "solid-button";
            contactUs.textContent= "Contact Us"

            info.appendChild(salary);
            info.appendChild(contactUs);

            announcement.appendChild(info);

            listAnnouncements[0].appendChild(announcement)
        }
    )
})
