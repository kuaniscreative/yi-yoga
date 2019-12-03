import React from 'react';

const StepIndicator = ({indicator, className}) => {
    return (
        <div className={className ? `stepIndicator ${className}` : 'stepIndicator'}>
            <p>{indicator}</p>
        </div>
    )
}

export default StepIndicator