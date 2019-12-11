import React from "react";
import { getFirebase } from 'react-redux-firebase';

// comonents 
import StepIndicator from '../stepIndicator';
import ItemBarWithAction from '../ui/itemBarWithAction';

const Testing = () => {
    const firebase = getFirebase();
    const testMail = firebase.functions().httpsCallable('testMail');
    
    return (
        <div id="testing">
            <div className="layout_pageTitle">
                <div className='wrapper'>
                    <h1>報名課程</h1>
                    <p>2020年1月 - 2月</p>
                </div>
            </div>
            <div className="layout_contentBlock">
                <button className='outlineButton' onClick={() => {testMail()}}>發送郵件</button>
            </div>
           
        </div>
    );
};

export default Testing;
