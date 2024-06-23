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
            profile.id = worker.id_client;
            profile.className = "profile";
            
            const view = document.createElement('div');
            view.className = "view";
            profile.appendChild(view);
            
            const img = document.createElement('img');

            img.src = worker.img ? `data:image/jpeg;base64,${worker.img}` : "../assets/images/logo.png";
            img.alt = "img";
    
            view.appendChild(img);


            const info = document.createElement('div');
            info.className = "info";
            info.style = "width:100%; display: flex; text-align:left;";
            
            const description = document.createElement('h1');
            description.textContent = worker.description;

            const contact = document.createElement('p');
            contact.textContent = worker.contact;

            info.appendChild(description);
            info.appendChild(contact);

            profile.appendChild(info);

            

            
            

            // const salary = document.createElement('span');
            // salary.textContent = worker.salary + " lei";

            const viewProfile = document.createElement('a');
            viewProfile.style = "display: flex; justify-content: center; align-items: center;";
            viewProfile.className = "solid-button";
            viewProfile.href=`public_worker_profile.html?id=${worker.id_client}`;
            viewProfile.textContent= "View profile"

            profile.appendChild(viewProfile);


            listAnnouncements[0].appendChild(profile)
        }
    )
})
