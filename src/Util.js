// String formatters for React templates
export default {
    // Joins a list, adding a conjunction between the last two elements
    listFormat(array) {
        if(array.length === 0) {
            return '';
        } else {
            return array.slice(1).reduce((str, item, index, {length}) => (
                str +
                (index === length ? ' and ' : ', ') +
                item
            ), array[0])
        }
    },

    // Adds an apostrophe to make a name possessive
    possessiveFormOf(name) {
        return name + '\u0027' + (name.slice(-1) === 's' ? '' : 's');
    }
}