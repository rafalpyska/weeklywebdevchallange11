import { clearLocalStorage } from "./utilities/utils.js";
import { randomNumberRange } from "./utilities/utils.js";
import { Navigation } from "./components/expand-navigation.js";
import { Modal } from "./components/modal.js";
import { Search } from "./components/search.js";
import { Tabs } from "./components/tabs.js";
import { TripPlanner, SavedItems } from "./components/trip-planner.js";
import { DragDrop } from "./components/drag-drop.js";
import { MutationObserve } from "./utilities/mutation-observer.js";

const tripPlannerBodyWrapper = document.querySelector(
  ".trip-planner__body-wrapper"
);

document.addEventListener("DOMContentLoaded", TripPlanner.createTripPlanner);
document.addEventListener(
  "DOMContentLoaded",
  TripPlanner.displaySubdestination
);
document.addEventListener("DOMContentLoaded", TripPlanner.displayDestination);
document.addEventListener("DOMContentLoaded", TripPlanner.setDate);
document.addEventListener("DOMContentLoaded", TripPlanner.getDate);
document.addEventListener("DOMContentLoaded", MutationObserve.onChildAdd);
document.addEventListener("DOMContentLoaded", DragDrop.init);

tripPlannerBodyWrapper.addEventListener("click", clearLocalStorage);
tripPlannerBodyWrapper.addEventListener("submit", (e) => {
  e.preventDefault();
  const subdestination = document.querySelector("#add-subdestination-text")
    .value;
  const errorPlanner = document.querySelector(".error");
  if (subdestination === "") {
    errorPlanner.classList.remove("hidden");
  } else {
    errorPlanner.classList.add("hidden");
    const newSubDestination = new TripPlanner(
      subdestination,
      randomNumberRange(1, 100)
    );
    TripPlanner.addSubdestinationToList(newSubDestination);
    SavedItems.addSubdestinationToLocalStorage(newSubDestination);
    TripPlanner.clearFields();
  }
});
tripPlannerBodyWrapper.addEventListener("click", (e) => {
  TripPlanner.deleteSubdestination(e.target);
  SavedItems.removeSubdestinationFromLocalStorage(
    e.target.parentElement.dataset.id
  );
});

const printBtn = document.querySelector(".btn__print");

printBtn.addEventListener(
  "click",
  function () {
    window.print();
  },
  false
);

Navigation.expandNavigation();
Modal.showModal();
Search.filterDestination();
Tabs.createTabs();
TripPlanner.changeTitle();
TripPlanner.sortList();
