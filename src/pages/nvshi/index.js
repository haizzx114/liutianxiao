import React, { Component } from 'react';
import nvshi1 from '../../img/nvshi1.jpg'
import "./index.css"
import axios from "axios"
import {Link} from "react-router-dom"

class Nvshi extends Component {
  constructor(props){
    super(props)

      this.state = {
          src:[]
      }
    }

  componentDidMount(){
      
    axios.get('http://localhost:3000/nvshi.json').then((response)=>{
      let list = response.data.nvshi
      this.setState({
        src : list
      })
      //console.log(list);//请求正确时执行的代码
    }).catch(function (response){
      console.log()
      console.log(response);//发生错误时执行的代码
    });

  }
  render() {
    let listDom = this.state.src.map(
      (item)=>(<li className="swiper-slide" key={item.src}>
          <Link to={`/list`}>
              <img src={item.src} alt=''/>
              <h4>
                {item.name}
              </h4>
          </Link>
      </li>)
    )


    return (
      <div className = "nvshi">
          <div className = "title">
              <h3>女士</h3>
              <div className = "h4">从标志性杰作到最新作品，探索Dior迪奥演绎的妩媚魅力。</div>
          </div>
          <img src = {nvshi1} alt = ""/>
          <div className = 'body'>
            <h3>
            中国农历新年胶囊系列
            </h3>
            <span>
                为庆祝中国农历新年，Dior迪奥设计了一款全新的Toile de Jouy约依印花图案。该图案灵感来源于Christian Dior先生首家精品店内饰采用的高雅法国经典面料，其红色繁花图案正对应了中国文化中的幸福美满与富贵吉祥。

            </span>
          </div>
          <ul>
            {listDom}
          </ul>
      </div>
    );
  }
}

export default Nvshi;
