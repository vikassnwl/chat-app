import React, { PureComponent } from "react";
import { render } from "react-dom";

import RightContainer from "./RightContainer";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left_width: window.outerWidth > 550 ? "30%" : "100%",
      hide: false,
    };
  }

  changeWidth = () => {
    window.outerWidth > 550
      ? this.setState({ left_width: "30%" })
      : this.setState({ left_width: "100%" });
  };

  componentDidMount() {
    window.onresize = () => {
      window.addEventListener("resize", this.changeWidth);
    };
  }

  hideLeftContainer = (shouldHide) => {
    this.setState({ hide: shouldHide });
  };

  render() {
    console.log("in render of App.js");
    const outerWidth = 550;

    return (
      <div className="container">
        <RightContainer
          right_width={this.state.hide ? "100%" : "70%"}
          hide={this.state.hide}
          left_width={this.state.left_width}
          hideLeftContainer={this.hideLeftContainer}
        />
      </div>
    );
  }
}

const appDiv = document.querySelector("#app");
render(<App />, appDiv);
