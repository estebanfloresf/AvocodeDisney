function classToggle() {
    const navs = document.querySelectorAll('.navbar__items')
    const menuicon = document.querySelector('i.fas.fa-bars');
    navs.forEach(nav => nav.classList.toggle('navbar__toggleshow'));
    console.log($('i.fas.fa-bars'));

}
document.querySelector('.navbar__link-toggle')
    .addEventListener('click', classToggle);