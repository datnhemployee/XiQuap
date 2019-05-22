import {ToastAndroid} from 'react-native';

export default MessageBox = (
    message = `Nội dung rỗng`,
    duration = ToastAndroid.LONG,
) => {
    ToastAndroid.show(
        message,
        duration,
    );
}