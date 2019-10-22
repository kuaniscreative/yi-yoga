import React, { Component } from "react";

// components
import ClassSingle from "./reschedule_preview_classSingle";

class ListByDay extends Component {

    titleOutPut = () => {
        const day = this.props.classes[0].classDate.getDay();
        if (day === 0) {
            return "星期日";
        } else {
            const numToCh = day.toLocaleString("zh-Hans-CN-u-nu-hanidec");
            return `星期${numToCh}`;
        }
    };

    render() {
        return (
            <div>
                <h2>{this.titleOutPut()}</h2>
                {
                    this.props.classes.map((classInfo, i) => {
                        return (
                            <ClassSingle key={i} classInfo={classInfo} />
                        )
                    })
                }
            </div>
        );
    }
}

export default ListByDay;
