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
    [ExchangeActionType.onInsertPost]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onInsertPost,
            callback,
            dispatch,
    ),
    [ExchangeActionType.onGetPost]: (
        callback = (res) => {},
        dispatch,
    ) => ExchangeAction.onDefinition(
            ExchangeActionType.onGetPost,
            callback,
            dispatch,
    ),
    
    // Emit
    [ExchangeActionType.emitInsertPost]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitInsertPost,
        pre,
        next,
        dispatch, 
    ),
    [ExchangeActionType.emitGetPost]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => ExchangeAction.emitDefinition(
        data,
        ExchangeActionType.emitGetPost,
        pre,
        next,
        dispatch, 
    ),
    default: () => {},
}


export default AuthAction;
