import { useContext, useState } from "react";
import {
  registerRelatedTypes,
  pomodoroRelatedTypes,
  accountRelatedTypes,
} from "../utils/types/useBackendRouteTypes";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/MyProviders";
import axios from "axios";

export const useBackendRoute = () => {
  const localUserData = localStorage.getItem("userData");
  const userDataObject = JSON.parse(localUserData || "{}");
  const [responseData, setReponseData] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { themeColor } = useContext(ThemeContext);

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const headers = {
    authorization: `Bearer ${Cookies.get("accessToken")}`,
  };

  const apiCall = async (
    functionName:
      | registerRelatedTypes
      | pomodoroRelatedTypes
      | accountRelatedTypes,
    data: any,
    onSuccess?: () => void // callback function used to execute code in the calling file if response is success
  ) => {
    switch (functionName) {
      case "signUp":
        {
          await axios
            .post(`${apiBaseUrl}/users/signup`, data)
            .then(() => {
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
              setError(true);
              setErrorMessage(error.response.data.error);
              console.error(error.response.data.error);
            });
        }
        break;
      case "signIn":
        {
          if (error) {
            setError(false);
          }
          await axios
            .post(`${apiBaseUrl}/api/users/login`, data)
            .then((res) => {
              const token = res.data.token;
              Cookies.set("accessToken", token, { expires: 7 });

              const dataToLocalStorage = {
                user: res.data.data.user,
                tasks: res.data.data.tasks,
              };
              localStorage.setItem(
                "userData",
                JSON.stringify(dataToLocalStorage)
              );
            })
            .then(() => {
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch(function (error) {
              setError(true);
              setErrorMessage(error.response.data.msg);
            });
        }
        break;
      case "updatePomodoroDoneAndTimeSpend":
        break;
      case "updateTimeSpend":
        break;
      case "createTask":
        break;
      case "editTask":
        break;
      case "giveUpTask":
        break;
      case "deleteTask":
        break;
      case "taskDone":
        break;
      case "updatePassword":
        {
          await axios
            .put(`${apiBaseUrl}/users/user/updatepassword`, data, {
              headers,
            })
            .then((res) => {
              setError(false);
              setErrorMessage(null);

              if (onSuccess) {
                onSuccess(); // Appel de la fonction de rappel onSuccess
              }

              toast("password successfully modified.", {
                position: "top-right",
                theme: themeColor === "light" ? "light" : "dark",
              });
            })

            .catch((error) => {
              setError(true);
              setErrorMessage(error.response.data.error);
              console.error(error.response.data.error);
            });
        }
        break;
      case "updateUserInformations":
        {
          await axios
            .put(`${apiBaseUrl}/users/user`, data, {
              headers,
            })
            .then((res) => {
              setError(false);
              setErrorMessage(null);
              userDataObject.user.name = data.name;
              userDataObject.user.email = data.email;
              localStorage.setItem("userData", JSON.stringify(userDataObject));
              toast("informations successfully modified.", {
                position: "top-right",
                theme: themeColor === "light" ? "light" : "dark",
              });
            })
            .catch((error) => {
              setError(true);
              setErrorMessage(error);
              console.error(error);
            });
        }
        break;
      default:
        break;
    }
  };
  return { apiCall, responseData, error, errorMessage };
};