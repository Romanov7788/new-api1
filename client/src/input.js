import React from 'react';
import './App.css'

const Input = (props) => {
    return (
        <input 
        onChange={(event)=> props.setValue(event.target.value)}
        // onChange={props.onChange}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        />
    );
};

export default Input;