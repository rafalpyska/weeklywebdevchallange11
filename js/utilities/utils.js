export function clearLocalStorage(e) {
    const btnClear = document.querySelector('.trip-planner__add-subdestination-input--clear');
    btnClear.addEventListener('click', (e) => {
        for(let i = 0; i < localStorage.length; i++) {
            localStorage.clear();
            window.location.reload();
        }
    });

}