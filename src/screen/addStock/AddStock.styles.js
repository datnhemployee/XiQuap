import Typeface from '../../constant/Font';
import Color from '../../constant/Color';
export default {
    label: {
        screen: {
            flex: 5,
            ...Typeface.header[5],
            textAlign: `left`,
            textAlignVertical: `center`,
        },
    },
    textInput: {
        name: {
            flex: 1,
            ...Typeface.body[1],
        },
        description: {
            ...Typeface.body[1],
            height: 80,
            // flex: 2,
        },
    },
    picker: {
        item: {
            ...Typeface.body[1],
        },
        container: {
            marginTop: 10,
            marginBottom: 10,
            // ...Typeface.body[1],
            color: Color.Gray,
        }
    },
    button: {
        image: {
            text: {
                height: 50,
                ...Typeface.button, 
                textAlign: 'center',
                textAlignVertical: 'center',
            }
        },
        submit: {
            button: {
                marginTop: 10,
                height: 50,
                justifyContent: 'center',
                alignItem: 'center',
                elevation: 5,
                borderRadius: 50,
                backgroundColor: Color.DarkRed,
            },
            text: {
                ...Typeface.button,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: Color.White,
            }
        }
    }
}