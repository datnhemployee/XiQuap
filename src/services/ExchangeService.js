
import {
    Codes
} from '../constant/Response';
import {
    on,
    emit,
} from './Service';
import PostDocument from './API/PostDocument';
import ExchangeType from '../actions/Exchange/ExchangeActionType';
import MessageBox from '../components/MessageBox';
import LocalStorage from '../storage/LocalStorage';

export const actions = {
    // On
    [ExchangeType.onInsertItem]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onInsertItem,(res) => {
            if(res.code === Codes.Success){
                MessageBox(`Đăng thành công`)
            } else {
                MessageBox(`Đăng thất bại: ${res.content}`)
            }
            callback(res);
        });
    },
    [ExchangeType.onGetItem]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onGetItem,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    [ExchangeType.onGiveLike]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onGiveLike,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    [ExchangeType.onExchange]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onExchange,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    

    // Emit
    [ExchangeType.emitInsertItem]: (
        {
            ownerName,
            name,
            description,
            typeName,
            token,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = !ownerName ?
            `Phải đính kèm tên chủ bài đăng.`:
            !name ? 
            `Chưa ghi tên vật phẩm.`:
            !typeName ?
            `Chưa chọn tên loại vật phẩm`:
            !token ?
            `Phải đính kèm token`:
            undefined;

        if(!constrainst){
            emit(PostDocument.emitInsertItem,
                {
                    ownerName,
                    name,
                    description,
                    typeName,
                    token,
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
    [ExchangeType.emitGetItem]: (
        {
            page,
            token,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = undefined;

        if(!constrainst){
            emit(PostDocument.emitGetItem,
                {
                    page,
                    token,
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
    [ExchangeType.emitGiveLike]: (
        {
            _id,
            token,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = undefined;

        if(!constrainst){
            emit(PostDocument.emitGiveLike,
                {
                    _id,
                    token,
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
    [ExchangeType.emitExchange]: (
        {
            token,
            _id,
            photoUrl,
            name,
            description
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = undefined;

        if(!constrainst){
            emit(PostDocument.emitExchange,
                {
                    token,
                    _id,
                    photoUrl,
                    name,
                    description
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

    default: () => {}
}

export default class ExchangeService {
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

}