import Color from "../../constant/Color";
import Typeface from "../../constant/Font";

export default {
    button: {
        back: {
            height: 50,
            backgroundColor: Color.LighGray,
            flexDirection: `row`,
        },
        backText: {
            ...Typeface.header[5],
            marginLeft: 10,
            textAlign: 'left',
            textAlignVertical: 'center',
            flex: 5,
        },
    },
    label: {
        totalStar: {
            flex: 1,
            marginLeft: 10,
            ...Typeface.subtitle[1],
            // color: Color.Red,
            textAlign: 'right',
            textAlignVertical: `center`,
        },
        approveText: {
            flex: 1,
            marginLeft: 10,
            ...Typeface.header[6],
            // color: Color.Red,
            textAlign: 'right',
            textAlignVertical: `center`,
        },
        waittingText: {
            flex: 1,
            ...Typeface.body[1],
            backgroundColor: Color.LighGray,
            textAlign: 'right',
            textAlignVertical: `center`,
            marginRight: 10,
        },
    }
}