import React, { useState } from "react";
import "./account.scss";
import editSvg from "../../assets/svg/accountPage/edit.svg";

const Account = () => {
  const localUserData = localStorage.getItem("userData");
  const userDataObject = JSON.parse(localUserData || "{}");
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [email, setEmail] = useState(userDataObject?.user?.email);
  const [name, setName] = useState(userDataObject?.user?.name);

  console.log(email);

  // TODO : quand le back sera fait valider la modification de données à la volé avec un debounce de 3s ou ajouter un bouton valider à la place
  return (
    <div id="accountContainer">
      <div id="accountContent">
        <div id="accountHeader">
          <h2>Account informations</h2>
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
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="inputContainer">
            <p className="inputLabel">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="John.doe@mail.com"
            />
          </div>
          <div className="inputContainer">
            <p className="inputLabel">Password</p>
            <button
              id="accountEditPasswordButton"
              onClick={() => setEditPassword(!editPassword)}>
              <img src={editSvg} alt="" /> edit
            </button>
          </div>
          {
            /* edit password container */
            editPassword && (
              <>
                <div id="overlay"></div>
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
                    <button
                      id="accountEditPasswordCancel"
                      onClick={() => setEditPassword(false)}>
                      Cancel
                    </button>
                    <button id="accountEditPasswordSave">Save</button>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Account;
