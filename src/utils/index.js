import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
