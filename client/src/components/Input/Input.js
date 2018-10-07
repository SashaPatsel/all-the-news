import React from "react";
import "./style.css";

const Input = props => (
			<input id={props.elementID} className="input" type={props.inputType} placeholder={props.placeholder} name={props.name} onChange={props.onChange} required={props.required} minLength={props.size} size={props.size}/>
		);


export default Input;



