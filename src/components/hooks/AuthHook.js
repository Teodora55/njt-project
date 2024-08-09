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
  const [error, setError] = useState("");
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
      setError("");
      const data = await response.json();
      setUser(data);
      setLogin(true);
      onChangeToBookPage();
    } else if (response.status === 403) {
      setError("Invalid username or password");
    } else if (response.status === 406) {
      setUser({ username: loginData.username });
      onChangeToPaymentPage();
    }
  };

  const handleSubmitRegistration = async (e, onChangeToBookPage) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      registerUser(onChangeToBookPage);
    }
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
      setError("Username is registered");
      const data = await response.json();
      setUser(data);
      setLogin(true);
      onChangeToBookPage();
    } else {
      setError("Username is already used");
      setNewUser((prev) => ({
        ...prev,
        username: "",
      }));
    }
  };

  return {
    loginData,
    newUser,
    error,
    handleLoginChange,
    handleRegistrationChange,
    handleSubmitLogin,
    handleSubmitRegistration,
  };
};
