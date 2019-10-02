import React, { Component } from "react";

class ClassSingle extends Component {

    state = {

    }

    render() {
        const singleClass = this.props.class;
        const dd = singleClass.getDate();
        const mm = singleClass.getMonth() + 1;
        const yyyy = singleClass.getFullYear();
        const hr = singleClass.getHours();
        const min = singleClass.getMinutes();
        const endTime = new Date(yyyy, mm, dd, hr, min + 60);
        const eHr = endTime.getHours();
        const eMin = endTime.getMinutes();
        const fullTime = `${yyyy}/${mm}/${dd} ${hr}:${min} - ${eHr}:${eMin}`;
        const deleteClass = this.props.deleteClassWhenPreview;

        return (
            <div>
                { fullTime }
                <button onClick={ () => {deleteClass(singleClass.id)} } >移除</button>
            </div>
        )
    }
}


export default ClassSingle;
