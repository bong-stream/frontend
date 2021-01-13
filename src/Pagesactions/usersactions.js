import React from "react";
import axios from "axios";
// "http://localhost:3001"
let url = "https://bong-backend.herokuapp.com";
const getUsers = async () => {
  let users;

  users = await axios.get(`${url}/api/users`);
  // users = await axios.get("http://localhost:3001/api/users");
  console.log(users);
  return users.data;
};

const deleteUsers = async (id) => {
  console.log(id);

  const response = await axios({
    method: "DELETE",
    url: `${url}/api/users`,
    // url: "http://localhost:3001/api/users",
    data: {
      id: id,
    },
  });
  console.log(response);
  // const data = await response.data;
  // console.log(data);
};

export { getUsers, deleteUsers };
