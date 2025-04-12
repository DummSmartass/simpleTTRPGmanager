import React, { useState, useEffect } from 'react';

function InputNumber({ labelFor, hideLabel = false, small = false }) {
    const [value, setValue] = useState(localStorage.getItem(labelFor) || '');

    useEffect(() => {
        localStorage.setItem(labelFor, value);
    }, [labelFor, value]);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        // Allow negative numbers and zero as valid input
        if (/^-?\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    return (
        <div className={`input-number ${small ? 'small' : ''}`}>
            {!hideLabel && <label htmlFor={labelFor}>{labelFor}:</label>}
            <input
                type="text"
                id={labelFor}
                name={labelFor}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputNumber;
