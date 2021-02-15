import React, { Component } from "react";
import Header from "./Header";
import LeftContainer from "./LeftContainer";

export class RightContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      isLoaded: false,
      message: "",
      user: {},
    };
  }

  refreshList = () => {
    console.log("in componentdidmount of rightcontainer");
    fetch("/api/user/" + this.state.user.id + "/messages")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          messages: json,
          isLoaded: true,
          message: "",
        });
        var objDiv = document.querySelector(".chat-panel");
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      });
  };

  componentDidUpdate(pP, pS) {
    console.log("in componentdidupdate of rightcontainer");
    if (pS.user !== this.state.user) {
      this.refreshList();
    }
  }

  onSubmitHandler = (e) => {
    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    const csrftoken = getCookie("csrftoken");
    e.preventDefault();
    console.log("before data");
    const data = {
      text: this.state.message,
      user: this.state.user.id,
    };
    fetch("/api/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("before update");
      // this.componentDidUpdate();
      this.refreshList();
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  getUser = (user) => {
    this.setState({
      user: user,
      // messages: user.messages,
    });
  };

  render() {
    console.log("in render of RightContainer.js");
    const { left_width, hide, right_width, hideLeftContainer } = this.props;
    const { isLoaded, messages, message, user } = this.state;
    return (
      <>
        <div className="header">
          <Header
            hide={hide}
            left_width={left_width}
            right_width={right_width}
            user_name={user.username}
          />
        </div>
        {hide ? null : (
          <LeftContainer
            hideLeftContainer={hideLeftContainer}
            width={left_width}
            lst_msg={isLoaded && messages[messages.length - 1]}
            getUser={this.getUser}
          />
        )}

        {(window.outerWidth > 550 || hide) && (
          <div style={{ width: right_width }} className="right-container">
            <div className="chat-panel">
              {true
                ? messages.map((message) => (
                    <div className="right-chat-bubble-wrapper">
                      <div className="right-chat-bubble">{message.text}</div>
                      <div className="message-time">
                        {new Date(message.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                : "Loading..."}

              {/* <div className="left-chat-bubble-wrapper">
            <div className="left-chat-bubble">left chat bubble...</div>
          </div> */}
            </div>
            <form onSubmit={this.onSubmitHandler}>
              <div className="search-box message-box">
                <i className="material-icons">sentiment_very_satisfied</i>
                <input
                  value={message}
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Type your message here..."
                ></input>
                <i className="material-icons">mic</i>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                  }}
                  type="submit"
                >
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default RightContainer;
