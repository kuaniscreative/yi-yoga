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
            
        </div>
    );
};

export default Testing;
