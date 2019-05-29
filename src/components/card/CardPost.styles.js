import Typeface from "../../constant/Font";
import Color from "../../constant/Color";

export default {
    button: {
        info: {
            flex: 1,
            // borderRadius: 20,
            flexDirection: 'row',
            // borderWidth: 1,
            // borderStyle: 'dashed',
        },
        exchange: {
            flex: 1,
            flexDirection: `row`,
            justifyContent: `center`,
            alignItem: 'center',
            borderLeftWidth: 2,
            borderColor: Color.Gray,
        },
        exchangeText: {
            ...Typeface.button,
            flex: 2,
            textAlign: 'left',
            textAlignVertical: 'center',
        },
        like: {
            flex: 1,
            flexDirection: `row`,
            justifyContent: `center`,
            alignItem: 'center',
        },
        likeText: {
            ...Typeface.button,
            flex: 2,
            textAlign: 'left',
            textAlignVertical: 'center',
        }
    },
    label: {
        ownerName: {
            ...Typeface.header[6],
            flex: 5,
            textAlign: 'left',
            textAlignVertical: 'center',
            // borderWidth: 1,
            marginLeft: 10,
        },
        name: {
            ...Typeface.header[5],
            textAlign: 'left',
            textAlignVertical: 'center',
        },
        description: {
            ...Typeface.body[1],
            textAlign: 'left',
            textAlignVertical: 'center',
            // flexWrap: 'wrap',
        },
        likeAndExchange: {
            ...Typeface.caption,
            textAlign: 'right',
            textAlignVertical: 'center',
        },
    },
    body: {
        flex: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    header: {
        flex: 0.5,
    },
    footer: {
        flex: 0.5,
        flexDirection: `row`,
        marginTop: 10,
        marginBottom: 10,
    }
}