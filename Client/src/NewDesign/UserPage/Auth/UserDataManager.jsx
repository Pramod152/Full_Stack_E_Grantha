import React from "react";

  export const saveUserData = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
  };

  export const clearUserData = () => {
    localStorage.removeItem("userData");
  };

  export const getUserData = () => {
    return JSON.parse(localStorage.getItem("userData"));
  };
