import axios from 'axios';
import { API_BASE_URL } from '../Utils/APU_URL';

const getAlbums = async () => {
   let albums;

   // albums = await axios.get("https://bong-backend.herokuapp.com/api/album");
   albums = await axios.get(`${API_BASE_URL}/album`);
   console.log(albums);
   return albums.data;
};

const addAlbums = async (data) => {
   let artists;

   console.log(data);

   // artists = await axios.post(
   //   "https://bong-backend.herokuapp.com/api/album",
   //   data
   // );
   artists = await axios.post(`${API_BASE_URL}/api/album`, data);
   console.log(artists.data);
   return artists.data;
};

const editAlbums = async (data) => {
   let artists;

   console.log(data);

   // artists = await axios.put(
   //   "https://bong-backend.herokuapp.com/api/album",
   //   data
   // );
   artists = await axios.put(`${API_BASE_URL}/album`, data);
   console.log(artists.data);
   return artists.data;
};

const deleteAlbums = async (id) => {
   console.log(id);

   const response = await axios({
      method: 'DELETE',
      // url: "https://bong-backend.herokuapp.com/api/album",
      url: `${API_BASE_URL}/album`,
      data: {
         id: id,
      },
   });
   console.log(response);
   // console.log(artists.data);
   // return artists.data;
};

export { getAlbums, addAlbums, deleteAlbums, editAlbums };
