export class CreateSubDestination {
    constructor(subdestination) {
        this.subdestination = subdestination;
    }
}

export class TripPlanner {
    static changeTitle() {
        const tripPlannerTitle = document.querySelector('.trip-planner__heading-title');

        tripPlannerTitle.addEventListener('keydown', (e) => {
            if(e.keyCode === 13) {
                e.preventDefault();
            }
        }, false);

        tripPlannerTitle.addEventListener('focusout', (e) => {
            localStorage.setItem('trip-planner-title', e.target.textContent);
        }, false);
        document.addEventListener('DOMContentLoaded', () => {
            if(localStorage.getItem('trip-planner-title')) {
                tripPlannerTitle.textContent = localStorage.getItem('trip-planner-title');
            }
        },false);
    }
    static setDate() {
        const datePicker = document.querySelector('.trip-planner__datepicker');
        datePicker.valueAsDate = new Date();

        datePicker.addEventListener('focusout', (e) => {
            localStorage.setItem('date', datePicker.value);
        }, false);

        document.addEventListener('DOMContentLoaded', () => {
            if(localStorage.getItem('date')) {
                datePicker.value = localStorage.getItem('date');
            }
        },false);
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

        places.forEach((destination) => TripPlanner.addDestination(destination));
    }
    static addDestination(destination) {
        const destinationList = document.querySelector('.trip-planner__destination-list-items');
        const docFrag = document.createDocumentFragment();

        const div = document.createElement('div');
        
        div.classList.add('trip-planner__destination', 'trip-planner__destination--filled', 'trip-planner__destination-list--filled');
        div.setAttribute("data-value",`${destination.id}"`);

        div.setAttribute('draggable', 'true');

        div.innerHTML = `
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
        docFrag.appendChild(div);
        destinationList.appendChild(docFrag);
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
