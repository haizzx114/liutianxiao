import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Icon} from "antd" 
import logo from "../../img/QQ截图20190128153033.png"
import "./index.css"
import {Link} from "react-router-dom"
class Nav extends Component {
  render() {
    return (
      <div className = "nav">
            <div className = "left">
                <span className = "mulu">
                    <Icon type="align-right" className = "icon" />
                    目录
                </span>
                <Icon type="search" style={{ fontSize: '20px', color: '#000' }}/>
            </div>
            <Link to={`/home`}>
              <img src={logo} alt="" className = "logo"/>
            </Link>
            <div className = "right">
                <Icon type="environment"  style={{ fontSize: '20px', color: '#000' }}/>
                <Link to={`/login`}> 
                  <Icon type="user" style={{ fontSize: '20px', color: '#000' }}/>
                </Link>
                <Link to={`/shoppingcar`}> 
                  <Icon type="shopping-cart" style={{ fontSize: '20px', color: '#000' }}/>
                </Link>
            </div>
      </div>
    );
  }
}

export default Nav;