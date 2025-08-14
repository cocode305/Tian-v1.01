const menuBtn = document.querySelector('.menu-btn');
const menuIcon = document.getElementById('menu-icon');
const navList = document.querySelector('.nav-list');
const body = document.body;

menuBtn.addEventListener("click", (e) => {
    if (menuIcon.classList.contains("fa-bars")) {
      menuIcon.classList.replace("fa-bars", "fa-xmark");
      navList.style.right = "0px"; // show menu
      navList.style.opacity = 1;
      body.classList.add('menu-open');
    } else {
      menuIcon.classList.replace("fa-xmark", "fa-bars");
      navList.style.right = "-100%"; // hide menu
      navList.style.opacity = 0;
      body.classList.remove("menu-open");
    }
    
});