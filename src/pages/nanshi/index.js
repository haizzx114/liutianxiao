import React, { Component } from 'react';
import nanshi1 from '../../img/nanshi1.jpg'
import "./index.css"
import axios from "axios"
import {Link} from "react-router-dom"

class Nanshi extends Component {
  constructor(props){
    super(props)

      this.state = {
          src:[]
      }
    }

  componentDidMount(){
      
    axios.get('http://localhost:3000/nanshi.json').then((response)=>{
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
      <div className = "nanshi">
          <div className = "title">
              <h3>男士</h3>
              <div className = "h4">从经典精品到最新作品，探索Dior迪奥的男士世界。</div>
          </div>
          <img src = {nanshi1} alt = ""/>
          <div className = 'body'>
            <h3>
              2019夏季系列
            </h3>
            <span>
              Kim Jones在出任Dior迪奥创意总监之后，选择在设计首个系列的过程中重新演绎时装设计大师Christian Dior先生的经典元素。敬请探索2019夏季系列，12月1日起在指定精品店推出。
            </span>
          </div>
          <ul>
            {listDom}
          </ul>
      </div>
    );
  }
}

export default Nanshi;
