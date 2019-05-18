import Navigation from '../constant/Navigation';

const init = {
    screen: Navigation.logIn,
}
export default function (
    state = init,
    actionResult,
) {
    if (actionResult.type === 'navigate')
        return {
            ...state,
            screen: actionResult.payload,
        }
    return {
        ...state,
    }
}