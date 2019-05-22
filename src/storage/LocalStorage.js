import {
    AsyncStorage,
} from 'react-native';

export default class LocalStorage {
    static getToken (callback = (result) => {}) {
        AsyncStorage.getItem('token',(error,result) => {
            callback(result);
        });
    }

    static setToken (token, callback = () => {}) {
        AsyncStorage.removeItem('token',() => {
            AsyncStorage.setItem('token',token,() => {
                callback();
            });
        });
    }
}