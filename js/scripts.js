(function () {
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
    class CreateSubDestination {
        constructor(subdestination) {
            this.subdestination = subdestination;
        }
    }

    class SubdestinationList {
        static displaySubdestination() {
            const subdestination = SavedItems.getSubdestination();
            subdestination.forEach((destination) => SubdestinationList.addSubdestinationToList(destination));
        }
        static addSubdestinationToList(destination) {

            const listContainer = document.querySelector('.trip-planner__subdestination-list');
            const docFrag = document.createDocumentFragment()
            const listItem = document.createElement('li');
            listItem.classList.add('trip-planner__subdestination-list-item');
            listItem.innerHTML = `
                ${destination.subdestination}
            `;
            const btnRemove = document.createElement('button');
            btnRemove.classList.add('btn', 'btn__remove');
            btnRemove.textContent = "X";
            listItem.appendChild(btnRemove);
            docFrag.appendChild(listItem);
            listContainer.appendChild(docFrag);
        }
        static deleteSubdestination(element) {
            if(element.classList.contains('btn__remove')) {
                element.parentElement.remove();
            }
        }
        static clearFields() {
            const subdestination = document.querySelector('#add-subdestination-text');
            subdestination.value = '';
        }
    }
    class SavedItems {
        static getSubdestination() {
            let subdestination;
            if(localStorage.getItem('subdestination') === null) {
                subdestination = [];
            } else {
                subdestination = JSON.parse(localStorage.getItem('subdestination'));
            }
            return subdestination;
        }
        static addSubdestinationToLS(text) {
            const subdestination = SavedItems.getSubdestination();
            subdestination.push(text);
            localStorage.setItem('subdestination', JSON.stringify(subdestination));
        }
        // static removeSubdestinationFromLS(subdestination) {
        //     const items = this.getSubdestination();
        //
        //     items.forEach((place, index) => {
        //         if(place.subdestination === subdestination) {
        //             items.splice(index, 1);
        //         }
        //     });
        //     localStorage.setItem('items', JSON.stringify(items));
        // }
    }

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

        // SavedItems.removeSubdestinationFromLS(e.target);
    });

    const printBtn = document.querySelector('.btn__print');

    printBtn.addEventListener('click', function() {
        window.print();
    }, false);

    const filledContainers = document.querySelectorAll('.trip-planner__destination--filled');
    const emptyContainers = document.querySelectorAll('.trip-planner__destination--empty');
    const destinationList = document.querySelector('.trip-planner__destination-list');
    const destinationContainer = document.querySelector('.trip-planner__destination-container');

    class DestinationList {
        static displayDestination() {
            const StoredDestination = [
                {
                    place: 'Mt. Bromo',
                    time: '5 hours',
                    image: 'images/svg/mountains.svg',
                    id: 1
                },
                {
                    place: 'Mt. Semeru',
                    time: '3 hours',
                    image: 'images/svg/mountains.svg',
                    id: 2
                },
                {
                    place: 'Mt. Panderman',
                    time: '4 hours',
                    image: 'images/svg/mountains.svg',
                    id: 3
                }
            ];
            const places = StoredDestination;

            places.forEach((destination) => DestinationList.addDestination(destination));
        }
        static addDestination(destination) {
            const docFrag = document.createDocumentFragment();
            const divOuter = docFrag.appendChild(document.createElement('div'));
            const divInner = divOuter.appendChild(document.createElement('div'));

            divOuter.classList.add('trip-planner__destination', 'trip-planner__destination--empty','trip-planner__destination-list--empty');
            divInner.classList.add('trip-planner__destination', 'trip-planner__destination--filled', 'trip-planner__destination-list--filled');
            divInner.setAttribute("data-value",`${destination.id}"`);

            divInner.setAttribute('draggable', 'true');

            divInner.innerHTML = `
                            <div class="trip-planner__destination-info" draggable="false">
                                <h2 class="trip-planner__destination-info-heading">${destination.place}</h2>
                                <p class="trip-planner__destination-info-paragraph">estimated time: <span class="heading-color">${destination.time}</span></p>
                            </div>
                            <div class="trip-planner__destination-details" draggable="false">
                                <object type="image/svg+xml" data="${destination.image}"></object>
                                <a href="#" class="trip-planner__destination-details-link">view details</a>
                            </div>
                        </div>
            `;
            destinationList.appendChild(docFrag);
        }
    }

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
}());

