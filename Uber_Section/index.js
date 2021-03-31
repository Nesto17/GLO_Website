const navTrigger = document.querySelector('.navigation_trigger');
const navPanel = document.querySelector('.navigation_panel');
const navBackground = document.querySelector('.navigation_background');
const navHeader = document.querySelector('.navigation');
const navBox = document.querySelector('.navigation_box');
const navDropDown = document.querySelector('.navigation_manuals');
const navManualsList = document.querySelector('.navigation_manuals_list');
const wrapper = document.querySelector('.wrapper');
const manual_items = document.querySelectorAll('.manual_items');
const screen_resolution = window.matchMedia("(max-width: 1023px)");
const hero_subtitle = document.querySelector(".hero_subtitle");
const manual_button = document.querySelectorAll(".manual_button");

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

function changeLocation() {
    let new_location = document.querySelector("#selected_div").getAttribute("data-id");
    window.location.href = new_location;
}

function changeText(x) {
    if (x.matches) {
        hero_subtitle.innerHTML = "Tap on the respective boxes to find steps on how to do \
        the following. There are written steps, pictures and a video guide!";
        manual_items.forEach(manual => {
            manual.addEventListener("click", () => {
                let selected_div = document.querySelectorAll("#selected_div");
                selected_div.forEach(div => {
                    div.removeAttribute("id");
                })
                manual.id = "selected_div";
            });
            manual.addEventListener("click", changeLocation);
        })
    } else {
        hero_subtitle.innerHTML = 'Tap on the "explore more" button to find steps on how to do \
        the following. There are written steps, pictures and a video guide!';
        manual_items.forEach(manual => {
            manual.removeEventListener("click", changeLocation);
        })
    }
}

changeText(screen_resolution);
screen_resolution.addListener(changeText);