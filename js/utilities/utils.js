export function clearLocalStorage() {
    for(let i = 0; i < localStorage.length; i++) {
        localStorage.clear();
        window.location.reload();
    }
}