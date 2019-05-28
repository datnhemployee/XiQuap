import { openFromLibrary } from "../helpers/SendPhoto";

const openLibrary = (
    success = (res) => {},
    failed = (err) => {}
) => (
    dispatch
    ) => {
    openFromLibrary(
        (res) => {
            dispatch({
                type: 'took-a-photo',
                payload: res.url,
            });
            success(res.url);
        },
        (err) => {
            dispatch({
                type: 'took-a-photo',
                error: true,
                payload: ` Lỗi truyền ảnh vì ${err}`,
            });
            failed(` Lỗi truyền ảnh vì ${err}`)
        }
    )
}
export {
    openLibrary
}
