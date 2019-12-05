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
        <div className="dateSingle">
            <div className="dateSingle_date">{`${yyyy}年${mm +
                1}月${dd}日`}</div>
            <div className="dateSingle_other">
                <span>{dayOutput}</span>
                <span>{startAt}</span>
            </div>
        </div>
    );
};

export default DateSingle;
