import React, { Component } from "react";
import {
  Router,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";

import Home from "./container/home/Home";
import Login from "./container/login/Login";
import Sidebar from "./container/layout/Sidebar";
import Footer from "./container/layout/Footer";
import Header from "./container/layout/Header";
import { logOut } from "./reducer/authReducer";
import { basePath } from "./config/baseConfig";

import TicTacToe from "./container/TicTacToe/TicTacToe";
import Form from "./component/Form/Form";
import FourQudrant from './container/FourQuadrant/FourQuadrant';
import KanbanBoard from './container/KanbanBoard/KanbanBoard';

import "./App.scss";

const history = createBrowserHistory();

export const historyPush=(path)=>{
  history.push(`${basePath}${path}`)
}
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `${basePath}/login`,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

// const PublicRoute = ({ component: Component, path, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       path={`${basePath}${path}`}
//       render={props => <Component {...props} />}
//     />
//   );
// };

class App extends Component {
  componentDidMount() {
    if (this.props.auth.loginData) {
      fakeAuth.authenticate(() => {});
    }
  }

  logOut = () => {
    localStorage.clear();
    fakeAuth.signout(() => {
      this.props.logOut();
 
      historyPush(`/login`);
    });
  };
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div className={`app-content`}>
            <div className={`header-container`}>
              {this.props.loading > 0 && (
                <div className="loading">Loading&#8230;</div>
              )}

              <Header
                isLoggedin={this.props.auth.loginData}
                logOut={this.logOut}
              />
            </div>
            <div className={`center-container`} id={`nav-body`}>
              <div className={`sidebar-container`}>
                <Sidebar />
              </div>

              <div className={`main-container`}>
                <Switch>
                  <PrivateRoute path={`${basePath}/`} component={Home} exact={true} />
                  <Route path={`${basePath}/login/:username`} component={Login} />
                  <Route path={`${basePath}/login`} component={Login} />
                  <PrivateRoute path={`${basePath}/home`} component={Home} />
                  <Route
                    path={`${basePath}/TicTacToe`}
                    component={TicTacToe}
                    exact={true}
                  />
                  <Route path={`${basePath}/Form`} component={Form} exact={true} />
                  <PrivateRoute path={`${basePath}/FourQudrant`} component={FourQudrant} exact={true} />
                  <PrivateRoute path={`${basePath}/FourQudrant`} component={FourQudrant} exact={true} />
                  <PrivateRoute path={`${basePath}/FourQudrant`} component={FourQudrant} exact={true} />
                  <PrivateRoute path={`${basePath}/KanbanBoard`} component={KanbanBoard} exact={true} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </div>
            <div className={`footer-container`}>
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.app.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


const PageNotFound = props => {
  return (
    <div>
      Page Not Found
      <Link to={`${basePath}/`}>To Home</Link>
      <Link to={`${basePath}/login`}>To Login</Link>
    </div>
  );
};


