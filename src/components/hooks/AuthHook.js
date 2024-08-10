import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const AuthHook = () => {
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
    if (validateLoginInput()) {
      handleOpenMessageModal("Invalid username or password");
    } else {
      const url = new URL("http://localhost:8080/login/");
      const response = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(loginData),
        credentials: "include",
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
    const usernameValid = validateInput(
      loginData.username,
      /^[a-zA-Z0-9]{5,20}$/
    );
    const passwordValid = validateInput(
      loginData.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    setIsValidInput((prev) => ({
      ...prev,
      username: usernameValid,
      password: passwordValid,
    }));
    return !usernameValid || !passwordValid;
  };

  const handleSubmitRegistration = async (e, onChangeToBookPage) => {
    e.preventDefault();
    if (validateRegistrationInput()) {
      handleOpenMessageModal("Invalid input");
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
    const validNewUser = {
      firstname: validateInput(
        newUser.firstname,
        /^[a-zA-Z][a-zA-Z '-]{0,28}[a-zA-Z]$/
      ),
      lastname: validateInput(
        newUser.lastname,
        /^[a-zA-Z][a-zA-Z '-]{0,28}[a-zA-Z]$/
      ),
      jmbg: validateInput(newUser.jmbg, /^\d{13}$/),
      email: validateInput(
        newUser.email,
        /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      ),
      username: validateInput(newUser.username, /^[a-zA-Z0-9]{5,20}$/),
      password: validateInput(
        newUser.password,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
      confirmPassword: true,
    };
    setIsValidInput(validNewUser);
    return (
      !validNewUser.firstname ||
      !validNewUser.lastname ||
      !validNewUser.jmbg ||
      !validNewUser.email ||
      !validNewUser.username ||
      !validNewUser.password
    );
  };

  const registerUser = async (onChangeToBookPage) => {
    const url = new URL("http://localhost:8080/login/register");
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(newUser),
      credentials: "include",
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
