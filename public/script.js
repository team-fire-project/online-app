const menu = document.getElementById('#mobile-menu');
const menuLinks = document.getElementsByClassName('.nav-items');

// menu.addEventListener('click', function() {
//     // menu.classList.toggle('is-active')
//     console.log('Heyyo')
//     // menuLinks.classList.toggle('active')
// })

menu.addEventListener('click', function() {
document.getElementById('nav-menu').classList.toggle('is-active')
// menu.classList.toggle('fa-times')
// menu.classList.remove('fa-bars')
})

