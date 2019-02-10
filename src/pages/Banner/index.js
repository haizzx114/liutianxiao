import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Carousel } from 'antd';
import "./index.css"
import axios from "axios"
import {Link} from "react-router-dom"

class Banner extends Component {
  constructor(props){
    super(props)

      this.state = {
          src:[]
      }
    }

    componentDidMount(){
      
      axios.get('http://localhost:3000/data.json').then((response)=>{
        let list = response.data.banner
        this.setState({
          src : list
        })
        //console.log(list);//请求正确时执行的代码
      }).catch(function (response){
        console.log()
        console.log(response);//发生错误时执行的代码
      });

    }

    componentDidUpdate(){
        // this.mySwiper.update()
       
    }
    
  render() {
    let listDom = this.state.src.map(
      (item)=>(<div className="swiper-slide" key="">
          <Link to={`/list`}>
              <img src={item} alt=''/>
          </Link>
      </div>)
    )
    return (
      
      <div className="banner">
        <Carousel autoplay>
          {listDom}
        </Carousel>
      </div>
    );
  }
}


export default Banner;
