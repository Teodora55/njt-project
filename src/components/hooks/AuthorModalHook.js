import { useState } from "react";

export const useAuthorModal = () => {
  const [author, setAuthor] = useState({
    firstname: "",
    lastname: "",
    yearOfBirth: null,
    yearOfDeath: null,
  });

  const [isAuthorValid, setIsAuthorValid] = useState({
    firstname: true,
    lastname: true,
    yearOfBirth: true,
    yearOfDeath: true,
  });

  const validateInput = () => {
    const nameRegex = /^[a-zA-Z][a-zA-Z '-.]{0,28}[a-zA-Z.]$/;
    const yearOfBirth = parseInt(author.yearOfBirth);
    const yearOfDeath = parseInt(author.yearOfDeath);

    const validAuthor = {
      firstname: nameRegex.test(author.firstname),
      lastname: nameRegex.test(author.lastname),
      yearOfBirth: !isNaN(yearOfBirth) && yearOfBirth < 2020,
      yearOfDeath: isNaN(yearOfDeath) || yearOfDeath < 2050,
    };
    setIsAuthorValid(validAuthor);
    return (
      validAuthor.firstname &&
      validAuthor.lastname &&
      validAuthor.yearOfBirth &&
      validAuthor.yearOfDeath
    );
  };

  const addAuthorHandler = async (onChange) => {
    if (!validateInput()) return;
    const response = await fetch("http://localhost:8080/author", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(author),
      credentials: "include",
    });
    const data = await response.text();
    onChange(data);
  };

  return {
    author,
    setAuthor,
    isAuthorValid,
    validateInput,
    addAuthorHandler,
  };
};