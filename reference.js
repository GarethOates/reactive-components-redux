function startPoll() {
    // 1. The loading of the notifications and handling of the data is all tightly coupled here.
    loadNotifications(function (error, notifications) {
        // 2.
        if (error) return updateViewWithError();

        // 3. Parsing and formatting of the data for UI is here too.
        // What if you need it formatted differently for different purposes?
        // Do the same request in different places?
        // Put unrelated code into this notifications controller?
        // Function is not pure, and mutates the notifications object directly
        format(notifications);

        // 4: The DOM is managed here.
        // If the bell has it's own state object, then it has more extensibility and the code
        // for the bell will not be coupled to the notifications state, but only to the
        // contract/interface that is defined on the UI component.
        updateBell(response.unseenCount);

        // 5: Specific business logic for the UI component is taking place here.
        // It should be simply reacting to the data it is provided.
        notifications.forEach(addNotification);

        // Specific business logic for the component is here.
        if (!notifications.length) {
            showNoNotificationsMessage();
        }
    });

    loadNotifications();
}

function onBellClick() {
    var params = {'userId': 10001};

    $.post(unseenCountUrl, params);

    bell.setUnseenCount(0);
    openNotificationWindow();
}

function init() {
    bell.addEventListener('click', onBellClick);

    startPoll();

    setInterval(startPoll, 30000);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Store = Redux.createStore();
// show the flatness, have a bell and notifications properties


// The refactor of the view controller
Store.subscribe(function (state) {
    // These components must be reactive because we don't want DOM updates if the data is unchanged.
    // Give an example of an iframe src attribute.
    // Explain that we are not listening for a specific event.
    NotificationsBell.update(state.bell);
    Notifications.update(state.notifications);
});

function startPoll() {
    Store.dispatch({'type': 'getNotifications'});
}

function onBellClick() {
    Store.dispatch({'type': 'notificationsOpened'});
}

function init() {
    bell.addEventListener('click', onBellClick);

    startPoll();
    setInterval(startPoll, 30000);
}


// in the notifications reducer
switch(action.type) {
    case 'getNotifications':
        // format

    default:
        return state;
}

// in the bell reducer
switch(action.type) {
    case 'notificationsOpened':
        // unseen count

    default:
        return state;
}

// The point is you don't need to go too far. just a couple of things is enough.
// If you simply open up the Fronter codebase and pick some of the parts from the Classic notifications code,
// you will be able to prove your point without having to make so much stuff badly.
// Then, all you need to do is refactor the smallest example. Live :)

// Introduce the issue in the smallest way. Like above. Then say, "Of course, this code is so small and is meant for demo only. To see the magnitude of
// a real world clusterfucked implementation of notifications, one must look no further than ones own repository."


// Notifications.js
- Querying the DOM for state
- functions that have multiple responsibilities
- DOM and service tightly bound
- code is very easy to introduce bugs into
- components directly referencing each other
- component management and update is micromanaged in this controller

// Advantages that Redux and reactive components bring
- Responsibility is completely separated
- Developers can work in parallel according to a contract
- Mirrors backend development against APIs
