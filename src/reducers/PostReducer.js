import ExchangeActionType from "../actions/Exchange/ExchangeActionType";

const initialState = {
}

const usecases = {
    [ExchangeActionType.emitInsertPost]: (
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
    [ExchangeActionType.emitGetPost]: (
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
    [ExchangeActionType.onInsertPost]: (
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
    [ExchangeActionType.onGetPost]: (
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
    console.log(`ActionResult nè: ${JSON.stringify(actionResult)}`)
    console.log(`ActionResult nè: ${JSON.stringify(usecases[actionResult.type])}`)

    const usecase = usecases[actionResult.type];
    if(!!usecase){
        return usecase(
            state,
            actionResult
        );
    }
    return usecases.default(state);
}