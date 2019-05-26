
import {
    Codes
} from '../constant/Response';
import {
    on,
    emit,
} from './Service';
import MessageBox from '../components/MessageBox';
import LocalStorage from '../storage/LocalStorage';
import StockDocument from './API/StockDocument';
import StockActionType from '../actions/Stock/StockActionType';

export const actions = {
    // On
    [StockActionType.onGet]: (
        callback = (res)=> {},
    ) => {
        on(StockDocument.onGet,(res) => {
            if(res.code === Codes.Success){
            } else {
            }
            callback(res);
        });
    },
    [StockActionType.onInsert]: (
        callback = (res)=> {},
    ) => {
        on(StockDocument.onInsert,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    [StockActionType.onBuy]: (
        callback = (res)=> {},
    ) => {
        on(StockDocument.onBuy,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    [StockActionType.onGetOne]: (
        callback = (res)=> {},
    ) => {
        on(StockDocument.onGetOne,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    [StockActionType.onApprove]: (
        callback = (res)=> {},
    ) => {
        on(StockDocument.onApprove,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    [StockActionType.onGetMyStock]: (
        callback = (res)=> {},
    ) => {
        on(StockDocument.onGetMyStock,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    [StockActionType.onGetBought]: (
        callback = (res)=> {},
    ) => {
        on(StockDocument.onGetBought,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },

    // Emit
    [StockActionType.emitInsert]: (
        {
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
            !typeName ?
            `Chưa chọn tên loại vật phẩm`:
            !token ?
            `Phải đính kèm token`:
            undefined;

        if(!constrainst){
            emit(StockDocument.emitInsert,
                {
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
    [StockActionType.emitGet]: (
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
            emit(StockDocument.emitGet,
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
    [StockActionType.emitBuy]: (
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
            emit(StockDocument.emitBuy,
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
    [StockActionType.emitGetOne]: (
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
            emit(StockDocument.emitGetOne,
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
    [StockActionType.emitApprove]: (
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
            emit(StockDocument.emitApprove,
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
    [StockActionType.emitGetMyStock]: (
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
            emit(StockDocument.emitGetMyStock,
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
    [StockActionType.emitGetBought]: (
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
            emit(StockDocument.emitGetBought,
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
    default: () => {}
}

export default class StockService {
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