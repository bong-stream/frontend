import React from "react";
import axios from "axios";

const getArtists = async () => {
  let artists;

  // artists = await axios.get("https://bong-backend.herokuapp.com/api/artist");
  artists = await axios.get("http://localhost:3001/api/artist");
  console.log(artists);
  return artists.data;
};

const addArtists = async (data, albums, songs) => {
  let artists;
  console.log(data, albums, songs);
  let artistsData = {
    data,
    albums,
    songs,
  };

  // artists = await axios.post(
  //   "https://bong-backend.herokuapp.com/api/artist",
  //   artistsData
  // );
  artists = await axios.post("http://localhost:3001/api/artist", artistsData);
  console.log(artists.data);
  return artists.data;
};

const editArtists = async (data) => {
  let artists;

  console.log(data);

  // artists = await axios.put(
  //   "https://bong-backend.herokuapp.com/api/artist",
  //   data
  // );
  artists = await axios.put("http://localhost:3001/api/artist", data);
  console.log(artists.data);
  return artists.data;
};

const deleteArtists = async (id) => {
  let artists;

  console.log(id);

  const response = await axios({
    method: "DELETE",
    // url: "https://bong-backend.herokuapp.com/api/artist",
    url: "http://localhost:3001/api/artist",
    data: {
      id: id,
    },
  });
  console.log(response);
  // console.log(artists.data);
  // return artists.data;
};

export { getArtists, addArtists, deleteArtists, editArtists };
