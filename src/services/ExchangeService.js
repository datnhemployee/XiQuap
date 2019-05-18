
import {
    Codes
} from '../constant/Response';
import {
    on,
    emit,
} from './Service';
import PostDocument from './API/PostDocument';
import ExchangeType from '../actions/Exchange/ExchangeActionType';

export const actions = {
    // On
    [ExchangeType.onInsertPost]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onInsertPost,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
        });
    },
    [ExchangeType.onGetPost]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onGetPost,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    

    // Emit
    [ExchangeType.emitInsertPost]: (
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

        const constrainst = !name ? 
            `Chưa ghi tên vật phẩm.`:
            typeName ?
            `Chưa chọn tên loại vật phẩm`:
            undefined;

        if(!constrainst){
            emit(PostDocument.emitInsertPost,
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
    [ExchangeType.emitGetPost]: (
        {
            token,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = undefined;

        if(!constrainst){
            emit(PostDocument.emitGetPost,
                {
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