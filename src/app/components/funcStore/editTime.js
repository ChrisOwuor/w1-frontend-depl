export const formatUnixTimestamp = (unixTimestamp) => {
  console.log(unixTimestamp)
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDate = `${day}/${month} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedDate;
  };