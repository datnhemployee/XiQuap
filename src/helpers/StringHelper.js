
const noBlankSpace = (
    text = '',
) => {
    const firstIndex = text.indexOf(' ');
    if (firstIndex === -1)
        return true;
    return false;
}
export {
    noBlankSpace,
}