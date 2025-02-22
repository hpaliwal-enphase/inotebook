export const getOrderedNotes = (prevNotes, newNote) => {
    const result = [...prevNotes];
    if (newNote) {
        result.push(newNote);
    }
    result.sort((a, b) => {
        const date1 = new Date(a.dateModified);
        const date2 = new Date(b.dateModified);

        if (date1 < date2) {
            return 1;
        }
        else if (date1 > date2) {
            return -1;
        }

        return 0;
    })
    result.sort((a, b) => b.isPinned - a.isPinned);

    return result;
}