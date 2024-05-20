const comments = document.getElementById("comments_list");

for(let i = 0 ; i < 6; i++) {
    const comment = document.createElement("p");

    comment.className = "comment";
    comment.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem hic sint quia. Obcaecati quaerat accusamus alias nostrum molestias praesentium dignissimos quibusdam veniam, aliquid cumque, quis iusto animi placeat odit suscipit!";

    comments.appendChild(comment);
}  