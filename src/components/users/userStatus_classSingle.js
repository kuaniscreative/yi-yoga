import React from "react";

// components
import ItemBarWithAction from "../ui/itemBarWithAction";
import DateSingle from "../ui/dateSingle";

const ClassSingle = ({ classInfo }) => {
    const labelOutput = () => {
        return classInfo.label === "leave" ? (
            <span className="userStatus_classState" name="leave">
                請假
            </span>
        ) : classInfo.label === "reschedulable" ? (
            <span className="userStatus_classState" name="reschedulable">
                已請假 / 未補課
            </span>
        ) : classInfo.label === "rescheduled" ? (
            <span className="userStatus_classState" name="rescheduled">
                補課
            </span>
        ) : classInfo.label === "reschedulePending" ? (
            <span className="userStatus_classState" name="reschedulePending">
                候補中
            </span>
        ) : null;
    };
    const dateOutput = () => {
        const date = classInfo.date;
        return (
            <div>
                <DateSingle date={date} />
            </div>
        );
    };

    const output = () => {
        return classInfo.label === "leave" ? (
            <ItemBarWithAction
                message={dateOutput()}
                action={labelOutput()}
                messageClass="inactive"
            />
        ) : classInfo.label === "reschedulable" ? (
            <ItemBarWithAction
                message={dateOutput()}
                action={labelOutput()}
                messageClass="inactive"
            />
        ) : (
            <ItemBarWithAction message={dateOutput()} action={labelOutput()} />
        );
    };

    return <div className='userStatus_classSingle'>{output()}</div>;
};

export default ClassSingle;
