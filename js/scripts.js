import { CreateSubDestination, SubdestinationList, SavedItems  } from "./components/subdestination-list.js";
import { DestinationList } from "./components/destination-list.js";

const nav = document.querySelector(".nav");
const nav_toggle = document.querySelector(".nav__toggle");
const nav__list = document.querySelector(".nav__list");

nav_toggle.addEventListener("click", function () {
    nav__list.classList.toggle("nav__list--expanded");
    if(nav__list.classList.contains("nav__list--expanded")) {
        nav.setAttribute('aria-expanded', true);
    } else {
        nav.setAttribute("aria-expanded", false);
    }
}, false);


const datePicker = document.querySelector('.trip-planner__datepicker');
datePicker.valueAsDate = new Date();

const tripPlannerTitle = document.querySelector('.trip-planner__heading-title');

tripPlannerTitle.addEventListener('focusout', () => {
    localStorage.saveLocalStorage();
    }, false);
document.addEventListener('DOMContentLoaded', localStorage.loadLocalStorage);

document.addEventListener('DOMContentLoaded', SubdestinationList.displaySubdestination);


document.querySelector('.trip-planner__form').addEventListener('submit', (e) => {
    e.preventDefault();

    const subdestination = document.querySelector('#add-subdestination-text').value;

    if(subdestination === '') {
        console.log('Please fill in!');
    } else {
        const newSubDestination = new CreateSubDestination(subdestination);
        SubdestinationList.addSubdestinationToList(newSubDestination);
        SavedItems.addSubdestinationToLS(newSubDestination);
        SubdestinationList.clearFields();
    }
});
const subdestinationList = document.querySelector('.trip-planner__subdestination-list-container');

subdestinationList.addEventListener('click', (e) => {
    SubdestinationList.deleteSubdestination(e.target);
});

const printBtn = document.querySelector('.btn__print');

printBtn.addEventListener('click', function() {
    window.print();
    }, false);



document.addEventListener('DOMContentLoaded', DestinationList.displayDestination);

    // let item = null;
    //
    // for(const filled of filledContainers) {
    //     filled.addEventListener('dragstart', dragStart);
    //     filled.addEventListener('dragEnd', dragEnd);
    // }
    // for (const empty of emptyContainers) {
    //     empty.addEventListener('dragover', dragOver);
    //     empty.addEventListener('dragenter', dragEnter);
    //     empty.addEventListener('dragleave', dragLeave);
    //     empty.addEventListener('drop', dragDrop);
    // }
    // function dragStart(e) {
    //     const value = e.target.getAttribute('data-value');
    //     e.dataTransfer.setData('text', value);
    //     e.dataTransfer.effectAllowed = 'copy';
    // }
    // function dragOver(e) {
    //     e.preventDefault();
    // }
    // function dragDrop(e) {
    //     e.preventDefault();
    //     this.append(filled);
    //     e.dataTransfer.getData('text');
    // }
    //
    // let item = null;
    //
    // document.addEventListener('dragstart', function(e) {
    //     item = e.target;
    //     item.style.opacity = '0.4';
    //     e.dataTransfer.effectAllowed = 'move';
    //     e.dataTransfer.setData('text', e.target.id);
    //     item.parentNode.classList.remove('remove-border');
    //     e.stopPropagation();
    // }, false);
    //
    // document.addEventListener('dragover', function(e) {
    //         e.preventDefault();
    // }, false);
    // document.addEventListener('dragenter', function(e) {
    //         e.preventDefault();
    // }, false);
    //
    // document.addEventListener('drop', function(e) {
    //     e.preventDefault();
    //     const data = e.dataTransfer.getData('text');
    //     e.target.appendChild(item);
    //     const newEmptyDiv = document.createElement('div');
    //     newEmptyDiv.classList.add('trip-planner__destination', 'trip-planner__destination--empty','trip-planner__destination--list-empty');
    //     if(e.target.children.length > 0) {
    //         console.log(e.target.nextElementSibling);
    //         destinationContainer.appendChild(newEmptyDiv);
    //     } else if ((document.querySelector('.trip-planner__form').nextSibling.length > 2)) {
    //         destinationContainer.removeChild(newEmptyDiv);
    //     }
    //     item.parentNode.classList.add('remove-border');
    // }, false);
    // document.addEventListener('dragend', function(e) {
    //     item.style.opacity = '1';
    //     item = null;
    // }, false);

