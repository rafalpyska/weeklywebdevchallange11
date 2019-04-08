(function () {
    const datePicker = document.querySelector('.trip-planner__datepicker');
    datePicker.valueAsDate = new Date();

    const items = document.querySelectorAll('.trip-planner__destination--filled');
    const itemsLength = items.length;
    const empty = document.querySelectorAll('.trip-planner__destination--empty');

    for (let i = 0; i < itemsLength; i++) {
        items[i].setAttribute('draggable', 'true');
    }

    let item = null;

    document.addEventListener('dragstart', function(e) {
        item = e.target;
        item.style.opacity = '0.4';
        item.classList.add('hold');
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
