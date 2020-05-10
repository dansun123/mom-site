import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {Carousel} from "react-bootstrap";
import fam1 from "./pics/fam1.jpg";
import fam2 from "./pics/fam2.jpg";
import fam3 from "./pics/fam3.png";
import mom1 from "./pics/mom1.png";

import "../../utilities.css";
import "./Skeleton.css";
import { post, get } from "../../utilities";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "618863434979-jo6ut11hs7dci0i01ber0cjkh0v5jcrm.apps.googleusercontent.com";

class Blog extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {title: '', value: '', newPost: false, posts:[]};

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.title+this.state.value);
    let query = {title: this.state.title, content: this.state.value, time: Date()}
    post('api/post', query).then((res) => {
        console.log("hi"+res);
        this.setState({posts: res})
    })
    event.preventDefault();
  }

  handleNewPost = () => {
    this.setState({newPost: true})
  }

  componentDidMount() {
    // remember -- api calls go here!
    let query = {user: this.props.userId};
    get('api/posts', query).then((res) => {
        this.setState({posts: res})
    })
  }

  render() {

    let newBlogPost = 
    (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
                </label>
            </form>

            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

    const container = document.getElementById('container');

    for(let i=this.state.posts.length-1; i >= 0; i -= 1){
        let chord = document.createElement('div');
        chord.innerHTML = '<h2>'+this.state.posts[i].title +'</h2>'+ this.state.posts[i].content;
        container.appendChild(chord);
    }

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

        <h1>{this.props.name}'s Blog</h1>
        <button onClick = {this.handleNewPost}>Write New Blog</button>
        {this.state.newPost ? newBlogPost : ""}
        <button onClick={() => {console.log(this.state)}}>click me</button>
        <div id="container"></div>
      </>
    );
  }
}

export default Blog;
