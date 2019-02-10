import React, { Component } from 'react';
import 'antd/dist/antd.css'
import "./index.css"
import foot_r from "../../img/foot_r.png"

class Foot extends Component {
  render() {
    return (
      <div className = "foot">
          <div  className = "div">
            <div className = "left">
                <h4>电子通讯</h4>
                <div className = "input">
                  <input placeholder = "*请输入你的邮箱"  />
                  <span className = "queding">
                    确定
                  </span>
                </div>
            </div>
          </div>
          <div className = "div zhong">
            <ul>
              <li>
                  联系我们
              </li>
              <li>
                配送及退货
              </li>
              <li>
                常见问题
              </li>
              <li>
                职业生涯
              </li>
              <li>
                使用条款
              </li>
              <li>
                数据保护章程
              </li>
              <div className = "bianhao">
                沪公网安备 31010602002343号
                <br/>
                沪ICP备10014525号
                <br/>
                路威酩轩香水化妆品（上海）有限公司
                <br/>
                上海市南京西路1266号恒隆广场1期29F
              </div>
            </ul>
          </div>
          <div className = "div">
            <div className = "right">
                <img src = {foot_r} alt = ""/>
              </div>
          </div>
      </div>
    );
  }
}

export default Foot;
