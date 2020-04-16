import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Container/loginContainer";
import Header from "./Container/HeaderContainer";
import Navigation from "./Components/Navigation";
import * as Cookie from "./utils/Cookie";
import { ACCESS_TOKEN, USER_DETAILS } from "./utils/constant";
import Team from "./Container/teamContainer";
import Reset from "./Container/resetContainer";
import Form from "./Container/formContainer";
import forgotContainer from "./Container/forgotContainer";
import forgotPassContainer from "./Container/forgotPassContainer";
class App extends Component {
  render() {
    const isUserLogedIn = Cookie.getCookie(ACCESS_TOKEN) ? true : false;
    const userDetails = Cookie.getCookie(USER_DETAILS);
    const parsedData = userDetails && JSON.parse(userDetails);
    const password_updated =
      parsedData && parsedData.password_updated === 0 ? false : true;
    return (
      <div className="App">
        <Switch>
          {isUserLogedIn && password_updated ? (
            <React.Fragment>
              <Route exact path="/" component={Team} />
              <Route exact path="/reset" component={Reset} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route exact path="/forgot" component={forgotPassContainer} />
              <Route exact path="/forgot/:token" component={forgotContainer} />
              <Route exact path="/reset" component={Reset} />
              <Route exact path="/" component={Login} />
              <Route exact path="/form" component={Form} />
            </React.Fragment>
          )}
        </Switch>
      </div>
    );
  }
}

export default App;
