export const sortByMonth = (dateArr) => {

    const convertedToDate = dateArr.map((timestamp) => {
        return timestamp.toDate();
    })

    let months = convertedToDate.map((date) => {
        return date.getMonth();
    })
    let years = convertedToDate.map((date) => {
        return date.getFullYear();
    })
    months = new Set(months);
    months = [...months];
    years = new Set(years);
    years = [...years];

    console.log(months, years);
    
    const byYear = years.map((year) => {
        const matchedClasses = convertedToDate.filter((date) => {
            return date.getFullYear() === year
        })
        return matchedClasses
    })

    const byMonth = byYear.map((arrByYear) => {
        const sortByMonth = months.map((month) => {
            const matchedClasses = arrByYear.filter((date) => {
                return date.getMonth() === month
            })
            return matchedClasses 
        })

        return sortByMonth
    })

    return byMonth

    // result : [
    //     // this layer is by year, each year represented as an array
    //     [
    //         // this layer is by month, each month represented as an array
    //         [
    //             // the date objects
    //             {},
    //             {}
    //         ]
    //     ]
    // ]
}


export const dateOutput = (date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const startAtHour = date.getHours();
    const startAtMin = date.getMinutes();

    return {
        yyyy,
        mm,
        dd,
        startAtHour,
        startAtMin
    }
}