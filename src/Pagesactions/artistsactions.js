import axios from 'axios';
import { API_BASE_URL } from '../Utils/APU_URL';

const getArtists = async () => {
   let artists;

   // artists = await axios.get("https://bong-backend.herokuapp.com/api/artist");
   artists = await axios.get(`${API_BASE_URL}/artist`);
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
   artists = await axios.post(`${API_BASE_URL}/artist`, artistsData);
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
   artists = await axios.put(`${API_BASE_URL}/artist`, data);
   console.log(artists.data);
   return artists.data;
};

const deleteArtists = async (id) => {
   let artists;

   console.log(id);

   const response = await axios({
      method: 'DELETE',
      // url: "https://bong-backend.herokuapp.com/api/artist",
      url: `${API_BASE_URL}/artist`,
      data: {
         id: id,
      },
   });
   console.log(response);
   // console.log(artists.data);
   // return artists.data;
};

export { getArtists, addArtists, deleteArtists, editArtists };
