import React, {Component} from "react";

class Nav extends Component {


  render() {
    return (
      <div className="nav">
        {this.props.children}
      </div>  
    )
  }
}

export default Nav