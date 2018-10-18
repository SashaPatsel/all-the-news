import React from "react";


const AuthBtn = (props) => (
  <div class="auth-btn--anim-trig">
    <a className="auth-btn" onClick={props.onClick}> {props.children} </a> 
 </div>
);

export default AuthBtn;
