(function () {
    const datePicker = document.querySelector('.trip-planner__datepicker');
    datePicker.valueAsDate = new Date();

    const items = document.querySelectorAll('.trip-planner__destination--filled');
    const empty = document.querySelectorAll('.trip-planner__destination--empty');
    const destinationList = document.querySelector('.trip-planner__destination-list');

    class CreateDestination {
        constructor(place, time, image) {
            this.place = place;
            this.time = time;
            this.image = image;
        }
    }

    class DestinationList {
        static displayDestination() {
            const StoredDestination = [
                {
                    place: 'Mt. Bromo',
                    time: 'estimated time: 5 hours',
                    image: 'images/svg/mountains.svg'
                },
                {
                    place: 'Mt. Semeru',
                    time: 'estimated time: 3 hours',
                    image: 'images/svg/mountains.svg'
                },
                {
                    place: 'Mt. Panderman',
                    time: '4 hours',
                    image: 'images/svg/mountains.svg'
                }
            ];
            const places = StoredDestination;

            places.forEach((destination) => DestinationList.addDestination(destination));
        }
        static addDestination(destination) {
            const docFrag = document.createDocumentFragment();
            const divOuter = docFrag.appendChild(document.createElement('div'));
            const divInner = divOuter.appendChild(document.createElement('div'));

            divOuter.classList.add('trip-planner__destination', 'trip-planner__destination--empty','trip-planner__destination--list-empty');
            divInner.classList.add('trip-planner__destination', 'trip-planner__destination--filled');

            divInner.setAttribute('draggable', 'true');

            divInner.innerHTML = `
                            <div class="">
                                <p>${destination.place}</p>
                                <p>estimated time: <span class="heading-color">${destination.time}</span></p>
                            </div>
                            <div class="">
                                <object type="image/svg+xml" data="${destination.image}"></object>
                                <a href="#">view details</a>
                            </div>
                        </div>
            `
            destinationList.appendChild(docFrag);
        }
    }

    document.addEventListener('DOMContentLoaded', DestinationList.displayDestination);


    let item = null;

    document.addEventListener('dragstart', function(e) {
        item = e.target;
        item.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', '');

    }, false);

    document.addEventListener('dragover', function(e) {
        if(item) {
            e.preventDefault();
        }
    }, false);

    document.addEventListener('drop', function(e) {
        if(e.target.classList.contains('trip-planner__destination--empty')) {
            e.target.appendChild(item);
            e.preventDefault();
        }
    }, false);
    document.addEventListener('dragend', function(e) {
        item.style.opacity = '1';
        item = null;
    }, false);
}());
