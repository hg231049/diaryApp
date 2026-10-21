export const getStringedDate = (targetDate:Date) => {
    let year = targetDate.getFullYear();
    let month = String(targetDate.getMonth() + 1).padStart(2,"0");
    let date = String(targetDate.getDate()).padStart(2,"0");


    return `${year}-${month}-${date}`
}