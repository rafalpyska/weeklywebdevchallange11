export function clearLocalStorage(e) {
    if(e.target.classList.contains('trip-planner__add-subdestination-input')) {
        for(let i = 0; i < localStorage.length; i++) {
            localStorage.clear();
            window.location.reload();
        }
    }
}