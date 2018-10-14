import React from "react"

const Story = props => (
 
    <div className="story">
      <h2 className="story__headline">{props.headline}</h2>
      <img className="story__img" src={props.img}/>
      <p className="story__description">{props.description}</p>
    </div> 

)

export default Story