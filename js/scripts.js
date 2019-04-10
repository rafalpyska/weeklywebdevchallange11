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
            const subdestinationList = document.querySelector('.trip-planner__subdestination-list-container');
            const listItem = document.createElement('ul');
            listItem.classList.add('trip-planner__subdestination-list')
            listItem.innerHTML = `
                <li class="trip-planner__subdestination-list-item">${destination.subdestination}</li>
            `;
            subdestinationList.appendChild(listItem);
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

    const printBtn = document.querySelector('.btn__print');

    printBtn.addEventListener('click', function() {
        window.print();
    }, false);


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
                            <div class="trip-planner__destination-info">
                                <h2 class="trip-planner__destination-info-heading">${destination.place}</h2>
                                <p class="trip-planner__destination-info-paragraph">estimated time: <span class="heading-color">${destination.time}</span></p>
                            </div>
                            <div class="trip-planner__destination-details">
                                <object type="image/svg+xml" data="${destination.image}"></object>
                                <a href="#" class="trip-planner__destination-details-link">view details</a>
                            </div>
                        </div>
            `;
            destinationList.appendChild(docFrag);
        }
    }

    document.addEventListener('DOMContentLoaded', DestinationList.displayDestination);

    const filledContainers = document.querySelectorAll('.trip-planner__destination--filled');
    // console.log(filledContainers);
    const emptyContainers = document.querySelectorAll('.trip-planner__destination--empty');
    // console.log(emptyContainers);
    const destinationList = document.querySelector('.trip-planner__destination-list');
    const destinationContainer = document.querySelector('.trip-planner__destination-container');

    // let item = null;
    //
    // for(const filled of filledContainers) {
    //     filled.addEventListener('dragstart', dragStart);
    //     filled.addEventListener('dragEnd', dragEnd);
    // }
    // for (const empty of emptyContainers) {
    //     empty.addEventListener('dragover', dragOver);
    //     // empty.addEventListener('dragenter', dragEnter);
    //     // empty.addEventListener('dragleave', dragLeave);
    //     empty.addEventListener('drop', dragDrop);
    // }
    // function dragStart(e) {
    //     item = e.target;
    //     const value = e.target.getAttribute('data-value');
    //     e.dataTransfer.setData('text', value);
    //     e.dataTransfer.effectAllowed = 'copy';
    // }
    // function dragOver(e) {
    //     e.preventDefault();
    // }
    // function dragDrop(e) {
    //     e.preventDefault();
    //     e.target.appendChild(item);
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
    // }, false);
    //
    // document.addEventListener('dragover', function(e) {
    //         e.preventDefault();
    // }, false);
    // document.addEventListener('drop', function(e) {
    //     e.preventDefault();
    //     const data = e.dataTransfer.getData('text');
    //     e.target.appendChild(item);
    //     const newEmptyDiv = document.createElement('div');
    //     newEmptyDiv.classList.add('trip-planner__destination', 'trip-planner__destination--empty','trip-planner__destination--list-empty');
    //     if(e.target.nextSibling.length === 0) {
    //         console.log('JAPS?');
    //         destinationContainer.removeChild(newEmptyDiv);
    //     } else {
    //         destinationContainer.appendChild(newEmptyDiv);
    //     }
    //     // destinationContainer.appendChild(newEmptyDiv);
    //     item.parentNode.classList.add('remove-border');
    // }, false);
    // document.addEventListener('dragend', function(e) {
    //     item.style.opacity = '1';
    //     item = null;
    // }, false);
}());
