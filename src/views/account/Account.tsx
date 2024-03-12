import { useContext, useEffect, useState } from "react";
import "./account.scss";
import editSvg from "../../assets/svg/accountPage/edit.svg";
import { typeOfModalTypes } from "../../utils/types/globalTypes";
import { ToastContainer } from "react-toastify";
import { IsUserLoggedInContext } from "../../context/MyProviders";
import { useBackendRoute } from "../../hooks/UseBackendRoute";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import EditPasswordModal from "../../components/editPasswordModal/EditPasswordModal";

const Account = () => {
  const localUserData = localStorage.getItem("userData");
  const userDataObject = JSON.parse(localUserData || "{}");
  const [email, setEmail] = useState<string>(userDataObject?.user?.email);
  const [name, setName] = useState<string>(userDataObject?.user?.name);
  const [profilePicture, setProfilePicture] = useState(
    userDataObject.user.profilePicture
  );
  // password related
  const [displayPasswordModal, setDisplayPasswordModal] =
    useState<boolean>(false);

  const { apiCall, error, errorMessage } = useBackendRoute();
  const [openModalDeleteAccount, setOpenModalDeleteAccount] =
    useState<typeOfModalTypes>(null);
  //profile picture
  const [file, setFile] = useState<string>("");

  const { setIsUserLoggedIn } = useContext(IsUserLoggedInContext);
  const imgBaseUrl = import.meta.env.VITE_IMG_URL;
  const navigate = useNavigate();

  const updateUserInformations = async (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
    };
    await apiCall("updateUserInformations", data);
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

  const handleDeleteAccount = () => {
    apiCall("deleteUser", null, () => {
      setIsUserLoggedIn(false);
      navigate("/");
    });
  };

  // useEffect used to make the call to back end once the user chosed a file
  useEffect(() => {
    handleUploadPicture();
  }, [file]);

  // used to simulate a click on the input file which is displayed none
  const selectFile = () => {
    document.getElementById("inputTypeFileLocal")?.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPicture = async () => {
    if (!file) {
      return null;
    } else {
      const formData = new FormData();
      formData.append("profilePicture", file);
      await apiCall("updateProfilePicture", formData, (imageName) => {
        setProfilePicture(imageName);
      });
    }
  };

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
            <div id="accountImgoverlay" onClick={() => selectFile()}>
              <div id="accountImgoverlayText">
                <img id="editIcon" src={editSvg} alt="edit icon" />
                <p>Upload a new picture</p>
              </div>
            </div>
            <img
              src={
                profilePicture
                  ? `${imgBaseUrl}${profilePicture}`
                  : "https://via.placeholder.com/150"
              }
              alt="user profile picture"
            />
          </div>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => handleFileChange(e)}
            id="inputTypeFileLocal"
          />
        </div>
        <div id="accountRightPart">
          {error && <p id="errorMessage">{errorMessage}</p>}
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
          <div id="deleteAccountContainer">
            <button
              onClick={() => setOpenModalDeleteAccount("account")}
              id="deleteAccountButton">
              Delete my account
            </button>
          </div>
          {
            /* edit password modal */
            displayPasswordModal && (
              <EditPasswordModal
                setDisplayPasswordModal={setDisplayPasswordModal}
              />
            )
          }
          {openModalDeleteAccount === "account" && (
            <ConfirmModal
              setTypeOfModal={setOpenModalDeleteAccount}
              typeOfModal="account"
              handleDeleteAccount={handleDeleteAccount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
