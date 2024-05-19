const skillsList = document.getElementById("skills_list");

for(let i = 0; i < 5; i++) {
    const skill = document.createElement('div');
    skill.className = "skill"

    const category = document.createElement('h2');
    category.innerText = "Category";

    const description = document.createElement('p');
    description.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem hic sint quia. Obcaecati quaerat accusamus alias nostrum molestias praesentium dignissimos quibusdam veniam, aliquid cumque, quis iusto animi placeat odit suscipit!"

    const img = document.createElement('img');
    img.className = "workImg";
    img.src="../assets/images/ad_4.jpg";

    skill.appendChild(category);
    skill.appendChild(description);
    skill.appendChild(img);

    skillsList.appendChild(skill);
}