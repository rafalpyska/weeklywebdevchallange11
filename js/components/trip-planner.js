export class CreateSubDestination {
    constructor(subdestination) {
        this.subdestination = subdestination;
    }
}

export class TripPlanner {
    static createTripPlanner() {
        const tripPlannerBodyWrapper = document.querySelector('.trip-planner__body-wrapper');
        const tripPlannerControls = document.querySelector('.trip-planner__controls');
        const docFrag = document.createDocumentFragment();
        const tripPlannerBody = document.createElement('div');
        tripPlannerBody.classList.add('trip-planner__body');

        tripPlannerBody.innerHTML = `
   
                   <div class="trip-planner__date">
                        <p>Day 1</p>
                        <input type="date" class="trip-planner__datepicker">
                    </div>
                    <div class="trip-planner__destination-container">
                        <div id="draggable2" class="trip-planner__destination trip-planner__destination--empty">

                        </div>
                        <form class="trip-planner__form">
                            <div class="trip-planner__subdestination-list-container">
                                <ul class="trip-planner__subdestination-list">

                                </ul>
                            </div>
                            <label for="add-subdestination-text" class="visuallyhidden">Type in sub destination</label>
                            <input type="text" name="add-subdestination-text" id="add-subdestination-text" class="trip-planner__add-subdestination-text" placeholder="add sub destination">

                            <label for="add-subdestination-text" class="visuallyhidden">Add/Submit sub destination</label>
                            <input type="submit" value="add sub destination" class="trip-planner__add-subdestination-input trip-planner__add-subdestination-input--add">
                            <label for="add-subdestination-text" class="visuallyhidden">Clear all fields</label>
                            <input type="submit" value="clear all fields" class="trip-planner__add-subdestination-input trip-planner__add-subdestination-input--clear">

                        </form>
                    </div>
         `;
        docFrag.appendChild(tripPlannerBody);
        // tripPlannerBodyWrapper.appendChild(docFrag);
    }
    static changeTitle() {
        const tripPlannerTitle = document.querySelector('.trip-planner__heading-title');

        tripPlannerTitle.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
        }, false);

        tripPlannerTitle.addEventListener('focusout', (e) => {
            localStorage.setItem('trip-planner-title', e.target.textContent);
        }, false);
        document.addEventListener('DOMContentLoaded', () => {
            if (localStorage.getItem('trip-planner-title')) {
                tripPlannerTitle.textContent = localStorage.getItem('trip-planner-title');
            }
        }, false);

    }
    static setDate() {
        const datePicker = document.querySelector('.trip-planner__datepicker');
        let now = new Date();

        let day = ("0" + now.getDate()).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);

        let today = now.getFullYear() + "-" + (month) + "-" + (day);

        datePicker.value = today;

        datePicker.addEventListener('focusout', (e) => {
            localStorage.setItem('date', datePicker.value);
        }, false);

        document.addEventListener('DOMContentLoaded', () => {
            if (localStorage.getItem('date')) {
                datePicker.value = localStorage.getItem('date');
            }
        }, false);
    }
    static displaySubdestination() {
        const subdestination = SavedItems.getSubdestination();
        subdestination.forEach((destination) => TripPlanner.addSubdestinationToList(destination));
    }
    static addSubdestinationToList(destination) {

        const listContainer = document.querySelector('.trip-planner__subdestination-list');
        const docFrag = document.createDocumentFragment()
        const listItem = document.createElement('li');
        listItem.classList.add('trip-planner__subdestination-list-item');
        listItem.innerHTML = `
                ${destination.subdestination}
            `;
        const btnRemove = document.createElement('a');
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
    static displayDestination() {
        const StoredDestination = [
            {
                place: 'Mt. Bromo',
                time: '5 hours',
                image: 'images/svg/mountains.svg',
                id: 1,
                attr: 'mountain'
            },
            {
                place: 'Mt. Semeru',
                time: '3 hours',
                image: 'images/svg/mountains.svg',
                id: 2,
                attr: 'mountain'
            },
            {
                place: 'Mt. Panderman',
                time: '4 hours',
                image: 'images/svg/mountain.svg',
                id: 3,
                attr: 'mountain'
            },
            {
                place: 'Hawai Waterpark',
                time: '1 hours',
                image: 'images/svg/big-wheel.svg',
                id: 4,
                attr: 'amusement'
            },
            {
                place: 'Malang Night Paradise',
                time: '2 hours',
                image: 'images/svg/big-wheel.svg',
                id: 5,
                attr: 'amusement'
            },
            {
                place: 'Sengkaling Recreational Park',
                time: '1.5 hours',
                image: 'images/svg/big-wheel.svg',
                id: 6,
                attr: 'amusement'
            }

        ];
        const places = StoredDestination;

        places.forEach((destination) => TripPlanner.addDestination(destination));
    }
    static addDestination(destination) {
        const destinationList = document.querySelector('.trip-planner__destination-list-items');
        const docFrag = document.createDocumentFragment();

        const div = document.createElement('div');
        
        div.classList.add('trip-planner__destination', 'trip-planner__destination--filled', 'trip-planner__destination-list--filled');
        div.setAttribute("data-value",`${destination.id}"`);

        div.setAttribute('draggable', 'true');
        div.setAttribute('data-attr', `${destination.attr}`);

        div.innerHTML = `
                            <div class="trip-planner__destination-info" draggable="false">
                                <h2 class="trip-planner__destination-info-heading">${destination.place}</h2>
                                <p class="trip-planner__destination-info-paragraph">estimated time: <span class="heading-color">${destination.time}</span></p>
                            </div>
                            <div class="trip-planner__destination-details" draggable="false"">
                                <object type="image/svg+xml" data="${destination.image}"></object>
                                <a href="#" class="trip-planner__destination-details-link">view details</a>
                            </div>
                        </div>
            `;
        docFrag.appendChild(div);
        destinationList.appendChild(docFrag);
    }
    static sortList() {
        const select = document.querySelector('.trip-planner__destination-sort');
        const destinationList = document.querySelector('.trip-planner__destination-list');
        const list = [];

        destinationList.addEventListener('change', (e) => {
            if(e.target.classList.contains('trip-planner__destination-sort')) {
                const filled = document.querySelectorAll('.trip-planner__destination-list--filled');

                [...filled].filter((item) => {
                    if(e.target.value === 'mountain') {
                        if (item.dataset.attr === 'amusement') {
                            item.classList.add('hidden');
                        } else {
                            item.classList.remove('hidden');
                        }
                    } else if(e.target.value === 'amusement') {
                        if (item.dataset.attr === 'mountain') {
                            item.classList.add('hidden');
                        } else {
                            item.classList.remove('hidden');
                        }
                    } else {
                        item.classList.remove('hidden');
                    }
                });
            }
        });

    }
}
export class SavedItems {
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
