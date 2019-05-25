import StockActionType from './StockActionType';
import StockService from '../../services/StockService';

import ActionAbstraction from '../ActionAbstraction';


class StockAction {
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
            StockService,
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
            StockService,
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
    [StockActionType.onGet]: (
        callback = (res) => {},
        dispatch,
    ) => StockAction.onDefinition(
            StockActionType.onGet,
            callback,
            dispatch,
    ),
    
    [StockActionType.onInsert]: (
        callback = (res) => {},
        dispatch,
    ) => StockAction.onDefinition(
            StockActionType.onInsert,
            callback,
            dispatch,
    ),

    [StockActionType.onBuy]: (
        callback = (res) => {},
        dispatch,
    ) => StockAction.onDefinition(
            StockActionType.onBuy,
            callback,
            dispatch,
    ),

    [StockActionType.onGetOne]: (
        callback = (res) => {},
        dispatch,
    ) => StockAction.onDefinition(
            StockActionType.onGetOne,
            callback,
            dispatch,
    ),

    [StockActionType.onApprove]: (
        callback = (res) => {},
        dispatch,
    ) => StockAction.onDefinition(
            StockActionType.onApprove,
            callback,
            dispatch,
    ),

    // Emit
    [StockActionType.emitGet]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => StockAction.emitDefinition(
        data,
        StockActionType.emitGet,
        pre,
        next,
        dispatch, 
    ),

    [StockActionType.emitInsert]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => StockAction.emitDefinition(
        data,
        StockActionType.emitInsert,
        pre,
        next,
        dispatch, 
    ),

    [StockActionType.emitBuy]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => StockAction.emitDefinition(
        data,
        StockActionType.emitBuy,
        pre,
        next,
        dispatch, 
    ),

    [StockActionType.emitGetOne]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => StockAction.emitDefinition(
        data,
        StockActionType.emitGetOne,
        pre,
        next,
        dispatch, 
    ),

    [StockActionType.emitApprove]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => StockAction.emitDefinition(
        data,
        StockActionType.emitApprove,
        pre,
        next,
        dispatch, 
    ),

    default: () => {},
}


export default StockAction;
