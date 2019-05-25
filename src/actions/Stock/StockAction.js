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

    default: () => {},
}


export default StockAction;
