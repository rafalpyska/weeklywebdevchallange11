export class Navigation {
  static expandNavigation() {
    const nav = document.querySelector(".nav");
    const nav_toggle = document.querySelector(".nav__toggle");
    const nav__list = document.querySelector(".nav__list");

    nav_toggle.addEventListener(
      "click",
      function () {
        nav__list.classList.toggle("nav__list--expanded");
        if (nav__list.classList.contains("nav__list--expanded")) {
          nav.setAttribute("aria-expanded", true);
        } else {
          nav.setAttribute("aria-expanded", false);
        }
      },
      false
    );
  }
}
