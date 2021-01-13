import React from "react";
import axios from "axios";

const getUsers = async () => {
  let users;

  // users = await axios.get("https://bong-backend.herokuapp.com/api/users");
  users = await axios.get("http://localhost:3001/api/users");
  console.log(users);
  return users.data;
};

const deleteUsers = async (id) => {
  console.log(id);

  const response = await axios({
    method: "DELETE",
    // url: "https://bong-backend.herokuapp.com/api/users",
    url: "http://localhost:3001/api/users",
    data: {
      id: id,
    },
  });
  console.log(response);
  // const data = await response.data;
  // console.log(data);
};

export const sendOtp = async (obj) => {
  axios
    .post("https://bong-backend.herokuapp.com/sendotp", obj)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      alert("error while sending otp", err);
    });
};
export const verifyOtp = async (obj) => {
  axios
    .post("https://bong-backend.herokuapp.com/verify", obj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      alert("error while sending otp", err);
    });
};
export const signUp = async (obj) => {
  axios
    .post("https://bong-backend.herokuapp.com/signup", obj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      alert("error while sending otp", err);
    });
};

export { getUsers, deleteUsers };
