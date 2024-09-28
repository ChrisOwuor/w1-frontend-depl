export function parseDateTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds}`;

    // return {
    //     year,
    //     month,
    //     day,
    //     hours,
    //     minutes,
    //     seconds
    // };
}