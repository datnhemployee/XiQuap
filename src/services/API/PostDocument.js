/**
 * Đây là tài liệu cho API bên server 
 * không nên thay đổi
 */

export default {
    onInsertItem: 'insert-item',
    onGiveLike: 'give-like',
    onExchange: 'exchange',
    onGetItems: 'get-items',
    onGetItem: 'get-item',
    onApproveItem: 'approve',
    onGetMyShop: 'get-my-shop',
    onGetWaitting: 'get-waitting',

    emitInsertItem: 'insert-item',
    emitGiveLike: 'give-like',
    emitExchange: 'exchange',
    emitGetItems: 'get-items',
    emitGetItem: 'get-item',
    emitApproveItem: 'approve',
    emitGetMyShop: 'get-my-shop',
    emitGetWaitting: 'get-waitting',
} 

const options = {
    population: {
        itemList: 'itemList',
    },
}

export {
    options,
}