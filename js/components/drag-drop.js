export class DragDrop {
    static init() {
        let scrollable = true;
        const listener = function (e) {
            if (!scrollable) {
                e.preventDefault();
            }
        };
        let store = [];
        let nodesArray = document.querySelectorAll('.trip-planner__destination-list-items > div');
        nodesArray = [...nodesArray].filter((e) => {
            return store.map(function(d) { return d['element']; }).indexOf(e.id) === -1;
        }).forEach( (e) => {
            store.push({'element':e.id, 'container': 'draggable1'});
        });
        if(localStorage.getItem('store')) {
            store = JSON.parse(localStorage.getItem('store'));
        }

        store.forEach((obj) => {
            document.getElementById(obj.container).appendChild(document.getElementById(obj.element));
        });
        if (document.getElementById('draggable2').childElementCount) {
            document.querySelector('#draggable2 > div').style.margin = '0';
            document.querySelectorAll('#draggable1 > div').forEach((item) => {
                item.removeAttribute('draggable');
            })

        }
        document.addEventListener('touchmove', listener, {passive: false});
        const form = document.querySelector('.trip-planner__form');
        let drake = dragula([
            document.getElementById('draggable2'),
            document.getElementById('draggable1')
        ], {
            moves: function(el, source, handle, sibling) {
                if(el.getAttribute('draggable', 'true')) {
                    return true;
                } else {
                    return false;
                }
            }
        }).on('drag', function (el, source) {
            scrollable = false;
            el.classList.add('drag', 'touch-action-none');
        }).on('drop', function (el, target, source, sibling) {
            scrollable = true;
            el.classList.remove('drag');
            el.classList.add('touch-action-none');
            if (document.getElementById('draggable2').childElementCount === 1) {
                document.querySelector('#draggable2 > div').style.margin = '0';
            } else {
                el.style.margin = '1.5rem';
            }
            if(target.id === 'draggable2' && target.childElementCount === 1) {
                let sourceItems = source.children;
                [...sourceItems].forEach((item) => {
                   item.removeAttribute('draggable');
                });
            }
            if(target.id === 'draggable1') {
                let sourceItems = target.children;
                [...sourceItems].forEach((item) => {
                    item.setAttribute('draggable', 'true');
                });
            }
            let indexEl = store.map(function(d) { return d['element']; }).indexOf(el.id);
            if (indexEl>-1)
                store.splice(indexEl, 1);

            let indexDrop = store.length;
            if(sibling) {
                indexDrop = store.map((d) => { return d['element']; }).indexOf(sibling.id);
            }

            store.splice(indexDrop, 0, {'element': el.id, 'container': target.id});

            localStorage.setItem('store', JSON.stringify(store));
        }).on('dragend', function (el, source) {
            scrollable = true;
        });
    }
}

// target.classList.add('disabled');
// let place = el.firstChild.nextElementSibling.firstChild.nextElementSibling.innerText;
// let image = el.children[1].firstChild.nextElementSibling.getAttribute('data');
// el.innerHTML = `
//     <div class="trip-planner__destination-details" draggable="false"">
//         <object type="image/svg+xml" data="${image}"></object>
//         <h2 class="trip-planner__destination-info-heading">${place}</h2>
//     </div>
//     <div class="trip-planner__destination-info" draggable="false">
//          <p class="trip-planner__destination-info-paragraph">03.30 - -09.00</p>
//     </div>
// `;
// el.style.margin = '0';


