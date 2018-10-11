import React from "react";

const Source = props => (
  <div className="source" onClick={props.onClick}>
    {props.source}
  </div>  
)

export default Source