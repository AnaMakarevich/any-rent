

export const parseDate = (date) => {
    let dateObj = new Date(date);

    // return dateObj.toLocaleDateString();    
    return `${padDate(dateObj.getDate()) }.${padDate(dateObj.getMonth()+1) }.${dateObj.getFullYear()}`

}

// Only userId stored

export const saveUserIdLocalStorage = (state) => {
    let str = JSON.stringify(state);
    localStorage.setItem("userId", str);
}


// Execute in main route since it gets mounted onevery url route
export const readUserIdLocalStorage = () => {
    try {
        const strState = localStorage.getItem("userId");
        if(strState){
            return JSON.parse(strState);
        } else {
            return null;
        };
    } catch (e){
        console.log(e);
        return null;
    }
}

export const capitalizeString = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function padDate(str) {
    let step = "00" + str;

    return step.slice(-2);
};