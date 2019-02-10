import React, { Component } from 'react';
import 'antd/dist/antd.css'
import Banner from "../../pages/Banner"
import Nvshi from "../../pages/nvshi"
import Nanshi from "../../pages/nanshi"
import Tongzhuang from "../../pages/tongzhuang"
import footimg from "../../img/foot.png"
import "./index.css"


class Home extends Component {
  render() {
    return (
      <div className = "home">
        <Banner/>
        <Nvshi/>
        <Nanshi/>
        <Tongzhuang/>
        <img src = {footimg} alt = "" className = "footimg"/>
      </div>
    );
  }
}

export default Home;
