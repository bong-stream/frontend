import React from "react";
import axios from "axios";
// "http://localhost:3001"
let url = "https://bong-backend.herokuapp.com";

const getSongs = async () => {
  let songs;

  // songs = await axios.get("https://bong-backend.herokuapp.com/api/song");
  songs = await axios.get(`${url}/api/song`);
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
  artists = await axios.post(`${url}/api/song`, data);
  console.log(artists.data);
  return artists.data;
};

const editSongs = async (data) => {
  let songs;

  console.log(data);

  // songs = await axios.put("https://bong-backend.herokuapp.com/api/song", data);
  songs = await axios.put(`${url}/api/song`, data);
  console.log(songs.data);
  return songs.data;
};

const deleteSongs = async (id) => {
  console.log(id);

  const response = await axios({
    method: "DELETE",
    // url: "https://bong-backend.herokuapp.com/api/song",
    url: `${url}/api/song`,
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

  // trending = await axios.get("https://bong-backend.herokuapp.com/api/trending");
  trending = await axios.get(`${url}/api/trending`);
  console.log(trending);
  return trending.data;
};

const addTrending = async (data) => {
  // let trending;
  // console.log(data);
  // trending = await axios.post(
  //   "https://bong-backend.herokuapp.com/api/trending"
  // );
  // trending = await axios.post("http://localhost:3001/api/trending", data);
  // console.log(trending.data);
  // return trending.data;
};

const editTrending = async (data) => {
  let trending;
  // trending = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/trending",
  //   data
  // );
  console.log(data);

  trending = await axios.put(`${url}/api/trending`, data);
  console.log(trending.data);
  return trending.data;
};

const getPopular = async () => {
  let popular;
  //
  // popular = await axios.get("https://bong-backend.herokuapp.com/api/popular");
  popular = await axios.get(`${url}/api/popular`);
  console.log(popular);
  return popular.data;
};

const addPopular = async (data) => {
  // let popular;
  // console.log(data);
  // popular = await axios.get("https://bong-backend.herokuapp.com/api/popular");
  // popular = await axios.post("http://localhost:3001/api/popular", data);
  // console.log(popular.data);
  // return popular.data;
};

const editPopular = async (data) => {
  let popular;
  // popular = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/popular",
  //   data
  // );
  popular = await axios.put(`${url}/api/popular`, data);
  console.log(popular.data);
  return popular.data;
};

const getTopcharts = async () => {
  let topchart;

  topchart = await axios.get(`${url}/api/topcharts`);
  // topchart = await axios.get(
  //   "https://bong-backend.herokuapp.com/api/topcharts"
  // );
  console.log(topchart);
  return topchart.data;
};

const editTopcharts = async (data) => {
  console.log(data);
  let topchart;
  // topchart = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/topcharts",
  //   data
  // );
  topchart = await axios.put(`${url}/api/topcharts`, data);
  console.log(topchart.data);
  return topchart.data;
};

const getBongplaylist = async () => {
  let Bongplaylist;

  // Bongplaylist = await axios.get(
  //   "https://bong-backend.herokuapp.com/api/bongplaylist"
  // );
  Bongplaylist = await axios.get(`${url}/api/bongplaylist`);
  console.log(Bongplaylist);
  return Bongplaylist.data;
};

const editBongplaylist = async (data) => {
  let Bongplaylist;
  // Bongplaylist = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/bongplaylist",
  //   data
  // );
  Bongplaylist = await axios.put(`${url}/api/bongplaylist`, data);
  console.log(Bongplaylist.data);
  return Bongplaylist.data;
};

const getRecommended = async () => {
  let Recommended;

  // Recommended = await axios.get(
  //   "https://bong-backend.herokuapp.com/api/recommended"
  // );
  Recommended = await axios.get(`${url}/api/recommended`);
  console.log(Recommended);
  return Recommended.data;
};

const editRecommended = async (data) => {
  let Recommended;
  // Recommended = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/recommended",
  //   data
  // );
  console.log(data);
  Recommended = await axios.put(`${url}/api/recommended`, data);
  // console.log(Recommended.data);
  // return Recommended.data;
};

const getTopalbums = async () => {
  let Topalbums;

  // Topalbums = await axios.get(
  //   "https://bong-backend.herokuapp.com/api/topalbums"
  // );
  Topalbums = await axios.get(`${url}/api/topalbums`);
  console.log(Topalbums);
  return Topalbums.data;
};

const editTopalbums = async (data) => {
  let Topalbums;
  // Topalbums = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/Topalbums",
  //   data
  // );
  Topalbums = await axios.put(`${url}/api/Topalbums`, data);
  console.log(Topalbums.data);
  return Topalbums.data;
};

const getTopartists = async () => {
  let Topartists;

  // Topartists = await axios.get(
  //   "https://bong-backend.herokuapp.com/api/topartists"
  // );
  Topartists = await axios.get(`${url}/api/topartists`);
  console.log(Topartists);
  return Topartists.data;
};

const editTopartists = async (data) => {
  let Topartists;
  // Topartists = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/Topartists",
  //   data
  // );
  Topartists = await axios.put(`${url}/api/Topartists`, data);
  console.log(Topartists.data);
  return Topartists.data;
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
  getBongplaylist,
  editBongplaylist,
  getRecommended,
  editRecommended,
  getTopalbums,
  editTopalbums,
  getTopartists,
  editTopartists,
};
