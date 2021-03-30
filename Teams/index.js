const navTrigger = document.querySelector('.navigation_trigger');
const navPanel = document.querySelector('.navigation_panel');
const navBackground = document.querySelector('.navigation_background');
const navHeader = document.querySelector('.navigation');
const navHeaderHeight = navHeader.getBoundingClientRect().height;
const navBox = document.querySelector('.navigation_box');
const navDropDown = document.querySelector('.navigation_manuals');
const navManualsList = document.querySelector('.navigation_manuals_list');
const wrapper = document.querySelector('.wrapper');

const disableScrolling = () => {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

const enableScrolling = () => {
    window.onscroll=function(){};
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

    if (scrollAmount > (navHeaderHeight / 2)) {
        navHeader.classList.add('alternate');
    } else {
        navHeader.classList.remove('alternate');
    }
})

const slideContainer = document.querySelector('.members_container');
const slide = document.querySelector('.members_slider');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 4000;

let slides = document.querySelectorAll('.member_section');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;
console.log(slideWidth)

slide.style.transform = `translateX(${-slideWidth * index}px)`;

// console.log(slides);

const startSlide = () => {
  slideContainer.classList.remove('enter');
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll('.member_section');

slide.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

const stopInterval = () => {
  clearInterval(slideId);
  slideContainer.classList.add('enter');
}

slideContainer.addEventListener('mouseleave', startSlide);
slideContainer.addEventListener('mouseover', stopInterval);
nextBtn.addEventListener('click', moveToNextSlide);
nextBtn.addEventListener('mouseover', stopInterval);
nextBtn.addEventListener('mouseleave', startSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);
prevBtn.addEventListener('mouseover', stopInterval);
prevBtn.addEventListener('mouseleave', startSlide);

startSlide();
