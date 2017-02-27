document.addEventListener('DOMContentLoaded', init);

function init() {
    var Store = Redux.createStore(Notifications.reducer);
}
