import Color from "../../constant/Color";
import Typeface from "../../constant/Font";

export default {
    button: {
        buy: {
            flex: 1,
            borderRadius: 100,
            elevation: 1,
            backgroundColor: Color.Red,
            justifyContent: 'center',
            alignItem: `center`,
        },
        buyText: {
            color: Color.White,
            ...Typeface.button,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        approveText: {
            ...Typeface.button,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        approve: {
            flex: 1,
            justifyContent: 'center',
            alignItem: 'center',
        }
    },
    label: {
        name: {
            flex: 1,
            ...Typeface.header[5],
        },
        description: {
            flex: 3,
            ...Typeface.body[1],
            textAlign: 'left',
            textAlignVertical: 'top',
            flexWrap: 'wrap',
        },
        type: {
            flex: 1,
            ...Typeface.overline,
        },
        point: {
            flex: 0.5,
            ...Typeface.subtitle[1],
            textAlign: 'left',
            textAlignVertical: 'top',
        },
        onwerName: {
            flex: 1,
            ...Typeface.header[6],
        },
        onwerTotalStar: {
            flex: 1,
            ...Typeface.subtitle[1],
        },
        approve: {
            flex: 0.5,
            ...Typeface.overline,
            textAlign: 'left',
            textAlignVertical: 'bottom',
        },
    }
}