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
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { themeColor }: any = useContext(ThemeContext);

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const headers = {
    authorization: `Bearer ${Cookies.get("accessToken")}`,
  };

  const apiCall = async (
    functionName:
      | registerRelatedTypes
      | pomodoroRelatedTypes
      | accountRelatedTypes,
    data?: any,
    onSuccess?: (params?: any) => void, // callback function used to execute code in the calling file if response is success
    params?: any
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
            .post(`${apiBaseUrl}/users/login`, data)
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
              console.log(error.response);

              setErrorMessage(error.response.data.msg);
            });
        }
        break;
      case "updateTimeSpend":
        {
          await axios
            .put(`${apiBaseUrl}/users/user/timespend`, data, {
              headers,
            })
            .then((res) => {
              console.log(res.data, "total time spend response");
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
              return console.error(error);
            });
        }
        break;
      case "updatePomodoroDoneAndTimeSpend":
        {
          await axios
            .put(`${apiBaseUrl}/tasks/updatePomodoroDoneAndTimeSpend`, data, {
              headers,
            })
            .then((res) => {
              console.log(res.data, "task time spend response");
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
              return console.error(error);
            });
        }
        break;
      case "updateTaskTimeSpend":
        {
          await axios
            .put(`${apiBaseUrl}/tasks/updateTimeSpend`, data, {
              headers,
            })
            .then((res) => {
              console.log(res.data, "task time spend response");
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
              return console.error(error);
            });
        }
        break;
      case "createTask":
        {
          await axios
            .post(`${apiBaseUrl}/tasks/`, data, {
              headers: {
                authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
            })
            .then((res) => {
              const data = res.data;
              console.log(res.data, "create task response");
              const localUserData = localStorage.getItem("userData");
              const userDataObject = JSON.parse(localUserData || "{}");
              const tasksArray = userDataObject.tasks || [];
              const newAtasksArray = [...tasksArray, data];
              // Met à jour la propriété "tasks"
              userDataObject.tasks = newAtasksArray;
              const newUserDataString = JSON.stringify(userDataObject);
              // Met à jour le contenu du localStorage
              localStorage.setItem("userData", newUserDataString);

              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      case "editTask":
        {
          await axios
            .put(`${apiBaseUrl}/tasks/`, data, { headers })
            .then(() => {
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
              return console.error(error);
            });
        }
        break;
      case "giveUpTask":
        {
          await axios
            .put(`${apiBaseUrl}/tasks/`, data, { headers })
            .then(() => {
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
              return console.error(error);
            });
        }
        break;
      case "deleteTask":
        {
          await axios
            .delete(`${apiBaseUrl}/tasks/${params}`, { headers })
            .then(() => {
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      case "taskDone":
        {
          await axios
            .put(`${apiBaseUrl}/tasks/`, data, { headers })
            .then((res) => {
              console.log(res.data, "res");
              if (onSuccess) {
                onSuccess();
              }
            })
            .catch((error) => {
              return console.error(error);
            });
        }
        break;
      case "updatePassword":
        {
          await axios
            .put(`${apiBaseUrl}/users/user/updatepassword`, data, {
              headers,
            })
            .then(() => {
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
            .then(() => {
              setError(false);
              setErrorMessage(null);
              userDataObject.user.name = data.name;
              userDataObject.user.email = data.email;
              localStorage.setItem("userData", JSON.stringify(userDataObject));
              toast("informations modified successfully.", {
                position: "top-right",
                theme: themeColor === "light" ? "light" : "dark",
              });
            })
            .catch((error) => {
              setError(true);
              setErrorMessage(error.response.data.error);
              console.error(error);
            });
        }
        break;
      case "updateProfilePicture":
        {
          await axios
            .post(`${apiBaseUrl}/users/upload`, data, {
              headers,
            })
            .then((res) => {
              setError(false);
              setErrorMessage(null);
              res.data.data;
              userDataObject.user.profilePicture = res.data.data.profilePicture;
              localStorage.setItem("userData", JSON.stringify(userDataObject));
              if (onSuccess) {
                onSuccess(res.data.data.profilePicture);
              }
              toast("profile picture updated successfully.", {
                position: "top-right",
                theme: themeColor === "light" ? "light" : "dark",
              });
            })
            .catch((error) => {
              setError(true);
              setErrorMessage(error.response.data.error);
              console.error(error);
            });
        }
        break;
      case "deleteUser":
        {
          await axios
            .delete(`${apiBaseUrl}/users/user`, {
              headers,
            })
            .then(() => {
              setError(false);
              setErrorMessage(null);
              Cookies.remove("accessToken");
              window.localStorage.removeItem("userData");

              if (onSuccess) {
                onSuccess();
              }
              toast("Account Deleted.", {
                position: "top-right",
                theme: themeColor === "light" ? "light" : "dark",
              });
            })
            .catch((error) => {
              toast("Something went wrong", {
                position: "top-right",
                theme: themeColor === "light" ? "light" : "dark",
              });
              setError(true);
              setErrorMessage(error.response.data.error);
              console.error(error);
            });
        }
        break;
      default:
        break;
    }
  };
  return { apiCall, error, errorMessage };
};
