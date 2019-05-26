
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
    [ExchangeType.onGetMyShop]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onGetMyShop,(res) => {
            if(res.code === Codes.Success){
            } else {
            }
            callback(res);
        });
    },
    [ExchangeType.onGetWaitting]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onGetWaitting,(res) => {
            if(res.code === Codes.Success){
            } else {
            }
            callback(res);
        });
    },
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
    [ExchangeType.onGetItemByPage]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onGetItems,(res) => {
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
    [ExchangeType.onApproveItem]: (
        callback = (res)=> {},
    ) => {
        on(PostDocument.onApproveItem,(res) => {
            if(res.code === Codes.Success){
                
            } else {
                
            }
            callback(res);
        });
    },
    

    // Emit
    [ExchangeType.emitInsertItem]: (
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
            emit(PostDocument.emitInsertItem,
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
    [ExchangeType.emitGetMyShop]: (
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
            emit(PostDocument.emitGetMyShop,
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
    [ExchangeType.emitGetWaitting]: (
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
            emit(PostDocument.emitGetWaitting,
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
    [ExchangeType.emitGetItemByPage]: (
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
            emit(PostDocument.emitGetItems,
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

        const constrainst = !name ?
            ` Không tìm thấy tên của vật phẩm.`:
            undefined;

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
    [ExchangeType.emitGetItem]: (
        {
            token,
            _id,
            option,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = !_id ?
            ` Không tìm thấy Mã bài viết.`:
            undefined;

        if(!constrainst){
            emit(PostDocument.emitGetItem,
                {
                    token,
                    _id,
                    option,
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
    [ExchangeType.emitApproveItem]: (
        {
            token,
            _id,
            _idApproved,
        },
        pre = () => {},
        next = (res) => {},
    ) => {
        pre();

        const constrainst = !_id ?
            ` Không tìm thấy Mã bài viết.`:
            !_id ?
            ` Không tìm thấy token.`:
            !_idApproved ?
            ` Không tìm thấy Mã chấp nhận.`:
            undefined;

        if(!constrainst){
            emit(PostDocument.emitApproveItem,
                {
                    token,
                    _id,
                    _idApproved,
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