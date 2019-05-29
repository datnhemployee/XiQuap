import Typeface from "../../constant/Font";

export default {
    label: {
        name: {
            flex: 1,
            ...Typeface.header[5],
            textAlign: `left`,
            textAlignVertical: `center`,
        },
        description: {
            flex: 2,
            ...Typeface.body[1],
            textAlign: `left`,
            textAlignVertical: `center`,
        },
        vendeeName: {
            flex: 1,
            ...Typeface.overline,
            textAlign: `left`,
            textAlignVertical: `center`,
        },
    },
}