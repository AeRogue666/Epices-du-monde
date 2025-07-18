const sortDateAsc = (arr) => {
    return arr.sort((a,b) => {return a.date_published - b.date_published})
};
const sortDateDsc = (arr) => {
    return arr.sort((a,b) => {return b.date_published - a.date_published})
};
const sortTitleAsc = (arr) => {
    return arr.sort((a,b) => {
        let x = a.title.toLowerCase(), y = b.title.toLowerCase();
        return x < y ? 1 : -1
    })
};
const sortTitleDsc = (arr) => {
    return arr.sort((a,b) => {
        let x = a.title.toLowerCase(), y = b.title.toLowerCase();
        return x > y ? -1 : 1
    })
};
const sortNameAsc = (arr) => {
    return arr.sort((a,b) => {
        let x = a.name.toLowerCase(), y = b.name.toLowerCase();
        return x > y ? 1 : -1
    })
};
const sortNameDsc = (arr) => {
    return arr.sort((a,b) => {
        let x = a.name.toLowerCase(), y = b.name.toLowerCase();
        return x > y ? -1 : 1
    })
}

export default { sortDateAsc, sortDateDsc, sortNameAsc, sortNameDsc, sortTitleAsc, sortTitleDsc}