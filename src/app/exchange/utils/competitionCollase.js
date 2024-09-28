export const hasDatePassed = (targetTime) => {
    const targetDate = new Date(targetTime);
    const currentDate = new Date();
    return targetDate <= currentDate;
}

export const formatGMTDateTime1 = (gmtDateTime) => {
    const dateObject = new Date(gmtDateTime);
    
    
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
    const year = String(dateObject.getFullYear()).slice(-0); 
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    
    
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}`;
    
    return {
        date: formattedDate,
        time: formattedTime
    };
}


export const formatGMTDateTime = (gmtDateTime) => {
    const dateObject = new Date(gmtDateTime);
    const currentDate = new Date();
    const timeDifference = dateObject - currentDate;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    // Get the day initials
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayInitials = days[dateObject.getDay()];

    // Determine if the date is today, tomorrow, or another day
    let formattedDate;
    if (dateObject.toDateString() === currentDate.toDateString()) {
        formattedDate = 'Today';
    } else {
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);
        if (dateObject.toDateString() === tomorrow.toDateString()) {
            formattedDate = 'Tomorrow';
        } else {
            formattedDate = `${dayInitials}, ${dateObject.getDate()}`;
        }
    }

    // Format the time
    let formattedTime;
    let less = false;
    if (hoursDifference < 2) {
        less = true;
        if (hoursDifference === 1) {
            formattedTime = `Starts in 1hr`;
        } else if (minutesDifference > 1) {
            formattedTime = `Starts in ${minutesDifference} mins`;
        } else {
            formattedTime = `Starting soon`;
        }
    } else {
        formattedTime = dateObject.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

    return {
        time: formattedTime,
        date: formattedDate,
        less
    };
};



export const datePassed = (targetDateStr) => {
    const targetDate = new Date(targetDateStr);


    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const currentDay = currentDate.getUTCDate();

    const targetYear = targetDate.getUTCFullYear();
    const targetMonth = targetDate.getUTCMonth() + 1;
    const targetDay = targetDate.getUTCDate();

    if (targetYear === currentYear && targetMonth >= currentMonth && targetDay >= currentDay) {
        return true;
    } else {
        return false;
    }

}

export const formatTime = (timeString) => {
    // Parse the time string
    const dateObj = new Date(timeString);


    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();

    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second
    };
}


export const formatHumanDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
        // weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // timeZoneName: 'short'
    };
    return date.toLocaleDateString(undefined, options);
}

