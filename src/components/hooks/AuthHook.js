import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useFetchData } from "./FetchDataHook";

export const useAuth = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    jmbg: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [changePage, setChangePage] = useState(() => () => {});
  const [isValidInput, setIsValidInput] = useState({
    firstname: true,
    lastname: true,
    jmbg: true,
    email: true,
    username: true,
    password: true,
    confirmPassword: true,
  });
  const { setUser, setLogin } = useContext(UserContext);

  const { fetchData } = useFetchData();

  const userValidatonRegex = {
    firstname: /^[a-zA-Z][a-zA-Z '-]{0,28}[a-zA-Z]$/,
    lastname: /^[a-zA-Z][a-zA-Z '-]{0,28}[a-zA-Z]$/,
    jmbg: /^\d{13}$/,
    email: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    username: /^[a-zA-Z0-9]{5,20}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (
    e,
    onChangeToBookPage,
    onChangeToPaymentPage
  ) => {
    e.preventDefault();
    const message = validateLoginInput();
    if (message !== "") {
      handleOpenMessageModal(message);
    } else {
      const url = new URL("http://localhost:8080/login/");
      const response = await fetchData({
        url: url,
        method: "POST",
        body: loginData,
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setLogin(true);
        onChangeToBookPage();
      } else if (response.status === 406) {
        setUser({ username: loginData.username });
        setChangePage(() => onChangeToPaymentPage);
        handleOpenMessageModal(
          "Your membership is expired! Please pay membership before you continue!"
        );
      } else {
        handleOpenMessageModal("Invalid username or password");
      }
    }
  };

  const validateLoginInput = () => {
    let message = "";
    const validLoginUser = {
      username: true,
      password: true,
    };
    Object.keys(loginData).forEach((key) => {
      validLoginUser[key] = validateInput(
        loginData[key],
        userValidatonRegex[key]
      );
      if (!validLoginUser[key]) message += `${key} is not valid; `;
    });
    setIsValidInput((prev) => ({
      ...prev,
      username: validLoginUser.username,
      password: validLoginUser.password,
    }));
    return message;
  };

  const handleSubmitRegistration = async (e, onChangeToBookPage) => {
    e.preventDefault();
    const message = validateRegistrationInput();
    if (message !== "") {
      handleOpenMessageModal(message);
    } else if (newUser.password !== newUser.confirmPassword) {
      setIsValidInput((prev) => ({
        ...prev,
        confirmPassword: false,
      }));
      handleOpenMessageModal("Passwords do not match!");
    } else {
      registerUser(onChangeToBookPage);
    }
  };

  const validateRegistrationInput = () => {
    let message = "";
    const validNewUser = {
      firstname: true,
      lastname: true,
      jmbg: true,
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
    };
    Object.keys(newUser).forEach((key) => {
      if (key === "confirmPassword") return;
      validNewUser[key] = validateInput(newUser[key], userValidatonRegex[key]);
      if (!validNewUser[key]) message += `${key} is not valid; `;
    });
    setIsValidInput(validNewUser);
    return message;
  };

  const registerUser = async (onChangeToBookPage) => {
    const url = new URL("http://localhost:8080/login/register");
    const response = await fetchData({
      url: url,
      method: "POST",
      body: newUser,
    });
    if (response.ok) {
      handleOpenMessageModal("Username is registered");
      const data = await response.json();
      setUser(data);
      setLogin(true);
      onChangeToBookPage();
    } else if (response.status === 409) {
      handleOpenMessageModal("Username is already used!");
      setNewUser((prev) => ({
        ...prev,
        username: "",
      }));
    } else {
      handleOpenMessageModal("Username or password is not valid!");
      setNewUser((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        username: "",
      }));
    }
  };

  const handleOpenMessageModal = (message) => {
    setShowMessageModal(true);
    setModalMessage(message);
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    changePage();
  };

  const validateInput = (input, regex) => {
    return regex.test(input);
  };

  return {
    loginData,
    newUser,
    showMessageModal,
    modalMessage,
    isValidInput,
    handleCloseMessageModal,
    handleLoginChange,
    handleRegistrationChange,
    handleSubmitLogin,
    handleSubmitRegistration,
  };
};
