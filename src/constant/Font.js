
const Font = {
    Linotte: {
        Semibold: `Linotte-SemiBold`,
    },
    Roboto: {
        Regular: 'Roboto',
        Medium: 'Roboto-Medium',
        Light: 'Roboto-Light',
    }
}

const Typeface = {
    overline: {
        fontSize: 10,
        letterSpacing: 1.5,
        fontFamily: Font.Roboto.Regular,
    },
    caption: {
        fontSize: 12,
        letterSpacing: 0.4,
        fontFamily: Font.Roboto.Regular,
    },
    button: {
        fontSize: 14,
        letterSpacing: 1.25,
        fontFamily: Font.Roboto.Medium,
    },
    body: {
        1: {
        fontSize: 16,
        letterSpacing: 0.25,
        fontFamily: Font.Roboto.Regular,
        },
        2: {
            fontSize: 14,
            letterSpacing: 0.5,
            fontFamily: Font.Roboto.Regular,
        },
    },
    subtitle: {
        1: {
        fontSize: 16,
        letterSpacing: 0.15,
        fontFamily: Font.Roboto.Regular,
        },
        2: {
            fontSize: 14,
            letterSpacing: 0.1,
            fontFamily: Font.Roboto.Medium,
        },
    },
    header: {
        1: {
        fontSize: 96,
        letterSpacing: -1.5,
        fontFamily: Font.Roboto.Light,
        },
        2: {
            fontSize: 60,
            letterSpacing: -0.5,
            fontFamily: Font.Roboto.Light,
        },
        3: {
            fontSize: 48,
            letterSpacing: 0,
            fontFamily: Font.Roboto.Regular,
            },
        4: {
            fontSize: 34,
            letterSpacing: 0.25,
            fontFamily: Font.Roboto.Regular,
        },
        5: {
            fontSize: 24,
            letterSpacing: 0,
            fontFamily: Font.Roboto.Regular,
            },
        6: {
            fontSize: 20,
            letterSpacing: 0.15,
            fontFamily: Font.Roboto.Medium,
        },
    },
    type: {
        overline: 1,
        button: 2,
        default: 3,
    },
    
}
const toUpperCase = ({text=''}={}) => text.toUpperCase();

Typeface.toCase = (
    text='',
    type= Typeface.type.default,
) => {
    let result = text.slice();
    let transform = {
        [Typeface.type.overline]: toUpperCase,
        [Typeface.type.button]: toUpperCase,
    }
    // console.log(text,type);
    // console.log(text,transform[type]);
    if(!transform[type])
        return text.slice();
    return transform[type]({text: result});
}

export default Typeface;
export {
    Font,
}