import Typeface, { Font } from "../../constant/Font";
import Color from "../../constant/Color";
import {
    Dimensions,
} from 'react-native';

const {
    width,
} = Dimensions.get('screen');
const _width = width * 9 / 10;
const {
    DarkRed,
    Red,
    LightRed,
    White
} = Color;
export default styles = {
    container: {
        flex: 1,
        borderWidth: 5,
        backgroundColor: White,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItem: 'center',
        // borderWidth: 1,
        padding: 30,
    },
    body: {
        flex: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItem: 'center',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // borderColor: DarkRed,
        // borderWidth: 0.1,
        // padding: 10,
    },
    footer: {
    },
    textInput: {
        username: {
            // flex: 1,
            // borderWidth: 1,
            ...Typeface.header[5],
        },
        underlineUsername: DarkRed,
        password: {
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
        }
    },
    img: {
        appName: {
            flex: 1,
            height: `100%`,
            width: `100%`,
        }
    },
    button: {
        logIn: {
            height: 50,
            width: _width,
            backgroundColor: Color.DarkRed,
            elevation: 2,
            borderRadius: 50,
            marginTop: 30,
            marginBottom: 10,
        },
        logInText: {
            flex: 1,
            ...Typeface.button,
            color: Color.White,
            textAlignVertical: 'center',
            textAlign: 'center',
        },
        register: {
            height: 50,
            width: _width,
            backgroundColor: Color.White,
            // elevation: 2,
            borderRadius: 50,
            marginBottom: 10,
        },
        registerText: {
            flex: 1,
            ...Typeface.button,
            color: Color.DarkRed,
            textAlignVertical: 'center',
            textAlign: 'center',
        }
    }
}