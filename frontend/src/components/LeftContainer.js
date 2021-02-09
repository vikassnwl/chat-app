import React, { Component } from "react";

export class LeftContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isUserLoaded: false,
      isMessageLoaded: false,
      messages: [],
    };
  }

  componentDidMount() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          users: json,
          isUserLoaded: true,
        });
      });

    fetch("/api/list")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          messages: json,
          isMessageLoaded: true,
          message: "",
        });
      });
  }

  callMultiFunc = (hideLeftContainer, hideMe, getUser, user) => {
    hideLeftContainer(hideMe);
    getUser(user);
  };

  render() {
    let hideMe;
    if (window.outerWidth > 550) {
      hideMe = false;
    } else {
      hideMe = true;
    }
    const { width, hideLeftContainer, lst_msg, getUser } = this.props;
    const { users, isUserLoaded, isMessageLoaded, messages } = this.state;
    return (
      <div style={{ width: width }} className="left-container">
        <div className="search-box">
          <i className="material-icons">search</i>
          <input type="text" placeholder="Search..."></input>
        </div>
        <div className="friend-drawer-container">
          {isUserLoaded
            ? users.map((user) => (
                <div>
                  <div
                    onClick={() =>
                      this.callMultiFunc(
                        hideLeftContainer,
                        hideMe,
                        getUser,
                        user
                      )
                    }
                    className="friend-drawer"
                  >
                    <img
                      className="profile-pic"
                      src="../../static/images/avatar3.png"
                    ></img>
                    <div className="text">
                      <b>{user.username}</b>
                      <p>
                        {lst_msg
                          ? lst_msg.text.length >= 35
                            ? lst_msg.text.slice(0, 35) + " ..."
                            : lst_msg.text
                          : null}
                      </p>
                    </div>
                    <div className="time">
                      {lst_msg && new Date(lst_msg.created_at).toLocaleString()}
                    </div>
                  </div>
                  <hr></hr>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    );
  }
}

export default LeftContainer;
