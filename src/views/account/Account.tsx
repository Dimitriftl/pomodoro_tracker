import React, { useContext, useState } from "react";
import "./account.scss";
import editSvg from "../../assets/svg/accountPage/edit.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { passwordType } from "../../utils/types/globalTypes";
import { EyeSvg, EyeOffSvg } from "../../assets/svg/svg";
import Loader from "../../components/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../../context/MyProviders";
import { useBackendRoute } from "../../hooks/UseBackendRoute";

const Account = () => {
  const localUserData = localStorage.getItem("userData");
  const userDataObject = JSON.parse(localUserData || "{}");
  const [email, setEmail] = useState<string>(userDataObject?.user?.email);
  const [name, setName] = useState<string>(userDataObject?.user?.name);
  // password related
  const [displayPasswordModal, setDisplayPasswordModal] =
    useState<boolean>(false);
  const [displayPassword, setDisplayPassword] = useState<passwordType>(null);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { themeColor } = useContext(ThemeContext);
  const { apiCall, success, error, errorMessage } = useBackendRoute();

  const updatePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const passwordData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    try {
      await apiCall("updatePassword", passwordData, () => {
        setDisplayPasswordModal(false);
      });
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const updateUserInformations = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name: name,
      email: email,
    };
    await apiCall("updateUserInformations", data);
    setIsLoading(false);
  };

  const handleDisplayPassword = (typeOfPassword: passwordType) => {
    switch (typeOfPassword) {
      case "currentPassword": {
        if (displayPassword === "currentPassword") {
          setDisplayPassword(null);
        } else setDisplayPassword("currentPassword");

        break;
      }
      case "newPassword": {
        if (displayPassword === "newPassword") {
          setDisplayPassword(null);
        } else setDisplayPassword("newPassword");
        break;
      }
      case "confirmPassword": {
        if (displayPassword === "confirmPassword") {
          setDisplayPassword(null);
        } else setDisplayPassword("confirmPassword");
        break;
      }
    }
  };

  const handleDisabledForInformations = () => {
    if (
      email === userDataObject?.user?.email &&
      name === userDataObject?.user?.name
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleDisabledForPassword = () => {
    if (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword === newPassword
    ) {
      return false;
    } else return true;
  };

  // TODO : quand le back sera fait valider la modification de données à la volé avec un debounce de 3s ou ajouter un bouton valider à la place
  return (
    <div id="accountContainer">
      <ToastContainer />
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
          <form onSubmit={(e) => updateUserInformations(e)}>
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
            <button disabled={handleDisabledForInformations()} type="submit">
              Save
            </button>
          </form>
          <div className="editPasswordContainer">
            <p className="inputLabel">Password</p>
            <button
              id="accountEditPasswordButton"
              onClick={() => setDisplayPasswordModal(!displayPasswordModal)}>
              <img src={editSvg} alt="" /> edit
            </button>
          </div>
          {
            /* edit password modal */
            displayPasswordModal && (
              <>
                <div
                  onClick={() => setDisplayPasswordModal(false)}
                  id="overlay"></div>
                <div id="editPasswordContainer">
                  {error && <p id="errorMessage">{errorMessage}</p>}
                  <form onSubmit={(e) => updatePassword(e)}>
                    <div className="inputContainerEditPassword">
                      <p className="inputLabel">Current password</p>
                      <div className="inputContainer">
                        <input
                          required
                          type={
                            displayPassword === "currentPassword"
                              ? "text"
                              : "password"
                          }
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="***************"
                        />
                        <span
                          onClick={() =>
                            handleDisplayPassword("currentPassword")
                          }>
                          {displayPassword === "currentPassword" ? (
                            <EyeSvg color="var(--color-text)" />
                          ) : (
                            <EyeOffSvg color="var(--color-text)" />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="inputContainerEditPassword">
                      <p className="inputLabel">New password</p>
                      <div className="inputContainer">
                        <input
                          required
                          type={
                            displayPassword === "newPassword"
                              ? "text"
                              : "password"
                          }
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="***************"
                        />
                        <span
                          onClick={() => handleDisplayPassword("newPassword")}>
                          {displayPassword === "newPassword" ? (
                            <EyeSvg color="var(--color-text)" />
                          ) : (
                            <EyeOffSvg color="var(--color-text)" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="inputContainerEditPassword">
                      <p className="inputLabel">Confirm password</p>
                      <div className="inputContainer">
                        <input
                          required
                          type={
                            displayPassword === "confirmPassword"
                              ? "text"
                              : "password"
                          }
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="***************"
                        />
                        <span
                          onClick={() =>
                            handleDisplayPassword("confirmPassword")
                          }>
                          {displayPassword === "confirmPassword" ? (
                            <EyeSvg color="var(--color-text)" />
                          ) : (
                            <EyeOffSvg color="var(--color-text)" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div id="editPasswordbuttonsContainer">
                      <button
                        onClick={() => setDisplayPasswordModal(false)}
                        id="accountEditPasswordCancel">
                        Cancel
                      </button>
                      <button
                        disabled={handleDisabledForPassword()}
                        type="submit">
                        {isLoading ? <Loader color="white" /> : "Confirm"}
                      </button>
                    </div>
                  </form>
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
