const { generateProfileIcon, sortArrayByFirstLetter } = require('./util');

test('Generate Profile Icon', () => {
    expect(generateProfileIcon('M', 'P')).toEqual(['M', 'P']);
    expect(generateProfileIcon('A', 'm')).toEqual(['A', 'M']);
    expect(generateProfileIcon('b', 'a')).toEqual(['B', 'A']);
})

describe('sortArrayByFirstLetter', () => {
    const contacts = [
        { first_name: 'John' },
        { first_name: 'Alice' },
        { first_name: 'Bob' },
    ];

    it('should sort the array in ascending order', () => {
        const sortedArray = sortArrayByFirstLetter(contacts, 'asc');
        expect(sortedArray).toEqual([
            { first_name: 'Alice' },
            { first_name: 'Bob' },
            { first_name: 'John' },
        ]);
    });

    it('should sort the array in descending order', () => {
        const sortedArray = sortArrayByFirstLetter(contacts, 'desc');
        expect(sortedArray).toEqual([
            { first_name: 'John' },
            { first_name: 'Bob' },
            { first_name: 'Alice' },
        ]);
    });

    it('should handle an empty array', () => {
        const emptyArray = [];
        const sortedArray = sortArrayByFirstLetter(emptyArray, 'asc');
        expect(sortedArray).toEqual([]);
    });
});