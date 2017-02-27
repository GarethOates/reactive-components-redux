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
