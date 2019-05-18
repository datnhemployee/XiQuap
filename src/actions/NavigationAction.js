
const navigate = (
    navigation,
) => (
    dispatch
    ) => {

        dispatch({
            type: 'navigate',
            payload: navigation,
        });
}
export default {
    navigate,
}
