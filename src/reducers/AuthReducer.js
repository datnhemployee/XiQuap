import AuthActionType from "../actions/Auth/AuthActionType";

const initialState = {
}

const usecases = {
    [AuthActionType.emitLogIn]: (
        state,
        actionResult) => {

        if(actionResult.error) {
            return {
                error: actionResult.payload,
            }
        } 
        return {
            ...state,
        }
    },
    [AuthActionType.emitLogOut]: (
        state,
        actionResult) => {

        if(actionResult.error) {
            return {
                error: actionResult.payload,
            }
        } 
        return {
            ...state,
        }
    },
    [AuthActionType.emitRegister]: (
        state,
        actionResult) => {

        if(actionResult.error) {
            return {
                error: actionResult.payload,
            }
        } 
        return {
            ...state,
        }
    },
    [AuthActionType.onLogIn]: (
        state,
        actionResult) => {

        if(!actionResult.error) {
            return {
                ...actionResult.payload,
            }
        } 
        return {
            error: actionResult.payload,
        }
    },
    [AuthActionType.onRegister]: (
        state,
        actionResult) => {

        if(!actionResult.error) {
            return {
                ...actionResult.payload,
            }
        } 
        return {
            error: actionResult.payload,
        }
    },
    [AuthActionType.onLogOut]: (
        state,
        actionResult) => {

        if(!actionResult.error) {
            return {
                token: ``,
            }
        } 
        return {
            error: actionResult.payload,
        }
    },
    default: (state) => {
        return {
            ...state,
        }
    },
}

export default function (
    state = initialState,
    actionResult,
) {
    // console.log(`ActionResult nè: ${JSON.stringify(actionResult)}`)
    // console.log(`ActionResult nè: ${JSON.stringify(usecases[actionResult.type])}`)

    const usecase = usecases[actionResult.type];
    if(!!usecase){
        return usecase(
            state,
            actionResult
        );
    }
    return usecases.default(state);
}