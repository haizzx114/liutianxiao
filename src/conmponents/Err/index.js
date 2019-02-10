import React, { Component } from 'react';
import 'antd/dist/antd.css'
import logo from "../../img/err.jpg"
import {Link} from "react-router-dom"
import "./index.css"

class Err extends Component {
  render() {
    return (
      <div className = "err">
          <Link to={`/home`}>
              <img src={logo} alt="" className = "logo"/>
            </Link>
      </div>
    );
  }
}

export default Err;
