import React from 'react';

const StepIndicator = ({indicator, className}) => {
    return (
        <div className={`stepIndicator ${className}`}>
            <p>{indicator}</p>
        </div>
    )
}

export default StepIndicator