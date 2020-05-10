import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {Carousel} from "react-bootstrap";
import fam1 from "./pics/fam1.jpg";
import fam2 from "./pics/fam2.jpg";
import fam3 from "./pics/fam3.png";
import mom1 from "./pics/mom1.png";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "618863434979-jo6ut11hs7dci0i01ber0cjkh0v5jcrm.apps.googleusercontent.com";

class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
      <div className = "login">
            {this.props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
              />
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
              />
            )}
          </div>

        User: {this.props.name}
        <br></br>
        Edit Me!
      </>
    );
  }
}

export default Profile;
