import React from "react";
import "./account.scss";
import editSvg from "../../assets/svg/accountPage/edit.svg";

const Account = () => {
  return (
    <div id="accountContainer">
      <div id="accountContent">
        <div id="accountHeader">
          <h2>Account setting</h2>
        </div>
        <div id="accountLeftPart">
          <h3>Profile picture</h3>
          <div id="accountImgContainer">
            <div id="accountImgoverlay">
              <div id="accountImgoverlayText">
                <img id="editIcon" src={editSvg} alt="edit icon" />
                <p>Upload a new picture</p>
              </div>
            </div>
            <img
              src="https://via.placeholder.com/150"
              alt="user profile picture"
            />
          </div>
        </div>
        <div id="accountRightPart">
          <div className="inputContainer">
            <p className="inputLabel">Name</p>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="inputContainer">
            <p className="inputLabel">Email</p>
            <input type="email" placeholder="John.doe@mail.com" />
          </div>
          <div className="inputContainer">
            <p className="inputLabel">Phone</p>
            <input type="number" placeholder="+33 6 00 00 00 00" />
          </div>
          <div className="inputContainer">
            <p className="inputLabel">Password</p>
            <input type="password" readonly placeholder="***************" />
            <button id="accountEditPasswordButton">
              <img src={editSvg} alt="" /> edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
