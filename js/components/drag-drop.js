export class DragDrop {
    static init() {
        let scrollable = true;
        const listener = function (e) {
            if (!scrollable) {
                e.preventDefault();
            }
        };
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
        }).on('drop', function (el, target, source, sibling) {
            scrollable = true;
            if (target.id === 'draggable2') {
                el.style.margin = '0';
            } else {
                el.style.margin = '1.5rem';
            }
            // if (target.id === 'draggable2' && target.childElementCount > 1) {
            //     drake.cancel(true);
            //     console.log(source.children);
            // }
            // if(target.id === 'draggable2' && target.childElementCount === 1) {
            //     let sourceItems = source.children;
            //     [...sourceItems].forEach((item) => {
            //        item.removeAttribute('draggable');
            //     });
            // }
            // if(target.id === 'draggable1') {
            //     let sourceItems = source.children;
            //     [...sourceItems].forEach((item) => {
            //         item.setAttribute('draggable', 'true');
            //     });
            // }
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


