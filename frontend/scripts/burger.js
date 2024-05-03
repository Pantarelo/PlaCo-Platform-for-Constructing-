let burger = document.getElementById("burger");

burger.addEventListener("click", () => {
    let listBurger = document.getElementById("linksHomePageHamburger");
    if(listBurger.style.display == "flex")
    {
        listBurger.style.display = "none";
    }
    else 
    {
        listBurger.style.display = "flex";
        listBurger.style.position = "absolute";
    }
});


