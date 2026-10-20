export const getStringedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if(month < 10) {
        return `0${month}`
    }
    if(date < 10) {
        return `0${date}`
    }

    return `${year}-${month}-${date}`
}