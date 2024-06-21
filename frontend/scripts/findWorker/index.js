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

            // img.src= worker.img != null ? worker.img : "../../assets/logo.png";
            img.src = "../assets/images/logo.png";
            img.alt="img";
            
            /**
             * img, name, description
             */

            view.appendChild(img);
            // infoContainer.appendChild(title);
            // infoContainer.appendChild(description);

            // view.appendChild(infoContainer);

            const info = document.createElement('div');
            info.className = "info";

            // const salary = document.createElement('span');
            // salary.textContent = worker.salary + " lei";

            const notifyWorker = document.createElement('a');
            notifyWorker.className = "solid-button";
            notifyWorker.href=`public_worker_profile.html?id=${worker.id}`;
            notifyWorker.textContent= "View profile"

            // info.appendChild(salary);
            info.appendChild(notifyWorker);

            profile.appendChild(info);

            listAnnouncements[0].appendChild(profile)
        }
    )
})
