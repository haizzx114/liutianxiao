import React, { Component } from 'react';
import tongzhuang from '../../img/tongzhuang1.jpg'
import "./index.css"
import axios from "axios"
import {Link} from "react-router-dom"

class TongZhuang extends Component {
  constructor(props){
    super(props)

      this.state = {
          src:[]
      }
    }

  componentDidMount(){
      
    axios.get('http://localhost:3000/tongzhuang.json').then((response)=>{
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
      (item)=>(<li className={item.class} key={item.src}>
          <Link to={`/list`}>
              <img src={item.src} alt=''/>
              <h4>
                {item.name}
              </h4>
          </Link>
      </li>)
    )


    return (
      <div className = "tongzhuang">
          <div className = "title">
              <h3>童装</h3>
              <div className = "h4">
                Dior迪奥童装与婴儿服装凝聚品牌无限创意及精湛工艺。
              </div>
          </div>
          <img src = {tongzhuang} alt = ""/>
          <div className = 'body'>
            <h3>
            2019春夏季系列
            </h3>
            <span>
              “无论您做什么，请带着热诚去做！带着热情去生活……”Christian Dior说。
            </span>
          </div>
          <ul>
            {listDom}
          </ul>
      </div>
    );
  }
}

export default TongZhuang;
