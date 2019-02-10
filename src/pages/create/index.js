import React, { Component } from 'react';
import 'antd/dist/antd.css'
import "./index.css"
import {withRouter} from "react-router-dom";
class CreateDemo extends Component {
  constructor(){
    super()
    this.state = {
        username:"" ,
        password :"",
        miMaTiShi:"",
        nameTiShi:"",
        yanZhengTiShi:"",
        duanXingTiShi:"",
        xieYiTiShi:"",
        tiShi:"",
        tiaoZhuan:"",
        yanZhengMa:"",
        duanXing:"",
        xieYi:false
    }
    this.sub =this.sub.bind(this)
    this.yanZhengMa =this.yanZhengMa.bind(this)
    this.duanXing =this.duanXing.bind(this)
    this.xieYi =this.xieYi.bind(this)
  }
  componentDidMount(){
    this.yanZhengMa()
  }

  sub(e){
    e.preventDefault() //阻止表单提交事件的自动跳转
    let data = {//接收input中的值
        username : this.refs.un.value,//refs只取到dom元素，取值需要后面的.value
        password : this.refs.pwd.value,
        yanZhengMa : this.refs.yanZheng.value,
        duanXing : this.refs.duanXing.value,
    }
    let text = localStorage.getItem("name")
    text = JSON.parse(text)
    let name = data.username
    if(text){
      var  MyIndex = text.map((item) => item.name).indexOf(name);
    }
    
    let miMaTiShi = "" ;
    let nameTiShi = "" ;
    let tiShi = "" ;
    let yanZhengTiShi = "";
    let duanXingTiShi = "";
    let xieYiTiShi = ""
    let n = 0 ;

    //密码验证
    if(data.password.length === 0){
        miMaTiShi = "请设置密码" 
    }else if(data.password.length < 6){
        miMaTiShi = "密码长度必须大于等于6" 
    }else if(data.password.length > 12){
        miMaTiShi = "密码长度必须小于等于12" 
    }else{
        miMaTiShi = "√" ;
        n++
    }
    

    //手机号验证
    if(data.username.length === 0){
      nameTiShi = "手机号不能为空" 
    }else if( MyIndex !== -1){
      nameTiShi = "用户名已经存在！" 
    }else if(!(/^1[34578]\d{9}$/.test(data.username))){
        nameTiShi = "手机号不合法" 
    }else{
        nameTiShi = "√" ;
        n++
    }

    //验证码验证
    let yanZhengMa = data.yanZhengMa.toUpperCase()
    let tureyanZhengMa = this.state.yanZhengMa.toUpperCase()
    if(data.yanZhengMa.length === 0){
      yanZhengTiShi = "验证码不能为空"
    }else if(yanZhengMa !== tureyanZhengMa){
      yanZhengTiShi = "验证码错误"
    }else{
      yanZhengTiShi = "√" ;
      n++
    }
    
    //短信验证
    let duanXing = data.duanXing.toUpperCase()
    let tureduanXing = this.state.duanXing.toUpperCase()
    if(data.duanXing.length === 0){
      duanXingTiShi = "短信验证不能为空"
    }else if(duanXing !== tureduanXing){
      duanXingTiShi = "验证码错误"
    }else{
      duanXingTiShi = "√" ;
      n++
    }
    
    if(this.state.xieYi){
      xieYiTiShi = "√"
      n++
    }else{
      xieYiTiShi = "请阅读个人信息收集说明"
    }

    if(n!==5){
        n = 0
        tiShi = "注册失败"
    }else{
        n = 0
        tiShi = "注册成功！"

        let carObj = {
            name : data.username,
            password : data.password
        }
        
        let list = []
        
        let shopCars = localStorage.getItem("name")
        
        //判断该购物车列表之前有没有存过数据
        if(shopCars == null){
            //如果没有存 则直接添加新值
            list.push(carObj)
        }else{
            //如果之前存过值 则将原来的值取出来 转换成数组 
            shopCars = JSON.parse(shopCars)
            //再加入新的值
            shopCars.push(carObj)
            
            //再把加了新值的数组重新丢回到本地存储内
            list = shopCars
        }
            alert("注册成功")
            localStorage.setItem("name",JSON.stringify(list))
            this.props.history.push('/login',null)
    }

  //提示
    this.setState({ 
        miMaTiShi,nameTiShi,tiShi,yanZhengTiShi,duanXingTiShi,xieYiTiShi
    })
  }

  yanZhengMa(){
    let yanZhengMa = this.yzm()
    this.setState({ 
      yanZhengMa
    })
  }

  duanXing(){
    let duanXing = this.yzm()
    alert(`假设你受到了短信${duanXing}`)
    this.setState({ 
      duanXing
    })
  }

  xieYi(e){
    let xieYi = e.target.checked
    this.setState({ 
      xieYi
    })
  }
  yzm(){
    let yanZhengMaList = ["0","1","2","3","4","5","6","7","8","9",'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z']
    let yanZhengMa = ""
    for ( let i =0 ; i < 4 ; i++){
      let num = Math.round(Math.random()*35)
      yanZhengMa += yanZhengMaList[num]
    }
    return yanZhengMa
  }
  

  render() {
    
    return (
      <div className = "create">
          <h3>注册</h3>
          <p className = "wenzi">
            如您已是Dior店铺会员，请使用会员手机号码注册，系统将自动绑定您的官网帐号并合并您在官网和店铺的购物积分。
          </p>
          <form onSubmit={this.sub}>
            <p className = "wenzi">
              *为必填项目。
            </p>
            <div className = "div">
              <span className = "span">
                手机号*
              </span>
              <input type = "text" placeholder = "手机号" ref="un"/>
              <span className = "s1 span">
                电子邮箱地址
              </span>
              <input type = "text" placeholder = "电子邮箱"/>
            </div>
            <p className = "tishi ">
              {this.state.nameTiShi}
            </p>
            <div className = "div">
              <span className = "span" >
                验证码*
              </span>
              <input type = "text" placeholder = "验证码" className = "yanZheng" ref="yanZheng"/>
              <span className = "yanZheng" onClick = {this.yanZhengMa}>
                {this.state.yanZhengMa}
              </span>
            </div>
            <p className = "tishi ">
              {this.state.yanZhengTiShi}
            </p>
            <div className = "div">
              <span className = "span">
                短信验证码*
              </span>
              <input type = "text" placeholder = "短信验证码" className = "ZCinput" ref="duanXing"/>
              <button className = "ZCbtn" onClick={(e)=>{this.gouxuan(e)}}>
                发送
              </button>
            </div>
            <p className = "tishi ">
              {this.state.duanXingTiShi}
            </p>
            <div className = "div">
              <span className = "span">
                密码*
              </span>
              <input type = "text" placeholder = "密码" ref="pwd"/>
            </div>
            <p className = "tishi ">
              {this.state.miMaTiShi}
            </p>
            <div className = "div queRen">
              <input type="checkbox" name="check" className = "xieYi" onChange={this.xieYi}/>
                我已阅读并接受个人信息收集说明
            </div>
            <p className = "tishi tishi1">
              {this.state.xieYiTiShi}
            </p>
            <div className = "zcBox">
              <input type="submit" value="注册"className = "zhuChe ZCbtn" />
            </div>
          </form>
      </div>
    );
  }
}

export default withRouter(CreateDemo);