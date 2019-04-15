import { clearLocalStorage } from "./utilities/utils.js";
import { Navigation } from "./components/expand-navigation.js";
import { Tabs } from "./components/tabs.js";
import { CreateSubDestination, TripPlanner, SavedItems   } from "./components/trip-planner.js";
// import { DragDrop } from "./components/drag-drop.js";
import { MutationObserve } from "./utilities/mutation-observer.js";

const tripPlannerBodyWrapper = document.querySelector('.trip-planner__body-wrapper');

document.addEventListener('DOMContentLoaded', TripPlanner.createTripPlanner);
document.addEventListener('DOMContentLoaded', TripPlanner.displaySubdestination);
document.addEventListener('DOMContentLoaded', TripPlanner.displayDestination);

// const clearLS = document.querySelector('.trip-planner__add-subdestination-input--clear');
// tripPlannerBodyWrapper.addEventListener('click', clearLocalStorage);


tripPlannerBodyWrapper.addEventListener('submit', (e) => {
   e.preventDefault();

    const subdestination = document.querySelector('#add-subdestination-text').value;

    if(subdestination === '') {
        console.log('Please fill in!');
    } else {
        const newSubDestination = new CreateSubDestination(subdestination);
        TripPlanner.addSubdestinationToList(newSubDestination);
        SavedItems.addSubdestinationToLS(newSubDestination);
        TripPlanner.clearFields();
    }
});
tripPlannerBodyWrapper.addEventListener('click', (e) => {
    TripPlanner.deleteSubdestination(e.target);
});

const printBtn = document.querySelector('.btn__print');

printBtn.addEventListener('click', function() {
    window.print();
    }, false);

Navigation.expandNavigation();
Tabs.createTabs();
TripPlanner.changeTitle();
TripPlanner.setDate();
TripPlanner.sortList();
// DragDrop.init();
// MutationObserve.onChildAdd();



