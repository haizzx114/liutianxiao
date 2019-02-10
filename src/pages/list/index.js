import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Link} from "react-router-dom"
import axios from "axios"
import "./index.css"
import { Menu, Dropdown, Icon } from 'antd';


class List extends Component {
  constructor(props){
    super(props)

      this.state = {
          src:[],
          pages1 : "page",
          pages2 : "nopage",
          InputValue : ""
      }
      this.handlePost = this.handlePost.bind(this)
      this.goumai =this.goumai.bind(this)
    }
    handlePost(){
      axios.get('http://localhost:3000/list.json').then((response)=>{
        let list = response.data.pages1
        this.setState({
          src : list
        })
        let add = this.state.InputValue
        let newArr = this.state.src.filter(item => item.name.indexOf(add)>=0) ;
        if(newArr.length === 0 ){
          alert("没有搜索到任何商品")
        }
        this.setState({
          src : newArr,
          
        })
        //console.log(list);//请求正确时执行的代码
      }).catch(function (response){
        console.log(response);//发生错误时执行的代码
      });
      
    }
    test(e,a){
      if(a === "1"){
        this.get(a)
        this.setState({
          pages1 : "page",
          pages2 : "nopage"
        })
      }
      if(a === "2"){
        this.get()
        this.setState({
          pages1 : "nopage",
          pages2 : "page"
        })
      }
    }

    paixu(e,a){
      let nuelist = this.state.src
      console.log(nuelist)
      if(a === "up"){
        nuelist.sort(function(a,b){
          return a.jiage - b.jiage
        })
      }else{
        nuelist.sort(function(a,b){
          return b.jiage - a.jiage
        })
      }
      this.setState({
        src : nuelist
      })
    }

    get(a){
      axios.get('http://localhost:3000/list.json').then((response)=>{
        let goodslist = ""
        if(a){
           goodslist = response.data.pages1
        }else{
           goodslist = response.data.pages2
        }
        let list = goodslist
        this.setState({
          src : list
        })
        //console.log(list);//请求正确时执行的代码
      }).catch(function (response){
        console.log(response);//发生错误时执行的代码
      });
    }

    componentDidMount(){
      this.get("a")
    }

    componentDidUpdate(){
        // this.mySwiper.update()
       
    }
    handleGetInputValue = (event) => {
      this.setState({
        InputValue : event.target.value,
      })
    };
    goumai(e,id){
      let text = localStorage.getItem("username")
      let  arr = this.state.src.map((item) => item.id).indexOf(id);
        arr = this.state.src[arr]
      if(text){
        let carObj = {
          id,
          jiage:arr.jiage,
          name : arr.name,
          src : arr.src
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
    let listDom = this.state.src.map(
      (item)=>(<li className="swiper-slide" key={item.id}>
        
          <div className = "a">
            <Link to={`/detail/${item.id}`} >
                <img src={item.src} alt=''/>
            </Link>
          </div>
          <span>{item.name}</span>
          <div className = "goumai">
            <span className = "sl">
              ¥{item.jiage}.00
            </span>
              <span className = "sr" onClick = {(e)=>{this.goumai(e,item.id)}}>
                立即购买
              </span>
          </div>
          
      </li>)
    )
    const menu = (
      <Menu>
        <Menu.Item onClick={(e)=>{this.paixu(e,"down")}} >
          价格从高到低
        </Menu.Item>
        <Menu.Item onClick = {(e)=>{this.paixu(e,"up")}}>
          价格从低到高
        </Menu.Item>
      </Menu>
    );

    return (
      <div className = "list">
        <div className = "paiXuNav">
          
          <Dropdown overlay={menu} className = "paiXu">
            <div className="ant-dropdown-link" href="#" >
              排序方式 <Icon type="down" />
            </div>
          </Dropdown>
          <div className = "sousuo">
              <input 
                type = "text" 
                value={this.state.InputValue} 
                onChange={this.handleGetInputValue}
              />
              <Icon type="zoom-in"  style={{ fontSize: '30px', color: '#000' }} onClick={this.handlePost}/>
          </div>
        </div>
        <ul className="listDom">
            {listDom}
        </ul>
        <div className = "pages">
            <span onClick={(e)=>{this.test(e,"1")}} className = {this.state.pages1}>1</span>
            <span onClick={(e)=>{this.test(e,"2")}} className = {this.state.pages2}>2</span>
        </div>
      </div>
    );
  }
}

export default List;
