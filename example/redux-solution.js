var notificationsList,
    notificationsBell;

document.addEventListener('DOMContentLoaded', init);

function init() {
    initComponents();
    hookupStoreSubscription();
    startPoll();

    setInterval(startPoll, 30000);
}

function initComponents() {
    notificationsList = riot.mount('notifications-list')[0];
    notificationsBell = riot.mount('notifications-bell')[0];

    if (notificationsBell) {
        notificationsBell.on('bellClick', onBellClick);
    }
}

function startPoll() {
    Store.dispatch(Notifications.getNotifications());
}

function onBellClick() {
    Store.dispatch(Notifications.notificationsOpened());
}

function hookupStoreSubscription () {
    Store.subscribe(function (state) {
        // These components must be reactive because we don't want DOM updates
        // if the data is unchanged.
        notificationsList.update(state);
        notificationsBell.update(state);

        // Note: We are not listening for a specific event here.  Every time
        // the store is updated, a new state will be published.
    });
}
