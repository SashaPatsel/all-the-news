import React from "react"

const Story = props => (
 
    <div className="story">
      <a className="story__link" href={props.link} target="_blank">
        <h2 className="story__headline">{props.headline}</h2>
      </a>
      <a className="story__link" href={props.link} target="_blank">
        <img className="story__img" src={props.img}/>
      </a>
      <p className="story__description">{props.description}</p>
    </div> 

)

export default Story