const Default = {
    DarkGreen: '#1faa00',
    LightGreen: 'rgb(123, 237, 159)',
    DarkRed: '#c50e29',
    Red: '#ff5252',
    LightRed: '#ff867f',
    Blue: 'rgb(30, 144, 255)',
    Black: 'black',
    White: 'white',
    Gray: '#757575',
    LighGray: `#fafafa`,
    palmRed: `#ffebee`,
}

const Navigation = {
    tap: Default.Black,
    untapped: Default.Gray,
}

export default {
    ...Default,
    Navigation,
}
