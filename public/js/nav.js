const hamburger = document.querySelector('.menu-toggle');

const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {

    nav.classList.toggle('active');
    
});