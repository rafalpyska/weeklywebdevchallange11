export class DragDrop {
    static init() {
        let scrollable = true;
        const listener = function(e) {
            if(!scrollable) {
                e.preventDefault();
            }
        };
        document.addEventListener('touchmove', listener, { passive: false });
        dragula([
            document.getElementById('draggable2'),
            document.getElementById('draggable1')
            ]).on('drag', function(el,source) {
                scrollable = false;
            }).on('drop', function(el, source) {
                scrollable = true;
            }).on('dragend', function(el, source) {
                scrollable = true;
            });
    }
}


