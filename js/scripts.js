(function () {
    const nav_toggle = document.querySelector(".nav__toggle");
    const nav = document.querySelector(".nav__list");

    nav_toggle.addEventListener("click", function () {
        nav.classList.toggle("nav__list--expanded");
        // if(nav.classList.contains("navigation__expanded--visible")) {
        //     nav__list.setAttribute('aria-expanded', true);
        // } else {
        //     nav__list.setAttribute("aria-expanded", false);
        // }
    }, false);
    
    const datePicker = document.querySelector('.trip-planner__datepicker');
    datePicker.valueAsDate = new Date();

    const items = document.querySelectorAll('.trip-planner__destination--filled');
    const empty = document.querySelectorAll('.trip-planner__destination--empty');
    const destinationList = document.querySelector('.trip-planner__destination-list');
    const destinationContainer = document.querySelector('.trip-planner__destination-container');

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

    // class DestinationList {
    //     static displayDestination() {
    //         const StoredDestination = [
    //             {
    //                 place: 'Mt. Bromo',
    //                 time: 'estimated time: 5 hours',
    //                 image: 'images/svg/mountains.svg'
    //             },
    //             {
    //                 place: 'Mt. Semeru',
    //                 time: 'estimated time: 3 hours',
    //                 image: 'images/svg/mountains.svg'
    //             },
    //             {
    //                 place: 'Mt. Panderman',
    //                 time: '4 hours',
    //                 image: 'images/svg/mountains.svg'
    //             }
    //         ];
    //         const places = StoredDestination;
    //
    //         places.forEach((destination) => DestinationList.addDestination(destination));
    //     }
    //     static addDestination(destination) {
    //         const docFrag = document.createDocumentFragment();
    //         const divOuter = docFrag.appendChild(document.createElement('div'));
    //         const divInner = divOuter.appendChild(document.createElement('div'));
    //
    //         divOuter.classList.add('trip-planner__destination', 'trip-planner__destination--empty','trip-planner__destination--list-empty');
    //         divInner.classList.add('trip-planner__destination', 'trip-planner__destination--filled');
    //
    //         divInner.setAttribute('draggable', 'true');
    //
    //         divInner.innerHTML = `
    //                         <div class="">
    //                             <p>${destination.place}</p>
    //                             <p>estimated time: <span class="heading-color">${destination.time}</span></p>
    //                         </div>
    //                         <div class="">
    //                             <object type="image/svg+xml" data="${destination.image}"></object>
    //                             <a href="#">view details</a>
    //                         </div>
    //                     </div>
    //         `;
    //         destinationList.appendChild(docFrag);
    //     }
    // }
    //
    // document.addEventListener('DOMContentLoaded', DestinationList.displayDestination);
    //
    //
    // let item = null;

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
    //     if(e.target.nextSibling.length = 0) {
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
