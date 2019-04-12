const filledContainers = document.querySelectorAll('.trip-planner__destination--filled');
const emptyContainers = document.querySelectorAll('.trip-planner__destination--empty');
const destinationList = document.querySelector('.trip-planner__destination-list');
const destinationContainer = document.querySelector('.trip-planner__destination-container');

export class DestinationList {
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