
// @flow
export function formatDate(date: string) {
    var newdate = new Date(date);
    var day = newdate.getDate();
    var month = newdate.getMonth() + 1;
    var year = newdate.getFullYear();
    return day + "." + month + "." + year;
}

export const allYears = [
    { key: 2017, text: "2017", value: 2017 },
    { key: 2016, text: "2016", value: 2016 },
    { key: 2015, text: "2015", value: 2015 }]


export const allMonth = [
    { key: 0, text: "Januar", value: 0 },
    { key: 1, text: "Februr", value: 1 },
    { key: 2, text: "März", value: 2 },
    { key: 3, text: "April", value: 3 },
    { key: 4, text: "Mai", value: 4 },
    { key: 5, text: "Juni", value: 5 },
    { key: 6, text: "Juli", value: 6 },
    { key: 7, text: "August", value: 7 },
    { key: 8, text: "September", value: 8 },
    { key: 9, text: "Oktober", value: 9 },
    { key: 10, text: "November", value: 10 },
    { key: 11, text: "Dezember", value: 11 }]


