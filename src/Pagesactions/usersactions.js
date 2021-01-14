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

export const sendOtpMobile = async (obj) => {
   axios
      .post(`${API_BASE_ORIGIN}/sendotp`, obj)
      .then((response) => {
         console.log(response.data);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};

export const sendOtpEmail = async (obj) => {
   console.log('obj.user.email', obj.user.email);
   axios
      .post(`${API_BASE_ORIGIN}/sendemailotp`, {
         email: obj.user.email,
      })
      .then((response) => {
         console.log(response.data);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};

export const verifyOtp = async (obj, history) => {
   axios
      .post(`${API_BASE_ORIGIN}/verify`, obj)
      .then((response) => {
         console.log(response);
         history.push({
            pathname: '/client/detailSignup',
            data: history.location.data,
         });
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};
export const verifyEmailOtp = async (options, history) => {
   (async () => {
      axios
         .post(`${API_BASE_ORIGIN}/verifyemailotp`, {
            email: options.email,
            otp: options.otp,
         })
         .then((response) => {
            console.log(response);
            console.log('haha');
            if (response.data.success === true) {
               history.push({
                  pathname: '/client/detailSignup',
                  data: history.location.data,
               });
            } else {
               alert(response.data.message);
            }
         })
         .catch((err) => {
            alert('error while sending otp', err);
         });
   })();
};

export const signUp = async (obj, history) => {
   const email = history.location.data.user.email;
   const number = history.location.data.number;
   axios
      .post(`${API_BASE_ORIGIN}/signup`, {
         email: email,
         number: number,
         ...obj,
      })
      .then((response) => {
         console.log(response);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};

export const signIn = async (obj) => {
   axios
      .post(`${API_BASE_ORIGIN}/signin`, obj)
      .then((response) => {
         console.log(response);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};

export { getUsers, deleteUsers };
