
// @flow
export function formatDate(date: string){
    var newdate = new Date(date);
    var day = newdate.getDate();
    var month = newdate.getMonth();
    var year = newdate.getFullYear();
    return day + "." + month + "." + year;
}