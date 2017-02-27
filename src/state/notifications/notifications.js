var Notifications = (function () {

var GET_NOTIFICATIONS    = 'GET_NOTIFICATIONS',
    NOTIFICATIONS_OPENED = 'NOTIFICATIONS_OPENED';

function gotNotifications (notifications) {
    return {
        'type'   : GET_NOTIFICATIONS,
        'payload': notifications
    };
}

function notificationsOpened() {
    return {
        'type': NOTIFICATIONS_OPENED
    };
}

function reducer(state, action) {
    if (!state) {
        state = {
            'unseenCount': 10,
            'notifications': []
        };
    }

    switch(action.type) {
        case GET_NOTIFICATIONS:
            return Object.assign({}, state, {
                'notifications': action.payload.items,
                'unseenCount': action.payload.unseen
            });
            return state;
        case NOTIFICATIONS_OPENED:
            return Object.assign({}, state, {
                'unseenCount': 0
            });

        default:
            return state;
    }
}

return {
    'getNotifications'   : getNotifications,
    'notificationsOpened': notificationsOpened,
    'reducer'            : reducer
};

}());
