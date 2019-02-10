import React, {
    Component
} from 'react';
import 'antd/dist/antd.css'
import "./index.css"
import {Icon} from "antd"


class Top extends Component {
    componentDidMount(){
        window.addEventListener('scroll' , ()=>{
          let scrollTop = document.documentElement.scrollTop || document.body;
          this.scrollTop(scrollTop,600,"show")
          if(scrollTop > 400){
            this.setState({
              show2 : true
            })
          }else{
            this.setState({
              show2 : false
            })
          }
        })
      }
      scrollTop(scrollTop,num,show){
            if(scrollTop > num){
            this.setState({
                show : true
            })
          }else{
            this.setState({
              show : false
            })
          }
      }
      constructor(props){
        super(props)
        this.state = ({
          show : false,
          show2 : false
        })
      }

      goTo(){
        let scrollToTop = window.setInterval(function() {
          let pos = window.pageYOffset;
          if ( pos > 0 ) {
              window.scrollTo( 0, pos - 20 ); // how far to scroll on each step
          } else {
              window.clearInterval( scrollToTop );
          }
      }, 2);
      }

      render() {
        let { show } = this.state;
        return (
           
            <div className = "top">
        
                {
                show &&
                <div onClick={this.goTo} className="iconfont icon-huidaodingbu1">
                    <Icon type="up" style={{fontSize: '20px', color: '#000'}}/>
                </div>
                }
              
          </div>
        );
      }
}

export default Top;