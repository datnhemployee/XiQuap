
import {
    Codes
} from '../constant/Response';
import {
    on,
    emit,
} from './Service';
import AuthDocument from './API/AuthDocument';
import AuthActionType from '../actions/Auth/AuthActionType';
import LocalStorage from '../storage/LocalStorage';


export default class AuthService {
    constructor () {}
    
    static on (name,callback = (res) => {}) {
        let action = actions[name];
        if(!action){
            return actions.default();
        }
        return action(callback);
    } 

    static emit (name,data,pre = () => {},next = (res) => {}) {
        let action = actions[name];
        if(!action){
            return actions.default();
        }
        return action(
            data,
            pre,
            next,
        );
    } 

    static validateRegister (userForRegister) {
        let result = AuthService.validateLogIn(userForRegister);
        return !!result ?
            result:
            !userForRegister.email ?
            `yêu cầu nhập email.`:
            !userForRegister.phone ?
            `yêu cầu nhập số điện thoại.`:
            undefined;
    }

    static validateLogIn(userForLogIn) {
        return !userForLogIn ?
                `Phát hiện đăng nhập với giá trị rỗng.`:
            !userForLogIn.username?
                `Yêu cầu nhập vào tên tài khoản.`:
            !userForLogIn.password?
                `Yêu cầu nhập vào mật khẩu.`:
                undefined;
    }
    
}
const actions = {
    // On
    [AuthActionType.onTokenLogIn]: (
        callback = (res)=> {},
    ) => {
        on(AuthDocument.onTokenLogIn,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                LocalStorage.setToken(
                    ``,
                    () => {
                        callback(res);
                    }
                );
            }
        });
    },
    [AuthActionType.onLogIn]: (
        callback = (res)=> {},
    ) => {
        on(AuthDocument.onLogIn,(res) => {
            if(res.code === Codes.Success){
                LocalStorage.setToken(
                    res.content.token,
                    () => {
                        callback(res);
                    }
                );
            } else {
                LocalStorage.setToken(
                    ``,
                    () => {
                        callback(res);
                    }
                );
            }
        });
    },
    [AuthActionType.onLogOut]: (
        callback = (res)=> {},
    ) => {
        on(AuthDocument.onLogOut,(res) => {
            if(res.code === Codes.Success){
                LocalStorage.setToken(
                    ``,
                    () => {
                        callback(res);
                    }
                );
            }
        });
    },
    [AuthActionType.onRegister]: (
        callback = (res)=> {},
    ) => {

        on(AuthDocument.onRegister,(res) => {

            if(res.code === Codes.Success){
                LocalStorage.setToken(
                    res.content.token,
                    () => {
                        callback(res);
                    }
                );
            }
            else {
                LocalStorage.setToken(
                    ``,
                    () => {
                        callback(res);
                    }
                );
            }
        });
    },

    // Emit
    [AuthActionType.emitTokenLogIn]: (
        {
            token,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        if(!constrainst){
            emit(AuthDocument.emitLogIn,
                {
                    token: token,
                }
            );
            next ({
                code: Codes.Success,
                content: `Đang gửi dữ liệu lên máy chủ...`,
            })
        } else {
            next ({
                code: Codes.Exception,
                content: constrainst,
            })
        }
    },
    [AuthActionType.emitLogIn]: (
        {
            username,
            password,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = AuthService.validateLogIn({
            username: username,
            password: password,
        });
        if(!constrainst){
            emit(AuthDocument.emitLogIn,
                {
                    username,
                    password,
                }
            );
            next ({
                code: Codes.Success,
                content: `Đang gửi dữ liệu lên máy chủ...`,
            })
        } else {
            next ({
                code: Codes.Exception,
                content: constrainst,
            })
        }
    },
    [AuthActionType.emitLogOut]: (
        data,
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        LocalStorage.getToken((token) => {
            const constrainst = !token ?
            `Không tìm thấy token.`:
            undefined;

            if(!constrainst){
                emit(AuthDocument.emitLogIn,
                    token,
                );
                next ({
                    code: Codes.Success,
                    content: `Đang gửi dữ liệu lên máy chủ...`,
                })
            } else {
                next ({
                    code: Codes.Exception,
                    content: constrainst,
                })
            }
        })
    },
    [AuthActionType.emitRegister]: (
        userForRegister,
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = AuthService.validateRegister(userForRegister);

        if(!constrainst){

            emit(AuthDocument.emitRegister,
                userForRegister,
            );

            next ({
                code: Codes.Success,
                content: `Đang gửi dữ liệu lên máy chủ...`,
            })
        } else {
            next ({
                code: Codes.Exception,
                content: constrainst,
            })
        }
    },
    default: () => {}
}

export {
    actions
};