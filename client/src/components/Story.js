import React from "react"

const Story = props => (

  <div className="story">
    <div className="story__left">
      <a className="story__link" href={props.link} target="_blank">
        <img className="story__img" src={props.img} />
      </a>
    </div>
    <div className="story__right">
      <a className="story__link" href={props.link} target="_blank">
        <h2 className="story__headline">{props.headline}</h2>
      </a>

      <p className="story__description">{props.description}</p>
    </div>
  </div>

)

export default Story