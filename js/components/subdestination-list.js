export class CreateSubDestination {
    constructor(subdestination) {
        this.subdestination = subdestination;
    }
}

export class SubdestinationList {
    static displaySubdestination() {
        const subdestination = SavedItems.getSubdestination();
        subdestination.forEach((destination) => SubdestinationList.addSubdestinationToList(destination));
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