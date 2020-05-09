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

class Skeleton extends Component {
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
        <div className = "topbar">
          <h1 className = "title">Happy Mothers Day 🎉</h1>
          
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
        </div>
        <div className = "FullHome">
          <div className = "smaller">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={fam3}
                  alt="Good Old Days 👼"
                />
                <Carousel.Caption>
                  <h3 className = "black">Good Old Days 👼</h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={fam2}
                  alt="Cello 🎵"
                />

                <Carousel.Caption>
                  <h3 className = "black">Cello 🎵</h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={fam1}
                  alt="Family Vacation 🏝"
                />

                <Carousel.Caption>
                  <h3 className = "black">Family Vacation 🏝</h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={mom1}
                  alt="Inception... 📸"
                />

                <Carousel.Caption>
                  <h3 className = "black">Inception... 📸</h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </>
    );
  }
}

export default Skeleton;
