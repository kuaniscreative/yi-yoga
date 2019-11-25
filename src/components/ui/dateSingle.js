import React from "react";

const DateSingle = ({ date }) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();
    const hr = date.getHours();
    const min = date.getMinutes();
    const startAt = `${hr}:${min}`;
    const day = date.getDay();
    const dayOutput = `週${day.toLocaleString("zh-u-nu-hanidec")}`;
    return (
        <div className="dateHero checkboxContainer_message">
            <div className="dateHero">
                <span name="date">{`${dd}`}</span>
                <span name="monthYear">{`${mm + 1}月 ${yyyy}`}</span>
                <span name="seperator"> | </span>
                <span name="dayTime">{`${dayOutput} ${startAt}`}</span>
            </div>
        </div>
    );
};

export default DateSingle;
