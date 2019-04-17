import { TripPlanner } from "../components/trip-planner.js";

export class MutationObserve {
    static onChildAdd() {
        const empty = document.querySelector('.trip-planner__destination--empty');
        const form = document.querySelector('.trip-planner__form');

        let mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if(mutation.addedNodes.length) {
                    form.style.opacity = '1';
                    form.style.maxHeight = '100%';
                }
                if(mutation.removedNodes.length) {
                    form.style.opacity = '0';
                    form.style.maxHeight = '0';
                }
            });
        });

        mutationObserver.observe(empty, {
            childList: true,
        });
    }
}