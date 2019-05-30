import Typeface from '../../constant/Font';

export default {
    label: {
        name: {
            ...Typeface.header[5],
            flex: 1,
        },
        followers: {
            ...Typeface.caption,
            flex: 1,
            textAlign: 'left',
            textAlignVertical: 'top',
        },
        star: {
            flex: 1,
            ...Typeface.overline,
            textAlign: 'left',
            textAlignVertical: 'bottom',
        },
        email: {
            flex: 1,
            ...Typeface.body[1],
        },
        phone: {
            flex: 1,
            ...Typeface.body[1],
        },
        address: {
            flex: 1,
            ...Typeface.body[1],
        },
    },
    button: {
        favoriteText: {
            ...Typeface.button,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        favorite: {
            flex: 1,
            margin: 5,
            borderRadius: 10,
        },
        account: {
            flex: 1,
            margin: 5,
            borderRadius: 10,
        },
        accountText: {
            ...Typeface.button,
            textAlign: 'center',
            textAlignVertical: 'center',
        }
    }
}