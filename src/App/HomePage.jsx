import React from "react";
import { connect } from "react-redux";


import {
  initHeader,
  initAnimation,
  addListeners
} from "../js/homepageAnimation.js";

class HomePage extends React.Component {
  componentDidMount() {
    // TODO configurable particles based on profile
    initHeader();
    initAnimation();
    addListeners();
  }

  render() {
    let backgroundImageStyle = {
      background:
        "url('http://placehold.it/1920x1280') no-repeat center center fixed",
      backgroundSize: "cover",
      backgroundColor: "#333",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    return (
      <div id="home" className="large-header" style={backgroundImageStyle}>
        <canvas id="demo-canvas"></canvas>
        <div id="large-header">
          <div class="relative-table">
            <div class="table-cell">
              <div class="container">
                <div className="row wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="200">
                  <div className="col-md-12">
                    <h1><span className="thin">Hi! I'm</span> Johnathan Doe</h1>
                    <h4 className="sup-home">experienced IT Engineer / Webdeveloper</h4>
                    <a className="button text-center" href="downloads/cv.pdf"><i className="fa fa-download"></i> Download Cv</a>
                    <a className="button-style-2 text-center smooth" href="#about"><i className="fa fa-file-text"></i> More About Me</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
