import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Link} from "react-router-dom"
import "./index.css"
class shouppingcar extends Component {
  constructor(props){
    super(props)

      this.state = {
        num : [],
        heji : 0,
        arr :[],
        type:[],
        allTyoe:"",
        you:true
      }
    }

    componentDidMount(){
      let text = localStorage.getItem("username")
      let arr = localStorage.getItem("name_"+text)
      let you = ""
      arr = JSON.parse(arr)
      if(arr.length <= 0){
        you = false
      }else{
        you = true
      }
      let allTyoe = false
      let listDom = arr.map(
        (item)=>(
          1
        ))
        let type = arr.map(
          (item)=>(
            false
          ))
        this.setState({
          num : listDom,
          arr,
          type,
          allTyoe,
          you
        })
        
      if(!text){
        alert("请先登录")
        this.props.history.push( '/denglu',null)
      }
    }
    //修改商品数量
    test(e,index,type){
      e.preventDefault()
      let num = this.state.num[index]
      if(type === "add"){
        num ++
      }else{
        num --
      }
      if (num <= 1 ){
        num = 1
      }
      let arr = this.state.num
      arr[index] = num
      this.setState({
        num : arr
      })
      this.jiage()
    }
    //批量删除
    allShanChu(e){
      
    }
    //删除
    shanchu(e,index){
      let text = localStorage.getItem("username")
      let arr = this.state.arr
      let you = ""
      console.log(arr.length)
      if(arr.length === 1){
        you = false
      }else{
        you = true
      } 
      arr.splice(index,1)
      localStorage.setItem("name_"+text,JSON.stringify(arr))
      let type = this.state.type
      type.splice(index,1)
      this.setState({
        arr,
        type,
        you
      })
      this.jiage()
    }
    //全选
    quanxuan(e){
      let heji = 0
      let allTyoe = e.target.checked
      if (allTyoe){
        let type = this.state.type.map(
          (item)=>(
            true
          ))
          this.setState({
              type
            })
            for(let i = 0 ; i < type.length ; i++){
                heji += (this.state.arr[i].jiage * this.state.num[i])
            }
      }else{
        let type = this.state.type.map(
          (item)=>(
            false
          ))
          this.setState(
            {
              type
            }
          )
      }
      this.setState({
        allTyoe,
        heji
      })
    }
    //单选
    gouxuan(e,index){
      let typeArr = e.target.checked //判断勾选状态
      let type = this.state.type
      type[index]=typeArr
      //如果全部选中，则选中全选
      let allTyoe = false
      let n = 0
      for (let i =0 ; i < type.length ; i++){
        if(type[i]){
          n++
        }
        if(n === type.length){
         allTyoe = true
        }
      }
      this.setState({
        type,
        allTyoe
      })
      this.jiage()
    }
    //计算总价
    jiage(){
      let type = this.state.type
      let danjia = 0
      for(let i = 0 ; i < type.length ; i++){
        if(type[i]){
          danjia += (this.state.arr[i].jiage * this.state.num[i])
        }
      }
      this.setState({
        heji:danjia
      })
    }
    
  render() {
    let kong = ""
    let {you} = this.state;
    let listDom = this.state.arr.map(
      (item,index)=>(<li className="li" key={item.id}>
          <span className = "span s1">
            <input type="checkbox" name="check" onChange={(e)=>{this.gouxuan(e,index)}} checked = {this.state.type[index]} />
          </span>
          <div className = "a span">
            <Link to={`/detail/${item.id}`} >
                <img src={item.src} alt='' className = "img"/>
            </Link>
          </div>
          <span className = "span">{item.name}</span>
          <div className = "span">
              ¥{item.jiage}
          </div>
          <div className = " span s2">
              <div>
                <span className="add" onClick={(e)=>{this.test(e,index,"abb")}} >-</span>
                <span className="abb" onChange={(e)=>{this.gouxuan(e,index)}}>{this.state.num[index]}</span>
                <span className="add" onClick={(e)=>{this.test(e,index,"add")}} onChange={(e)=>{this.gouxuan(e,index)}}>+</span>
              </div>
          </div>
          <span className = "span s3" onClick={(e)=>{this.shanchu(e,index)}}>删除</span>
      </li>)
    )
    if(this.state.arr.length <= 0){
      kong = <div className = "kong">
        <h3>
          我的购物袋
        </h3>
        <p>
          您的购物袋是空的，立即购买您最喜爱的产品
        </p>
        <Link to={`/list`}>
          《 继续购物
        </Link>
      </div>
    }
    
    console.log(you)
    return (
      <div >
        {kong}
        {you && < ul className="shoppingcar">
          <li>
            <span className = "span s1">
              <input type="checkbox" name="check" onClick={(e)=>{this.quanxuan(e)}} checked = {this.state.allTyoe} readOnly/>
            </span>
            <span className="span">全选</span>
            <span className="span">产品名</span>
            <span className="span">价格</span>
            <span className="span">修改数量</span>
            <span className = "span s3" onClick={(e)=>{this.allShanChu(e)}}>删除</span>
          </li>
          {listDom}
          <li className = "heji">
            <div>
              合计：{this.state.heji}
              <span className = "goumai">购买</span>
            </div>
          </li>
        </ul>}
      </div>
    );
  }
}

export default shouppingcar;
