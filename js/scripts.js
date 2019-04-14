import { clearLocalStorage } from "./utilities/utils.js";
import { Navigation } from "./components/expand-navigation.js";
import { Tabs } from "./components/tabs.js";
import { CreateSubDestination, TripPlanner, SavedItems   } from "./components/trip-planner.js";
import { DragDrop } from "./components/drag-drop.js";
import { MutationObserve } from "./utilities/mutation-observer.js";

document.addEventListener('DOMContentLoaded', TripPlanner.createTripPlanner);
document.addEventListener('DOMContentLoaded', TripPlanner.displaySubdestination);
document.addEventListener('DOMContentLoaded', TripPlanner.displayDestination);

const clearLS = document.querySelector('.trip-planner__add-subdestination-input--clear');
clearLS.addEventListener('click', clearLocalStorage);

document.querySelector('.trip-planner__form').addEventListener('submit', (e) => {
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
const subdestinationList = document.querySelector('.trip-planner__subdestination-list-container');

subdestinationList.addEventListener('click', (e) => {
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
DragDrop.init();
MutationObserve.onChildAdd();



