export class Tabs {
  static createTabs() {
    const tabs = document.querySelector(".offer__list");
    const offers = document.querySelectorAll(".offer-city-list");
    const offerRecommended = document.getElementById("offer__recommended");
    const offerPagination = document.querySelector(".offer-pagination");

    tabs.addEventListener(
      "click",
      (e) => {
        if (e.target.tagName === "LI") {
          const targetOffer = document.querySelector(e.target.dataset.target);
          offers.forEach((offer) => {
            if (offer === targetOffer) {
              offer.classList.add("offer-city-list--active");
            } else {
              offer.classList.remove("offer-city-list--active");
            }
          });
        }
      },
      false
    );
  }
}
