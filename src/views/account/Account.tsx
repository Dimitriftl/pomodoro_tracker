import React from "react";
import "./account.scss";
import editSvg from "../../assets/svg/accountPage/edit.svg"

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
                    <img id="editIcon"src={editSvg} alt="edit icon"/>
                    <p>Upload a new picture</p>

                </div>
            </div>
            <img
              src="https://via.placeholder.com/150"
              alt="user profile picture"
            />
          </div>
        </div>

        <div id="accountRightPart"></div>
      </div>
    </div>
  );
};

export default Account;
