import React, { Component } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import GoogleLogin, { GoogleLogout } from "react-google-login";
const GOOGLE_CLIENT_ID = "618863434979-jo6ut11hs7dci0i01ber0cjkh0v5jcrm.apps.googleusercontent.com";


import "../utilities.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      name: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, name: user.name });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id , name: user.name});
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined , name: undefined});
    post("/api/logout");
  };

  render() {
    let publicContent = (
      // <Router>
      //   <div>
      //     <div className = "topnav">
      //           {/* <div className="nav1"><Link to="/">Home</Link></div> */}
      //           {this.state.ismobile ? <div className="nav toggle" onClick={() => this.toggleSidebar()}>&#9776;</div> : ""}
      //           <div id="logo">Happy Mother's Day!!!</div>
      //     </div>
      //     <Skeleton
      //       default
      //       handleLogin={this.handleLogin}
      //       handleLogout={this.handleLogout}
      //       userId={this.state.userId}
      //     />
      //   </div>
      // </Router>
      <>
      <div className = "login">
            {this.state.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.handleLogout}
                onFailure={(err) => console.log(err)}
              />
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.handleLogin}
                onFailure={(err) => console.log(err)}
              />
            )}
          </div>
      <h1>Log in to see a surprise!</h1>
      </>
    )

    const privateContent = (
      <div className="header"> 
        
      <Router>
        <div>
          <div className = "topnav">
              {/* <div className="nav1"><Link to="/">Home</Link></div> */}
              {this.state.ismobile ? <div className="nav toggle" onClick={() => this.toggleSidebar()}>&#9776;</div> : ""}
              <Link to="/" className={"nav"}>Home</Link>
              <Link to="/blog" className={"nav"}>Blog</Link>
              <Link to="/profile" className={"nav"}>Profile</Link>
              <div id="logo">{this.state.name}'s Site</div>
          </div>
          <Switch>
            <Profile
              path="/profile"
              name={this.state.name}
              userId={this.state.userId}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />
            <Blog
              path="/blog"
              name={this.state.name}
              userId={this.state.userId}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />
            <Skeleton
              path="/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />
            <NotFound default />
          </Switch>
        </div>
      </Router>
      </div>
      // <Router>
      //   <div className = "home-toggle">
      //     <div className="topnav">
      //     <Link to="/" className="nav">Home</Link>
      //     <Link to="/login" className="nav" >Login</Link>
      //     <Link to="/register" className="nav" >Register</Link>
      //     <Link to="/passwordreset" className = "nav rightforgotpassword">Forgot Password?</Link>
      //     <div id="logo">interstellar</div>
      //     </div>
      //   </div>
      // </Router>
    )
  
    return (
      <>
        <div>
          {/* <button onClick = {this.handleLogout}>click me</button> */}
        {(this.state.userId && (this.state.name==="Haihui Yu"||this.state.name==="Daniel Sun")) ? privateContent : publicContent}
        </div>
        {/* <button onClick = {() => {console.log(this.state)}}>click me</button> */}
      </>
    );
  }
}

export default App;
