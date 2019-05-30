import Typeface from "../../constant/Font";
import Color from "../../constant/Color";
import {
    Dimensions,
} from 'react-native';
const {
    height,
} = Dimensions.get('screen');

export default {
    container: {
        borderWidth: 5,
        backgroundColor: Color.White,
        height: height,
        padding: 20
    },
    imagePicker: {
        button: {
            flex: 3,
            borderRadius: 20,
            borderWidth: 1,
            borderStyle: 'dashed',
        },  
        text: {
            flex: 1,
            ...Typeface.body[2],
            color: Color.Gray,
            textAlign: 'center',
            textAlignVertical:`center`,
        }
    },
    textInput: {
        name: {
            ...Typeface.body[1],
            flex: 1,
            marginTop: 10,
        },
        description: {
            ...Typeface.body[1],
            flex: 2,
        },
    },
    label: {
        vendee: {
            height: height * 1/ 15,
            ...Typeface.header[6],
            textAlign: 'left',
            textAlignVertical: 'center',
        },
        screen: {
            ...Typeface.header[5],
            textAlign: 'left',
            textAlignVertical: 'center',
            flex: 5,
        },
    },
    button: {
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
        },
        back: {
            flex: 1,
            flexDirection: 'row',
        }
    },
    header: {
        height: height * 1/ 15,
        flexDirection: `row`,
        // borderWidth: 1,
    },
    body: {
        height: height * 8/ 15,
        // borderWidth: 1,
    },
    footer: {
        height: height * 2/ 15,
        // borderWidth: 1,
    },
}