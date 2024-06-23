import {getCookie} from "../utils/cookies.js";

const notifications = document.getElementById("notifications_list");

document.addEventListener("DOMContentLoaded", async () => {
    /**
     * div class="notification"
        * div class="notification_content"
        * - h1 class="notification_title" (if accepted_status === true) "Offer Accepted" else "Offer Rejected"
        * - p class="notification_text" (if accepted_status === true) "Your offer has been accepted!" else "Your offer has been rejected."
     * if (offer_id exists)
     * - input class="notification_offer"
     * - button class="notification_button"
     * 
     */


    const token = getCookie("token");

    const getNotifications = async () => {
        const response = await fetch("http://localhost:3000/api/notifications", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    }

    const data = await getNotifications();

    data.forEach(notification => {
        const notificationDiv = document.createElement("div");
        notificationDiv.classList.add("notify");

        const notificationContent = document.createElement("div");
        notificationContent.classList.add("notification_content");

        const notificationTitle = document.createElement("h1");
        notificationTitle.classList.add("notification_title");
        notificationTitle.innerText = notification.id_offer ? "New Offer" : notification.accepted_status ? "Offer Accepted" : "Offer Rejected";

        const notificationText = document.createElement("p");
        notificationText.classList.add("notification_text");
        notificationText.innerText = notification.id_offer ? "You received a new offer" : notification.accepted_status ? "Your offer has been accepted!" : "Your offer has been rejected.";

        notificationContent.appendChild(notificationTitle);
        notificationContent.appendChild(notificationText);

        notificationDiv.appendChild(notificationContent);

        if (notification.id_offer) {
            const notificationOffer = document.createElement("input");
            notificationOffer.classList.add("notification_offer");
            notificationOffer.style.marginRight = "10px";

            const notificationButton = document.createElement("button");
            notificationButton.classList.add("solid-button");
            notificationButton.innerText = "Send Offer";
            notificationButton.addEventListener("click", () => {
                window.location.href = `/offer/${notification.id_offer}`;
            });

            notificationDiv.appendChild(notificationOffer);
            notificationDiv.appendChild(notificationButton);
        }

        notifications.appendChild(notificationDiv);
    });
});