import React from "react";
import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://bong-backend.herokuapp.com";

const getGenres = async () => {
  let Genres;

  Genres = await axios.get(`${url}/api/genres`);
  // Genres = await axios.get(`http://localhost:3001/api/`);
  // console.log(Genres);
  return Genres.data;
};

const activeGenres = async (active, id) => {
  let Genres;
  let data = { active, id };
  Genres = await axios.put(`${url}/api/genres/activeGenres`, data);
  // console.log(Genres);
  return Genres.data;
};

const addGenres = async (data) => {
  let Genres;
  console.log(data);
  Genres = await axios.post(`${url}/api/genres`, data);
  console.log(Genres);
  return Genres.data;
};

const editGenres = async (data) => {
  let Genres;
  Genres = await axios.put(`${url}/api/genres`, data);
  return Genres.data;
};

const deleteGenres = async (id) => {
  let Genres;

  const response = await axios({
    method: `DELETE`,
    url: `${url}/api/genres`,
    data: {
      id: id,
    },
  });
  console.log(response);
  return response.data;
};

export { getGenres, addGenres, deleteGenres, editGenres, activeGenres };
