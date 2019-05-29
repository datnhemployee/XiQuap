import Typeface from "../constant/Font";
import Color from "../constant/Color";

export default {
    container: {
        flex: 1,
    },
    navigation: {
        bar: {
            flex: 1,
            flexDirection: `row`,
            backgroundColor: Color.LighGray,
        },
        icon: {
            flex: 1,
            ...Typeface.body[1],
            textAlignVertical: 'center',
            textAlign: 'center',
        },
        button: {
            flex: 1,
            justifyContent: 'center',
            alignItem: 'center',
        }
    },
}