import { Dispatch, FC, SetStateAction, useState } from "react";
import { useBackendRoute } from "../../hooks/UseBackendRoute";
import { passwordType } from "../../utils/types/globalTypes";
import { EyeSvg, EyeOffSvg } from "../../assets/svg/svg";
import { ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";

type EditPasswordModalProps = {
  setDisplayPasswordModal: Dispatch<SetStateAction<boolean>>;
};

const EditPasswordModal: FC<EditPasswordModalProps> = ({
  setDisplayPasswordModal,
}) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [displayPassword, setDisplayPassword] = useState<passwordType>(null);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { apiCall, error, errorMessage } = useBackendRoute();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleDisabledForPassword = () => {
    if (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword === newPassword
    ) {
      return false;
    } else return true;
  };

  return (
    <>
      <ToastContainer />
      <div onClick={() => setDisplayPasswordModal(false)} id="overlay"></div>
      <div id="editPasswordContainer">
        {error && <p id="errorMessage">{errorMessage}</p>}
        <form onSubmit={(e) => updatePassword(e)}>
          <div className="inputContainerEditPassword">
            <p className="inputLabel">Current password</p>
            <div className="inputContainer">
              <input
                required
                type={
                  displayPassword === "currentPassword" ? "text" : "password"
                }
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="***************"
              />
              <span onClick={() => handleDisplayPassword("currentPassword")}>
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
                type={displayPassword === "newPassword" ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="***************"
              />
              <span onClick={() => handleDisplayPassword("newPassword")}>
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
                  displayPassword === "confirmPassword" ? "text" : "password"
                }
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="***************"
              />
              <span onClick={() => handleDisplayPassword("confirmPassword")}>
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
            <button disabled={handleDisabledForPassword()} type="submit">
              {isLoading ? <Loader color="white" /> : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPasswordModal;
