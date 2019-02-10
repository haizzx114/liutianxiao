import React, { Component } from 'react';
import "./index.css"
import axios from "axios"

class Detail extends Component {
  constructor(props){
    super(props)

    this.state = {
        src:"https://www.dior.com/beauty/version-5.156982000112/resize-image/ep/870/580/90/0/horizon%252Fcovers%252FY0996027_C099600152_E01_ZHC.jpg",
        jiage : 380,
        name : "迪奥小姐",
        InputValue : "",
        id:1,
        detail:[]
    }
    
  }

  componentDidMount(){
    let src = this.props.location.pathname
    let newsrc = src.split("/")
    let pathname = newsrc[2] *1
    axios.get('http://localhost:3000/detail.json').then((response)=>{
      let detail = ""
      detail = response.data.detail
      this.setState({
        detail
      })
      let  arr = detail.map((item) => item.id).indexOf(pathname);
      arr = this.state.detail[arr]
      
      let jiage = arr.jiage
      let name = arr.name
      let id = arr.id
      let src = arr.src
      console.log(detail ,arr)
      this.setState({
        detail,
        name,
        src,
        jiage,
        id
      })
    }).catch(function (response){
      console.log(response);//发生错误时执行的代码
    });
  }

  goumai(e,id){
    let text = localStorage.getItem("username")
    let  arr = this.state.detail.map((item) => item.id).indexOf(id);
      arr = this.state.detail[arr]
    if(text){
      let carObj = {
        id,
        jiage:arr.jiage,
        name : arr.name,
        detail : arr.detail,
        src:arr.src
      }
      
      let list = []
      
      let shopCars = localStorage.getItem("name_"+text)
      
      //判断该购物车列表之前有没有存过数据
      alert("成功加入购物车")
      if(shopCars == null){
          //如果没有存 则直接添加新值
          list.push(carObj)
      }else{
          //如果之前存过值 则将原来的值取出来 转换成数组 
          shopCars = JSON.parse(shopCars)
          //再加入新的值
          let  MyIndex = shopCars.map((item) => item.id).indexOf(id);
          if(MyIndex === -1){
            shopCars.push(carObj)
          }
          
          //再把加了新值的数组重新丢回到本地存储内
          list = shopCars
      }
      localStorage.setItem("name_"+text,JSON.stringify(list))
    }else{
      alert("请先登录")
      this.props.history.push( '/denglu',null)
    }
  }

  render() {
    return (
      <div className = "detail">
        <div className = "l">
          <img src = {this.state.src} alt = ""/>
        </div>
        <div className = "r">
          <p>
            {this.state.name}
          </p>
          <div className = "div">
            <span className = "s1">
              20mL
            </span>
            <span className = "s2">
              ￥{this.state.jiage}.00
            </span>
          </div>
          <button onClick = {(e)=>{this.goumai(e,this.state.id)}}>
            立即购买
          </button>
        </div>
      </div>
    );
  }
}

export default Detail;