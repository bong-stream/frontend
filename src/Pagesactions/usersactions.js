import React from "react";
import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://bong-backend.herokuapp.com";

const getUsers = async () => {
  let users;

  users = await axios.get(`${url}/api/users`);
  // console.log(users);
  return users.data;
};
const addUsers = async (data) => {
  let users;

  users = await axios.post(`${url}/api/users/adduser`, data);
  // console.log(users);
  return users.data;
};

const editUsers = async (data) => {
  let users;

  users = await axios.put(`${url}/api/users/`, data);
  // console.log(users);
  return users.data;
};

const activeUsers = async (active, id) => {
  let users;
  let data = { active, id };
  users = await axios.put(`${url}/api/users/activeusers`, data);
  // console.log(users);
  return users.data;
};

const deleteUsers = async (id) => {
  // console.log(id);

  const response = await axios({
    method: "DELETE",
    url: `${url}/api/users`,
    data: {
      id: id,
    },
  });
  // console.log(response);
  // const data = await response.data;
  // console.log(data);
};

export { getUsers, deleteUsers, addUsers, editUsers, activeUsers };
