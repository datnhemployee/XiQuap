import ExchangeActionType from "../actions/Exchange/ExchangeActionType";

const initialState = {
    list: [],
}

const usecases = {
    [ExchangeActionType.emitInsertItem]: (
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
    [ExchangeActionType.emitGetItemByPage]: (
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

    [ExchangeActionType.emitGiveLike]: (
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

    [ExchangeActionType.emitExchange]: (
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

    [ExchangeActionType.emitGetItem]: (
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

    // on

    [ExchangeActionType.onGetItemByPage]: (
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
    [ExchangeActionType.onInsertItem]: (
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
    [ExchangeActionType.onGiveLike]: (
        state,
        actionResult) => {

        if(!actionResult.error) {
            // return {
            //     list: state.list.map((val,index)=>{
            //         console.log(`state.list.${index} = ${JSON.stringify(state.list[index])}`)
            //         if(val._id === actionResult.payload._id){
            //             return {
            //                 ...val,
            //                 ...actionResult.payload,
            //             }
            //         }
            //         return val;
            //     }),
            // }
            return {
                ...actionResult.payload,
            }
        } 
        return {
            error: actionResult.payload,
        }
    },
    [ExchangeActionType.onExchange]: (
        state,
        actionResult) => {

        if(!actionResult.error) {
            // return {
            //     list: state.list.map((val,index)=>{
            //         console.log(`state.list.${index} = ${JSON.stringify(state.list[index])}`)
            //         if(val._id === actionResult.payload._id){
            //             return {
            //                 ...val,
            //                 ...actionResult.payload,
            //             }
            //         }
            //         return val;
            //     }),
            // }
            return {
                ...actionResult.payload,
            }
        } 
        return {
            error: actionResult.payload,
        }
    },
    [ExchangeActionType.onGetItem]: (
        state,
        actionResult) => {

        if(!actionResult.error) {
            // return {
            //     list: state.list.map((val,index)=>{
            //         console.log(`state.list.${index} = ${JSON.stringify(state.list[index])}`)
            //         if(val._id === actionResult.payload._id){
            //             return {
            //                 ...val,
            //                 ...actionResult.payload,
            //             }
            //         }
            //         return val;
            //     }),
            // }
            console.log(`onGetPost_vendeeName actionResult: ${JSON.stringify({
                ...actionResult.payload,
            })}`)

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