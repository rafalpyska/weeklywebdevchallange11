export class MutationObserve {
    static onChildAdd() {
        const empty = document.querySelector('.trip-planner__destination--empty');
        const form = document.querySelector('.trip-planner__form');

        let mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if(mutation.addedNodes.length === 1) {
                    form.classList.add('visible');
                    mutationObserver.disconnect();
                }
            });
        });

        mutationObserver.observe(empty, {
            childList: true,
        });
    }
}
