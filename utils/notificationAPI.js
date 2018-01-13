import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashCard:notifications'

function createNotification () {
    return {
        title: 'Reminder to Study',
        body: "👋 don't forget to read questions for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (!data) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync().then(() => {
                            let today = new Date()
                            today.setDate(today.getDate())
                            today.setHours(20)
                            today.setMinutes(0)

                            const notification = createNotification();

                            Notifications.scheduleLocalNotificationAsync(notification, {
                                time: today,
                                repeat: 'day',
                            }).then(result => {
                            })
                        })
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                })
            }
        })
}