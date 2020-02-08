import React from 'react';
import TopBar from './components/top-bar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './auth/auth';
import './App.css';
import Login from './components/log/login';
import Signup from './components/log/signup';
import AuthService from './auth/auth';
import Logout from './components/log/logout';
import store from './components/store';
import { Provider  } from 'react-redux';
import Home from './components/Home';
import { request } from './components/redux/request';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      authTokens: AuthService.getTokensLocal(),
      isLog :AuthService.getLogLocal(),
    }
    this.checkLog = this.checkLog.bind(this);
  }
  
  checkLog() {
    const joker = AuthService.getTokensLocal();
    this.setState({ authTokens: joker });
    if (joker === null) {
      this.setState({ isLog: false });
    } else if (joker !== null) {
        this.setState({ isLog: true });
    }
  }

  UNSAFE_componentWillMount(){
    this.checkLog();
    request.get('/scans').then().catch(error =>{
      // alert(error.response);
      if(error.response === "undefined"){
        if(error.response.status === 401){
          this.setState({ isLog: false});
          AuthService.logOut();
          this.checkLog();
        }   
      }
    })
  }
  
  handleLogOff(log) {
    this.setState({ isLog: log });
    AuthService.logOut();
    this.checkLog();
  }
  handleLogOn(log) {
    this.setState({ isLog: log });
    this.checkLog();
  }
  render(){
    const setTokens = (data) =>{
      this.setState({ authTokens: data});
    } 
    const authJoker = this.state.authTokens;
    const isLog = this.state.isLog;
    
    return (
      <AuthContext.Provider value={{ authTokens: authJoker, setAuthTokens: setTokens}} >
        <Provider store={store}>
          <BrowserRouter>
            <div>
                <TopBar isLog={isLog} handleLog = {this.handleLogOff.bind(this)} />
              <Switch>
                <PrivateRoute path="/" component={Home} handleLog = {this.handleLogOff.bind(this)}  exact />

                <PrivateRoute path="/signup" component={Signup} exact />

                <Route path="/login" render={(props) => <Login {...props} isAuth={this.handleLogOn.bind(this)}/>} exact />
                <Route path="/logout" component={Logout} exact />
                <Route component={Error} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </AuthContext.Provider>
    );
  }
}
export default App;
