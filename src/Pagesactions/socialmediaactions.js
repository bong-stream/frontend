import React from "react";
import axios from "axios";
let url = "http://localhost:3001";
// let url = "https://bong-backend.herokuapp.com";

const getSocialmedia = async () => {
  let Socialmedia;

  Socialmedia = await axios.get(`${url}/api/socialmedia`);
  // Socialmedia = await axios.get(`http://localhost:3001/api/`);
  // console.log(Socialmedia);
  return Socialmedia.data;
};

const addSocialmedia = async (data) => {
  let Socialmedia;
  console.log(data);
  Socialmedia = await axios.post(`${url}/api/socialmedia`, data);
  console.log(Socialmedia);
  return Socialmedia.data;
};

const editSocialmedia = async (data) => {
  let Socialmedia;
  Socialmedia = await axios.put(`${url}/api/socialmedia`, data);
  return Socialmedia.data;
};

const deleteSocialmedia = async (id) => {
  let Socialmedia;

  const response = await axios({
    method: `DELETE`,
    url: `${url}/api/socialmedia`,
    data: {
      id: id,
    },
  });
  console.log(response);
  return response.data;
};

export { addSocialmedia, editSocialmedia, deleteSocialmedia, getSocialmedia };
