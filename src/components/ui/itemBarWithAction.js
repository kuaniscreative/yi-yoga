import React from "react";

const ItemBarWithAction = ({ message, action, parentClass, messageClass, actionClass }) => {
    return (
        <div className={parentClass ? `itemBarWithAction ${parentClass}` : 'itemBarWithAction'}>
            <div className={messageClass ? `itemBarWithAction_message ${messageClass}` : 'itemBarWithAction_message'}>{message}</div>
            <div className={actionClass ? `itemBarWithAction_action ${actionClass}` : "itemBarWithAction_action"}>{action}</div>
        </div>
    );
};

export default ItemBarWithAction;
