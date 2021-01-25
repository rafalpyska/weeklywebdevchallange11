export class Modal {
  static showModal() {
    const modal__toggle = document.querySelector(".offer-info__button");
    const modal = document.querySelector(".modal__overlay");
    const close = document.querySelector(".close");

    modal__toggle.addEventListener(
      "click",
      function () {
        modal.classList.add("dflex");
      },
      false
    );

    close.addEventListener(
      "click",
      function () {
        modal.classList.remove("dflex");
      },
      false
    );
  }
}
