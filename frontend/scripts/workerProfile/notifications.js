const notifications = document.getElementById("notifications_list");

for(let i = 0 ; i < 6; i++) {
    const notify = document.createElement("p");

    notify.className = "notify";
    notify.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem hic sint quia. Obcaecati quaerat accusamus alias nostrum molestias praesentium dignissimos quibusdam veniam, aliquid cumque, quis iusto animi placeat odit suscipit!";

    notifications.appendChild(notify);
}  