import {
    AsyncStorage,
} from 'react-native';

export default class LocalStorage {
    static async getToken (callback = (result) => {}) {
        AsyncStorage.getItem('token',(error,result) => {
            callback(result);
        });
    }

    static async setToken (token, callback = () => {}) {
        AsyncStorage.removeItem('token',() => {
            AsyncStorage.setItem('token',token,() => {
                callback();
            });
        });
    }
}