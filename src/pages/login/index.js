import React, { Component } from 'react';
import "./index.css"
import {Link} from "react-router-dom"
import {withRouter} from "react-router-dom";
class Denglu extends Component{
  constructor(){
      super()
      this.state = {
          username:"" ,
          password :"",
          miMaTiShi:"",
          nameTiShi:"",
          tiShi:"",
          tiaoZhuan:""
      }
      this.sub =this.sub.bind(this)
  }
  sub(e){
    
    let data = {//接收input中的值
        username : this.refs.un.value,//refs只取到dom元素，取值需要后面的.value
        password : this.refs.pwd.value,
    }
    let text = localStorage.getItem("name")
    text = JSON.parse(text)
    let name = data.username
    let  MyIndex = text.map((item) => item.name).indexOf(name);
    e.preventDefault() //阻止表单提交事件的自动跳转
    
    let miMaTiShi = "" ;
    let nameTiShi = "" ;
    let tiShi = "" ;

    
    if(MyIndex !== -1){
        if(text[MyIndex].password === data.password){
            tiShi = "登录成功！"
            localStorage.setItem("username",data.username)
            alert("登录成功！")
            this.props.history.push( '/home',null)
        }else{
            tiShi = "登录失败,用户名和密码不匹配"
        }
    }else{
        tiShi = "登录失败,用户名和密码不匹配"
    }
    this.setState({ 
        miMaTiShi,nameTiShi,tiShi
    })
  }
  render(){
      return(
        <div className = "denglu">
          <h3>用户登录</h3>
          <form onSubmit={this.sub}>
              <div className = "div">
                  <span className = "s1">
                    用户名：
                  </span>
                  <input type="text" ref="un" defaultValue={this.state.username} />
                  <br/>
                  <span className = "s2">
                      {this.state.nameTiShi}
                  </span>
              </div>
              <div className = "div div1">
                  <span  className = "s1">
                    密码:
                  </span>
                  <input type="password" ref="pwd" defaultValue={this.state.password} />
                  <br/>
                  <span className = "s2">
                      {this.state.miMaTiShi}
                  </span>
              </div>
              <h4>
                  {this.state.tiShi}
              </h4>
              <input type="submit" value="登录"className = "zhuce" />
              <br/>
              <span>
                <Link to={`/create`}>
                    没有账号！立即注册！
                </Link>
              </span>
          </form>
        </div>
      )
  }
}
export default withRouter(Denglu);