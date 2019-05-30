
import ActionAbstraction from '../ActionAbstraction';
import TypeItemService from '../../services/TypeService';
import TypeItemActionType from './TypeItemActionType';


class TypeItemAction {
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
            TypeItemService,
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
            TypeItemService,
            callback,
            dispatch,
        );
    }

    static emit (name) {
        return ActionAbstraction.emit(name,actions);
    }

    static on (name) {
        // console.log(`resAct: ${actions[name]}`);

        return ActionAbstraction.on(name,actions);
    }
}

const actions = {
    // On
    [TypeItemActionType.onGetAll]: (
        callback = (res) => {},
        dispatch,
    ) => TypeItemAction.onDefinition(
            TypeItemActionType.onGetAll,
            callback,
            dispatch,
    ),

    // Emit
    [TypeItemActionType.emitGetAll]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => TypeItemAction.emitDefinition(
        data,
        TypeItemActionType.emitGetAll,
        pre,
        next,
        dispatch, 
    ),
    default: () => {},
}


export default TypeItemAction;
