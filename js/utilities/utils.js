export function clearLocalStorage() {
    const btnClear = document.querySelector('.trip-planner__add-subdestination-input--clear');
    btnClear.addEventListener('click', () => {
        for(let i = 0; i < localStorage.length; i++) {
            localStorage.clear();
            window.location.reload();
        }
    });
}

export function randomNumberRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random.toString();
}
