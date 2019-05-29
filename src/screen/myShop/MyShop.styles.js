import Typeface from "../../constant/Font";
import Color from "../../constant/Color";

export default {
    label: {
        screen: {
            ...Typeface.header[5],
            flex: 5,
            textAlign: 'left',
            textAlignVertical: `center`,
        }
    },
    button: {
        back: {
            flex: 1,
        }
    },
    header: {
        flex: 1,
        flexDirection: `row`,
        backgroundColor: Color.LighGray,
    },
    body: {
        flex: 1,
    },
    footer: {
        flex: 1,
    },
}