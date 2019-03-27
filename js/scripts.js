let projectsProgress = new ProgressBar.Circle(projects, {
    strokeWidth: 2,
    easing: 'easeInOut',
    duration: 2000,
    color: 'red',
    trailColor: '#EEE',
    trailWidth: 1,
    svgStyle: null
});

let clientsProgress = new ProgressBar.Circle(clients, {
    strokeWidth: 2,
    easing: 'easeInOut',
    duration: 2000,
    color: 'green',
    trailColor: '#EEE',
    trailWidth: 1,
    svgStyle: null
});

let monthsProgress = new ProgressBar.Circle(months, {
    strokeWidth: 2,
    easing: 'easeInOut',
    duration: 2000,
    color: 'black',
    trailColor: '#EEE',
    trailWidth: 1,
    svgStyle: null
});

(function() {
    let nav = document.querySelector(".navigation__expanded");
    let navigation__toggle = document.querySelector(".navigation__toggle");
    let nav__list = document.querySelector(".nav__list");

    navigation__toggle.addEventListener("click", function () {
        nav.classList.toggle("navigation__expanded--visible");
        if(nav.classList.contains("navigation__expanded--visible")) {
            nav__list.setAttribute('aria-expanded', true);
       } else {
            nav__list.setAttribute("aria-expanded", false);
        }
    }, false);
}());
function smoothScroll(target, duration) {
    target = document.querySelector(target);
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function scrollAnimation(currentTime) {
        if(startTime === null) {
            startTime = currentTime;
        }
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(scrollAnimation);
}


projectsProgress.animate(0.5);
clientsProgress.animate(0.35);
monthsProgress.animate(0.80);

let scrollDown = document.querySelector('.scroll-down');
scrollDown.addEventListener('click', function() {
    smoothScroll('.accomplishments', 1000);
}, false);
