const hero_title = document.querySelector(".hero_title");
const line = document.querySelector(".line");
const manual_video_title = document.querySelector(".manual_video_title");
const manual_video_text = document.querySelector(".manual_video_text");
const manual_video_yt_container = document.querySelectorAll(".manual_video_yt_container");
const body = document.querySelector("body");

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px"
};

const appearOptions2 = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);

const appearOnScroll2 = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions2);


window.addEventListener('load', () => {
    appearOnScroll.observe(hero_title);
    appearOnScroll.observe(manual_video_title);
    manual_video_yt_container.forEach(youtube => {
        appearOnScroll2.observe(youtube);
    })
    appearOnScroll.observe(manual_video_text);
    appearOnScroll.observe(line);
    body.style.overflow = "unset";
})

manual_video_yt_container[0].style.marginBottom = "50px";
manual_video_yt_container[1].style.marginBottom = "50px";