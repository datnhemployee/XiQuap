import ExchangeActionType from './ExchangeActionType';
import ExchangeService from '../../services/ExchangeService';

import ActionAbstraction from '../ActionAbstraction';


class ExchangeAction {
    static emitDefinition (
        data,
        type,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) {
        
        return ActionAbstraction.emitDefinition(
            data,
            type,
            ExchangeService,
            pre,
            next,
            dispatch,
        );
    }

    static onDefinition (
        type,
        callback = (res) => {},
        dispatch,
    ) {
        return ActionAbstraction.onDefinition(
            type,
            ExchangeService,
            callback,
            dispatch,
        );
    }

    static emit (name) {
        return ActionAbstraction.emit(name,actions);
    }

    static on (name) {
        return ActionAbstraction.on(name,actions);
    }
}

const actions = {
    // On
    [ExchangeActionType.onInsertItem]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onInsertItem,
            callback,
            dispatch,
    ),
    
    [ExchangeActionType.onGetItemByPage]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onGetItemByPage,
            callback,
            dispatch,
    ),

    [ExchangeActionType.onGiveLike]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
        ExchangeActionType.onGiveLike,
        callback,
        dispatch, 
    ),

    [ExchangeActionType.onExchange]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onExchange,
            callback,
            dispatch,
    ),

    [ExchangeActionType.onGetItem]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onGetItem,
            callback,
            dispatch,
    ),
    [ExchangeActionType.onApproveItem]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onApproveItem,
            callback,
            dispatch,
    ),
    [ExchangeActionType.onGetMyShop]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onGetMyShop,
            callback,
            dispatch,
    ),
    [ExchangeActionType.onGetWaitting]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onGetWaitting,
            callback,
            dispatch,
    ),
    
    // Emit
    [ExchangeActionType.emitInsertItem]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitInsertItem,
        pre,
        next,
        dispatch, 
    ),

    [ExchangeActionType.emitGiveLike]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitGiveLike,
        pre,
        next,
        dispatch, 
    ),

    [ExchangeActionType.emitGetItemByPage]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitGetItemByPage,
        pre,
        next,
        dispatch, 
    ),

    [ExchangeActionType.emitExchange]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitExchange,
        pre,
        next,
        dispatch, 
    ),

    [ExchangeActionType.emitGetItem]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitGetItem,
        pre,
        next,
        dispatch, 
    ),

    [ExchangeActionType.emitApproveItem]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitApproveItem,
        pre,
        next,
        dispatch, 
    ),
    [ExchangeActionType.emitGetMyShop]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitGetMyShop,
        pre,
        next,
        dispatch, 
    ),
    [ExchangeActionType.emitGetWaitting]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitGetWaitting,
        pre,
        next,
        dispatch, 
    ),

    default: () => {},
}


export default ExchangeAction;
