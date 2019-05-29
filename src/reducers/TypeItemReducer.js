import TypeItemActionType from "../actions/Type/TypeItemActionType";

const initialState = {
    list: [],
}

const usecases = {
    [TypeItemActionType.emitGetAll]: (
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
    

    [TypeItemActionType.onGetAll]: (
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