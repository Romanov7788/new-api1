import React from 'react';
import './App.css'

const Input = (props) => {
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}/>
    );
};

export default Input;