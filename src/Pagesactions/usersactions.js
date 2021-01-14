import axios from 'axios';
import { API_BASE_ORIGIN, API_BASE_URL } from '../Utils/APU_URL';

import makeToast from '../Utils/makeToast';

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

export const sendOtpMobile = async (obj, history) => {
   axios
      .post(`${API_BASE_ORIGIN}/sendotp`, obj)
      .then((response) => {
         console.log(response.data);
         console.log('response.data.success', response.data.success);
         if (response.data.success === true) {
            console.log('pushing');
            history.push({
               pathname: '/client/verification',
               data: obj,
            });
         } else {
            makeToast('error', response.data.message);
         }
      })
      .catch((err) => {
         makeToast('error', 'Something Went Wrong');
      });
};

export const sendOtpEmail = async (obj, history) => {
   console.log('obj.user.email', obj.user.email);
   axios
      .post(`${API_BASE_ORIGIN}/sendemailotp`, {
         email: obj.user.email,
      })
      .then((response) => {
         console.log(response.data);
         if (response.data.success === true) {
            history.push({
               pathname: '/client/verification',
               data: obj,
            });
         } else {
            // alert(response.data.message);
            makeToast('error', response.data.message);
         }
      })
      .catch((err) => {
         // alert('error while sending otp', err);
         makeToast('error', 'Something Went Wrongs');
      });
};

export const verifyOtp = async (obj, history) => {
   axios
      .post(`${API_BASE_ORIGIN}/verify`, obj)
      .then((response) => {
         console.log(response);
         if (response.data.message === 'otp_verified') {
            history.push({
               pathname: '/client/detailSignup',
               data: history.location.data,
            });
         } else {
            makeToast('error', 'Wrong OTP');
         }
      })
      .catch((err) => {
         makeToast('error', 'Wrong OTP');
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
               makeToast('error', 'Wrong OTP');
            }
         })
         .catch((err) => {
            makeToast('error', 'Wrong OTP ');
         });
   })();
};

export const signUp = async (obj, history, changeToken) => {
   let email = history.location.data.user.email;
   const number = history.location.data.number;
   if (email) {
      email = email.toLowerCase();
   }
   axios
      .post(`${API_BASE_ORIGIN}/signup`, {
         email: email,
         number: number,
         ...obj,
      })
      .then((response) => {
         console.log(response);
         makeToast(
            'success',
            'Signed Up Successfully ! Redirecting ...'
         );

         changeToken(response.data.token);
      })
      .catch((err) => {
         alert('error while sending otp', err);
      });
};

export const signIn = async ({ user }) => {
   console.clear();
   console.log('user', user);
   axios
      .post(`${API_BASE_ORIGIN}/signin`, {
         email: user.email,
         password: user.password,
         number: user.number,
      })
      .then((response) => {
         console.log(response);
         makeToast(
            'success',
            'Logged In Successfully ! Redirecting...'
         );

         if (response.data.token) {
            localStorage.setItem('boongToken', response.data.token);
         }
         window.location.reload();
      })
      .catch((err) => {
         // alert ('error while sending otp', err);
         // toast.error('Email and Password NOT Matched', {
         //    position: 'top-right',
         //    autoClose: 5000,
         //    hideProgressBar: false,
         //    closeOnClick: true,
         //    pauseOnHover: true,
         //    draggable: true,
         //    progress: undefined,
         // });
         makeToast('error', 'Email and Password NOT matched');
      });
};

export { getUsers, deleteUsers };
