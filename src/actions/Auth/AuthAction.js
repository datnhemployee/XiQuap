import AuthActionType from './AuthActionType';
import AuthService from '../../services/AuthService';

import ActionAbstraction from '../ActionAbstraction';


class AuthAction {
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
            AuthService,
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
            AuthService,
            callback,
            dispatch,
        );
    }

    static emit (name) {
        return ActionAbstraction.emit(name,actions);
    }

    static on (name) {
        console.log(`resAct: ${actions[name]}`);

        return ActionAbstraction.on(name,actions);
    }
}

const actions = {
    // On
    [AuthActionType.onTokenLogIn]: (
        callback = (res) => {},
        dispatch,
    ) => AuthAction.onDefinition(
            AuthActionType.onTokenLogIn,
            callback,
            dispatch,
    ),
    [AuthActionType.onLogIn]: (
        callback = (res) => {},
        dispatch,
    ) => AuthAction.onDefinition(
            AuthActionType.onLogIn,
            callback,
            dispatch,
    ),
    [AuthActionType.onLogOut]: (
        callback = (res) => {},
        dispatch,
    ) => AuthAction.onDefinition(
        AuthActionType.onLogOut,
        callback,
        dispatch,
    ),
    [AuthActionType.onRegister]: (
        callback = (res) => {},
        dispatch,
    ) => AuthAction.onDefinition(
        AuthActionType.onRegister,
        callback,
        dispatch,
    ),
    // Emit
    [AuthActionType.emitTokenLogIn]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => AuthAction.emitDefinition(
        data,
        AuthActionType.emitTokenLogIn,
        pre,
        next,
        dispatch, 
    ),
    [AuthActionType.emitLogIn]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => AuthAction.emitDefinition(
        data,
        AuthActionType.emitLogIn,
        pre,
        next,
        dispatch, 
    ),
    [AuthActionType.emitLogOut]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => AuthAction.emitDefinition(
        data,
        AuthActionType.emitLogOut,
        pre,
        next,
        dispatch,
    ),
    [AuthActionType.emitRegister]: (
        data,
        pre = () => {},
        next = (res) => {},
        dispatch,
    ) => AuthAction.emitDefinition(
        data,
        AuthActionType.emitRegister,
        pre,
        next,
        dispatch
    ),
    default: () => {},
}


export default AuthAction;
