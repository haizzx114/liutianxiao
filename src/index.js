import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
}from 'react-router-dom';
import { Component } from 'react';
import Home from './conmponents/Home/index';
import Err from './conmponents/Err';
import Detail from './conmponents/Detail';
import Longin from './conmponents/Longin';
import Shoppingcar from './conmponents/Shoppingcar';
import List from './conmponents/List';
import Create from './conmponents/create';
import Nav from './pages/Nav';
import Top from "./pages/top"
import Foot from "./pages/foot"

class Hollo extends Component {
    render() {
      return (
        <Router>
            <div>
                <Nav/>
                <Top/>
                <Switch>
                    <Redirect path="/" to="/home" exact={true} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/detail/:goodsID" component={Detail} />
                    <Route exact path="/login" component={Longin} />
                    <Route exact path="/shoppingcar" component={Shoppingcar} />
                    <Route exact path="/list" component={List} />
                    <Route exact path="/create" component={Create} />
                    <Route component={Err} />
                </Switch>
                <Foot/>
            </div>
        </Router>
      );
    }
  }

ReactDOM.render(<Hollo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
