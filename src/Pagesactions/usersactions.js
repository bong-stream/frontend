import axios from 'axios';
import { API_BASE_ORIGIN, API_BASE_URL } from '../Utils/APU_URL';

const getUsers = async () => {
   let users;

   // users = await axios.get("https://bong-backend.herokuapp.com/api/users");
   users = await axios.get(`${API_BASE_URL}/users`);
   console.log(users);
   return users.data;
};

const deleteUsers = async (id) => {
   console.log(id);

   const response = await axios({
      method: 'DELETE',
      // url: "https://bong-backend.herokuapp.com/api/users",
      url: `${API_BASE_URL}/users`,
      data: {
         id: id,
      },
   });
   console.log(response);
   // const data = await response.data;
   // console.log(data);
};

export const sendOtp = async (obj) => {
   axios
      .post(`${API_BASE_ORIGIN}/sendotp`, obj)
      .then((response) => {
         console.log(response.data);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};
export const verifyOtp = async (obj) => {
   axios
      .post(`${API_BASE_ORIGIN}/verify`, obj)
      .then((response) => {
         console.log(response);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};
export const signUp = async (obj) => {
   axios
      .post(`${API_BASE_ORIGIN}/signup`, obj)
      .then((response) => {
         console.log(response);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};

export { getUsers, deleteUsers };
