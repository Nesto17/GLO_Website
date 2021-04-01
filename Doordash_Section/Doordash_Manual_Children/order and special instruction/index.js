const navTrigger = document.querySelector('.navigation_trigger');
const navPanel = document.querySelector('.navigation_panel');
const navBackground = document.querySelector('.navigation_background');
const navHeader = document.querySelector('.navigation');
const navBox = document.querySelector('.navigation_box');
const navDropDown = document.querySelector('.navigation_manuals');
const navManualsList = document.querySelector('.navigation_manuals_list');
const wrapper = document.querySelector('.wrapper');
const manual_tutor_steps_image = document.querySelector(".manual_tutor_steps_image");
var ul_images = document.querySelectorAll("#manual_tutor_steps_image");
// var body2 = document.querySelector("body");

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


ul_images.forEach(img => {
    let size = parseFloat(manual_tutor_steps_image.offsetWidth) + "px";
    img.style.width = size;
})

window.addEventListener("resize", () => {
    ul_images.forEach(img => {
        let size_changing = parseFloat(manual_tutor_steps_image.offsetWidth) + "px";
        img.style.width = size_changing;
    })
})