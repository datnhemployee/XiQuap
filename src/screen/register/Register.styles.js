import Typeface, { Font } from "../../constant/Font";
import Color from "../../constant/Color";
import {
    Dimensions,
} from 'react-native';

const {
    height,
} = Dimensions.get('screen');
const _height = height * 15 /10;
const {
    DarkRed,
    Red,
    LightRed,
    White
} = Color;
export default styles = {
    container: {
        borderWidth: 5,
        backgroundColor: White,
        height: _height,
        flex: 1,
        padding: 20
    },
    header: {
        height: _height * 4 / 15,
    },
    body: {
        height: _height * 7 / 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        // borderWidth: 1,
    },
    footer: {
        height: _height * 2 / 15,
        justifyContent: 'flex-end',
        alignItem: 'center',
        // borderWidth: 1,
    },
    imagePicker: {
        button: {
            flex: 1,
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
        username: {
            ...Typeface.header[5],
        },
        underlineUsername: DarkRed,
        password: {
            ...Typeface.header[5],
        },
        name: {
            ...Typeface.header[5],
        },
        email: {
            ...Typeface.header[5],
        },
        phone: {
            ...Typeface.header[5],
        },
        intro: {
            ...Typeface.header[5],
        },
    },
    notify: {
        username: {
            ...Typeface.subtitle[1],
            fontStyle: 'italic',
            textAlign: 'left',
        },
        password: {
            ...Typeface.subtitle[1],
            fontStyle: 'italic',
            textAlign: 'left',
        },
        address: {
            ...Typeface.subtitle[1],
            fontStyle: 'italic',
            textAlign: 'left',
        },
        intro: {
            ...Typeface.subtitle[1],
            fontStyle: 'italic',
            textAlign: 'left',
        },
        phone: {
            ...Typeface.subtitle[1],
            fontStyle: 'italic',
            textAlign: 'left',
        },
        email: {
            ...Typeface.subtitle[1],
            fontStyle: 'italic',
            textAlign: 'left',
        },
        name: {
            ...Typeface.subtitle[1],
            fontStyle: 'italic',
            textAlign: 'left',
        },
    },
    button: {
        registerText: {
            flex: 1,
            ...Typeface.button,
            color: Color.White,
            textAlignVertical: 'center',
            textAlign: 'center',
        },
        register: {
            flex: 1,
            // height: 50,
            // width: _width,
            marginTop: 10,
            backgroundColor: Color.DarkRed,
            elevation: 2,
            borderRadius: 50,
            // marginTop: 30,
            // marginBottom: 10,
        },
        backText: {
            flex: 1,
            ...Typeface.button,
            color: Color.DarkRed,
            textAlignVertical: 'center',
            textAlign: 'center',
        },
        back: {
            flex: 1,
            // height: 50,
            // width: _width,
            backgroundColor: Color.White,
            // elevation: 2,
            // borderRadius: 50,
            marginTop: 10,
            // marginBottom: 10,
        },
    }
}