
import {
    Codes
} from '../constant/Response';
import {
    on,
    emit,
} from './Service';
import TypeDocument from './API/TypeItemDocument';
import TypeItemActionType from '../actions/Type/TypeItemActionType';


export const actions = {
    // On
    [TypeItemActionType.onGetAll]: (
        callback = (res)=> {},
    ) => {
        on(TypeDocument.onGetAllType,(res) => {
            if(res.code === Codes.Success){
            } else {
            }
            console.log(`Các type là: ${JSON.stringify(res)}`);
            callback(res);
        });
    },

    // Emit
    [TypeItemActionType.emitGetAll]: (
        {
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = undefined;

        if(!constrainst){
            emit(TypeDocument.emitGetAllType,
                {
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

export default class TypeItemService {
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