import React from "react";
import axios from "axios";
let url = "http://localhost:3001";
// let url = "https://bong-backend.herokuapp.com";

const getArtists = async () => {
  let artists;

  artists = await axios.get(`${url}/api/artist`);
  // artists = await axios.get(`http://localhost:3001/api/artist`);
  // console.log(artists);
  return artists.data;
};

const findArtist = async (id) => {
  let artist;

  artist = await axios.get(`${url}/api/artist/${id}`);
  // artists = await axios.get(`http://localhost:3001/api/artist`);
  // console.log(artist);
  return artist.data;
};

const activeArtists = async (active, id) => {
  let artists;
  let data = { active, id };
  artists = await axios.put(`${url}/api/artist/activeartists`, data);
  // console.log(artists);
  return artists.data;
};

const addArtists = async (data, albums, songs) => {
  let artists;
  // console.log(data, albums, songs);
  let artistsData = {
    data,
    albums,
    songs,
  };

  artists = await axios.post(`${url}/api/artist`, artistsData);
  // artists = await axios.post(`http://localhost:3001/api/artist`, artistsData);
  // console.log(artists.data);
  return artists.data;
};

const editArtists = async (data) => {
  let artists;

  // console.log(data);

  artists = await axios.put(`${url}/api/artist`, data);
  // artists = await axios.put(`http://localhost:3001/api/artist`, data);
  // console.log(artists.data);
  return artists.data;
};

const deleteArtists = async (id) => {
  let artists;

  // console.log(id);

  const response = await axios({
    method: `DELETE`,
    url: `${url}/api/artist`,
    // url: "http://localhost:3001/api/artist",
    data: {
      id: id,
    },
  });
  // console.log(response);
  // console.log(artists.data);
  // return artists.data;
};

export {
  getArtists,
  addArtists,
  deleteArtists,
  editArtists,
  findArtist,
  activeArtists,
};
