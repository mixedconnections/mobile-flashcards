import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';


const NOTIFICATION_KEY = 'notification:mobile-flashcards';

function createNotification() {
    return {
        title: 'Where have you been?',
        body: "New questions today in mobile-flashcards!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
	    priority: 'high',
	    sticky: false,
	    vibrate: true
        },
    };
}

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync().then(() => {

			    let today = new Date();
                            today.setDate(today.getDate());
                            today.setHours(23, 0, 0);

                            const notification = createNotification();

                            Notifications.scheduleLocalNotificationAsync(notification, {
                                time: today,
                                repeat: 'day'
                            }).then(result => {

                            });
                        });

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                });
            }
        });
}
