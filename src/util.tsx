type Contact = {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    description: string;
}

export function generateProfileIcon(firstName: string, lastName: string) {
    const firstInitial = firstName.charAt(0);
    const secondInitial = lastName.charAt(0);
    return [firstInitial, secondInitial]
}

export function sortArrayByFirstLetter(arr: Contact[], order: string) {
    const sortedArray = arr.slice().sort((a, b) => {
        const nameA = a.first_name.toLowerCase();
        const nameB = b.first_name.toLowerCase();

        if (order === 'asc') {
            return nameA.localeCompare(nameB);
        } else if (order === 'desc') {
            return nameB.localeCompare(nameA);
        } else {
            return 0;
        }
    });

    return sortedArray;
}