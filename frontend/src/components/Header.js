import React, { PureComponent } from "react";

export class Header extends PureComponent {
  render() {
    console.log("in render of header.js");
    const { hide, left_width, right_width, user_name } = this.props;
    return (
      <>
        {hide ? null : (
          <div style={{ width: left_width }} className="left-header">
            <img
              className="profile-pic"
              src="../../static/images/avatar3.png"
            ></img>
            <div className="left-header-icons">
              <i className="material-icons">cached</i>
              <i className="material-icons">message</i>
              <i className="material-icons">menu</i>
            </div>
          </div>
        )}

        {(window.outerWidth > 550 || hide) && (
          <div style={{ width: right_width }} className="right-header">
            <img
              className="profile-pic"
              src="../../static/images/avatar3.png"
            ></img>
            <div className="text">
              {/* <b>{isLoaded && users.length ? users[0].username : "Loading..."}</b> */}
              <b>{user_name}</b>
              <p>online</p>
              {/* <p>last seen {new Date().toLocaleString()}</p> */}
              {/* <p>last seen yesterday at 10:32 pm</p> */}
            </div>
            <div className="left-header-icons">
              <i className="material-icons">cached</i>
              <i className="material-icons">message</i>
              <i className="material-icons">menu</i>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Header;
