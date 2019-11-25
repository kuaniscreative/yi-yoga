import React from "react";

const ItemBarWithAction = ({ message, action, messageClass, actionClass }) => {
    return (
        <div className="checkboxContainer noReverse">
            <div className="checkboxContainer_message">{message}</div>

            <div className="checkboxContainer_checkbox">{action}</div>
        </div>
    );
};

export default ItemBarWithAction;
