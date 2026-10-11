import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false })
});

export async function scheduleCheckInReminder(roomName: string, date: string, start: string) {
  await Notifications.requestPermissionsAsync();
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = start.split(':').map(Number);
  const reminder = new Date(year, month - 1, day, hour, minute - 15);
  if (reminder.getTime() <= Date.now()) reminder.setMinutes(new Date().getMinutes() + 1);
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Nhắc check-in phòng học', body: `${roomName} bắt đầu lúc ${start}. Hãy đến trước 15 phút!` },
    trigger: { date: reminder } as any
  });
}
