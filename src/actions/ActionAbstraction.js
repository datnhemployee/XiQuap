import { Codes } from '../constant/Response';
import MessageBox from '../components/MessageBox';

const defaultActions = () => {}

export default class ActionAbstraction {
    static emitDefinition (
        data,
        type,
        service,
        pre = () => {},
        next = (res) => {},
        dispatch,
        ) {
           
        service.emit(
            type,
            data,
            pre, 
            (res) => {
                if(res.code === Codes.Success) {
                    dispatch({
                        type: type,
                    })
                } else {
                    dispatch({
                        type: type,
                        error: true,
                        payload: res.content,
                    })
                }
                MessageBox(res.content);
                next(res);
            }
        ); 
    }
    
    static emit (
        name,
        actions = []
    ) {
        return {
            inject: (
                data,
                pre = () => {},
                next = (res) => {},
                ) => (
                        dispatch, 
                    ) => {
                        
                        let action = actions[name];
                        if(!action) {
                            return defaultActions();
                        }
                        return action(
                            data,
                            pre,
                            next,
                            dispatch,
                        );
                    }
        };
    }

    static onDefinition (
        type,
        service,
        callback = (res) => {},
        dispatch,
        )  {
            
        service.on(
            type,(res)=>{

                if(res.code === Codes.Success) {
                    dispatch({
                        type: type,
                        payload: res.content,
                    })
                } else {
                    dispatch({
                        type: type,
                        error: true,
                        payload: res.content,
                    })
                    MessageBox(res.content);
                }
                callback(res);
            }); 
    }

    static on (
        name,
        actions = [],
    ) {
        return {
            inject: (
                callback = (res) => {},
                ) => (
                        dispatch, 
                    ) => {

                        let action = actions[name];
                        if(!action) {
                            return defaultActions();
                        }
                        return action(
                            callback,
                            dispatch,
                        );
                    }
        };
    }
}