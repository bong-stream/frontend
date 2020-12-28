import React from "react";
import axios from "axios";

const getSongs = async () => {
  let songs;

  songs = await axios.get("https://bong-backend.herokuapp.com/api/song");
  // songs = await axios.get("http://localhost:3001/api/song");
  console.log(songs);
  return songs.data;
};

const addSongs = async (data) => {
  let artists;

  console.log(data);

  // axios
  //   .post("https://httpbin.org/anything", data)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  // artists = await axios.post(
  //   "https://bong-backend.herokuapp.com/api/song",
  //   data
  // );
  artists = await axios.post("http://localhost:3001/api/song", data);
  console.log(artists.data);
  return artists.data;
};

const editSongs = async (data) => {
  let songs;

  console.log(data);

  // songs = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/album",
  //   data
  // );
  songs = await axios.put("http://localhost:3001/api/song", data);
  console.log(songs.data);
  return songs.data;
};

const deleteSongs = async (id) => {
  console.log(id);

  const response = await axios({
    method: "DELETE",
    // url: "https://bong-backend.herokuapp.com/api/song",
    url: "http://localhost:3001/api/song",
    data: {
      id: id,
    },
  });
  console.log(response);
  console.log(response.data);
  return response.data;
};

const getTrending = async () => {
  let trending;

  trending = await axios.get("http://localhost:3001/api/trending");
  console.log(trending);
  return trending.data;
};

const addTrending = async (data) => {
  // let trending;
  // console.log(data);
  // trending = await axios.post("http://localhost:3001/api/trending", data);
  // console.log(trending.data);
  // return trending.data;
};

const editTrending = async (data) => {
  let trending;
  trending = await axios.put("http://localhost:3001/api/trending", data);
  console.log(trending.data);
  return trending.data;
};

const getPopular = async () => {
  let popular;

  popular = await axios.get("http://localhost:3001/api/popular");
  console.log(popular);
  return popular.data;
};

const addPopular = async (data) => {
  // let popular;
  // console.log(data);
  // popular = await axios.post("http://localhost:3001/api/popular", data);
  // console.log(popular.data);
  // return popular.data;
};

const editPopular = async (data) => {
  let popular;
  popular = await axios.put("http://localhost:3001/api/popular", data);
  console.log(popular.data);
  return popular.data;
};

const getTopcharts = async () => {
  let topchart;

  topchart = await axios.get("http://localhost:3001/api/topcharts");
  console.log(topchart);
  return topchart.data;
};

const editTopcharts = async (data) => {
  let topchart;
  topchart = await axios.put("http://localhost:3001/api/topcharts", data);
  console.log(topchart.data);
  return topchart.data;
};

export {
  addTrending,
  getSongs,
  addSongs,
  editSongs,
  getTrending,
  deleteSongs,
  editTrending,
  editPopular,
  addPopular,
  getPopular,
  getTopcharts,
  editTopcharts,
};
