import React from "react"

const Story = props => (
  <div className="col-md-4">
    <div className="story">
      <h2>{props.headline}</h2>
      <img className="story__img" src={props.img}/>
      <p>{props.description}</p>
    </div> 
  </div>  
)

export default Story