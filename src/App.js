import React, { Component } from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Login from './Container/loginContainer';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import * as Cookie from "./utils/Cookie";
import {ACCESS_TOKEN} from "./utils/constant"
import Team from './Container/teamContainer';
import Reset from "./Container/resetContainer"
class App extends Component {
  render(){
  const isUserLogedIn = Cookie.getCookie(ACCESS_TOKEN) ? true : false;
  return (
    <div className="App">
     <Switch>
       { isUserLogedIn ?
        <Route exact path="/" component={Team}  />:
       <Route exact path="/" component={Login}/> 
      }
      <Route exact path="/reset" component={Reset}  />
        <Route exact path="/header" component={Header} />
        </Switch>
    </div>
  );
}
}

export default App;
