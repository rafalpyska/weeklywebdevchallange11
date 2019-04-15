import {clearLocalStorage} from "./utilities/utils.js";
import {Navigation} from "./components/expand-navigation.js";
import {Tabs} from "./components/tabs.js";
import {CreateSubDestination, TripPlanner, SavedItems} from "./components/trip-planner.js";
import {DragDrop} from "./components/drag-drop.js";
import {MutationObserve} from "./utilities/mutation-observer.js";

const tripPlannerBodyWrapper = document.querySelector('.trip-planner__body-wrapper');

document.addEventListener('DOMContentLoaded', TripPlanner.createTripPlanner);
document.addEventListener('DOMContentLoaded', TripPlanner.displaySubdestination);
document.addEventListener('DOMContentLoaded', TripPlanner.displayDestination);
document.addEventListener('DOMContentLoaded', TripPlanner.setDate);
document.addEventListener('DOMContentLoaded', TripPlanner.getDate);
document.addEventListener('DOMContentLoaded', DragDrop.init);
document.addEventListener('DOMContentLoaded', MutationObserve.onChildAdd);

tripPlannerBodyWrapper.addEventListener('click', clearLocalStorage);


tripPlannerBodyWrapper.addEventListener('submit', (e) => {
    e.preventDefault();

    const subdestination = document.querySelector('#add-subdestination-text').value;

    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let id = randomNumber.toString();
    if (subdestination === '') {
        console.log('Please fill in!');
    } else {
        const newSubDestination = new CreateSubDestination(subdestination, id);
        TripPlanner.addSubdestinationToList(newSubDestination);
        SavedItems.addSubdestinationToLocalStorage(newSubDestination);
        TripPlanner.clearFields();
    }
});
tripPlannerBodyWrapper.addEventListener('click', (e) => {
    TripPlanner.deleteSubdestination(e.target);
    SavedItems.removeSubdestinationFromLocalStorage(e.target.parentElement.dataset.id);
});

const printBtn = document.querySelector('.btn__print');

printBtn.addEventListener('click', function () {
    window.print();
}, false);

Navigation.expandNavigation();
Tabs.createTabs();
TripPlanner.changeTitle();
TripPlanner.sortList();



