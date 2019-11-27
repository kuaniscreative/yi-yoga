import React, { Component } from "react";

// components
import DateSingle from "../ui/dateSingle";
import ItemBarWithAction from "../ui/itemBarWithAction";

class ClassSingle extends Component {
    state = {};

    render() {
        const singleClass = this.props.class;
        const deleteClass = this.props.deleteClassWhenPreview;

        return (
            <ItemBarWithAction
                message={<DateSingle date={singleClass} />}
                action={
                    <button
                        className='cancelRed'
                        onClick={() => {
                            deleteClass(singleClass.id);
                        }}
                    >
                        移除
                    </button>
                }
            />
        );
    }
}

export default ClassSingle;
