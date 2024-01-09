import React, { useState } from "react";
import "./account.scss";
import editSvg from "../../assets/svg/accountPage/edit.svg";

const Account = () => {
  const [editPassword, setEditPassword] = useState<boolean>(false);

  // TODO : quand le back sera fait valider la modification de données à la volé avec un debounce de 3s ou ajouter un bouton valider à la place
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
            <input type="password" placeholder="***************" />
            <button
              id="accountEditPasswordButton"
              onClick={() => setEditPassword(!editPassword)}
            >
              <img src={editSvg} alt="" /> edit
            </button>
          </div>
          {
            /* edit password container */
            editPassword && (
              <div id="editPasswordContainer">
                <div className="inputContainerEditPassword">
                  <p className="inputLabel">New password</p>
                  <input type="password" placeholder="***************" />
                </div>
                <div className="inputContainerEditPassword">
                  <p className="inputLabel">Confirm password</p>
                  <input type="password" placeholder="***************" />
                </div>
                <div id="editPasswordbuttonsContainer">
                  <button id="accountEditPasswordSave">Save</button>
                  <button
                    id="accountEditPasswordCancel"
                    onClick={() => setEditPassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Account;
