const navTrigger = document.querySelector('.navigation_trigger');
const navPanel = document.querySelector('.navigation_panel');
const navBackground = document.querySelector('.navigation_background');
const navHeader = document.querySelector('.navigation');
const navBox = document.querySelector('.navigation_box');
const navDropDown = document.querySelector('.navigation_manuals');
const navManualsList = document.querySelector('.navigation_manuals_list');
const wrapper = document.querySelector('.wrapper');

const disableScrolling = () => {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = function () {
        window.scrollTo(x, y);
    };
}

const enableScrolling = () => {
    window.onscroll = function () {};
}

navTrigger.addEventListener('click', () => {
    disableScrolling();

    navPanel.style.opacity = 1;
    navPanel.style['pointer-events'] = 'unset';
    setTimeout(() => {
        navBox.style.transform = 'translateY(0)';
    }, 200);
})

navBackground.addEventListener('click', () => {
    if (!navBackground.classList.contains('dropped')) {
        navBox.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            navPanel.style.opacity = 0;
            navPanel.style['pointer-events'] = 'none';
        }, 400);
        enableScrolling();
    } else {
        navManualsList.classList.remove('dropped');
        navBackground.classList.remove('dropped');
    }
});

navDropDown.addEventListener('click', () => {
    navManualsList.classList.toggle('dropped');
    navBackground.classList.toggle('dropped');
})

window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY;

    if (scrollAmount > 50) {
        navHeader.classList.add('alternate');
    } else {
        navHeader.classList.remove('alternate');
    }
})