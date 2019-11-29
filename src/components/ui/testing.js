import React from "react";

// comonents 
import StepIndicator from '../stepIndicator';
import ItemBarWithAction from '../ui/itemBarWithAction';

const Testing = () => {
    return (
        <div id="testing">
            <div className="layout_pageTitle">
                <div className='wrapper'>
                    <h1>報名課程</h1>
                    <p>2020年1月 - 2月</p>
                </div>
            </div>
            <div className="layout_contentBlock">
                <StepIndicator indicator='step1. 選取課堂'/>
                <ul className='comfyList'>
                    <li>請由下方日曆選取本期想上的所有課程</li>
                </ul>
            </div>
            <div className="layout_contentBlock">
                <ul className='borderBottomList'>
                    <li>
                        <ItemBarWithAction message='2020年10月20日' action={<button className='cancelIcon'></button>}/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Testing;