import React from 'react';
import {
   Button,
   TextField,
   Typography,
   Grid,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logo from '../../../src/assets/logo.png';
import {
   verifyOtp,
   verifyEmailOtp,
} from '../../Pagesactions/usersactions';

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#ffffff',
      padding: theme.spacing(2),
      width: '100%',
   },
   textfield: {
      width: '90%',
   },
   logo: {
      width: 100,
      height: 60,
      objectFit: 'contain',
   },
}));

function ResetLogin(props) {
   const classes = useStyles();
   const theme = useTheme();
   const [otp, setOtp] = React.useState('');
   //   const createAccount = window.location.href.includes("reset");
   console.log(('props:', props));

   const handleChangeOtp = (e) => {
      setOtp(e.target.value);
   };

   const handleOtp = (e, otp) => {
      e.preventDefault();
      // props.history.push("/client/detailSignup");
      const { phoneNumber } = props.history.location.data;
      console.log('nmbr', phoneNumber);
      const obj = {
         otp,
         phoneNumber,
      };

      let result;
      if (phoneNumber) {
         // * Verify Phone OTP
         result = verifyOtp(obj, props.history);
      } else {
         // * Verify Email OTP
         const email = props.history.location.data.user.email;
         result = verifyEmailOtp({ email, otp }, props.history);
      }
      console.log('result', result);
      // if (result) {
      //    props.history.push({
      //       pathname: '/client/detailSignup',
      //       data: props.history.location.data,
      //    });
      // } else {
      //    alert('please input valid otp code');
      // }
   };

   const isPhone =
      props.history &&
      props.history.location &&
      props.history.location.data &&
      props.history.location.data.phoneNumber &&
      props.history.location.data.phoneNumber.length > 0;

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            margin: window.screen.width >= 768 ? 'auto' : 'auto',
            width: window.screen.width >= 768 ? '70%' : '90%',
         }}
      >
         <Grid
            container
            direction='column'
            justify='center'
            // alignItems="stretch"
            style={{
               backgroundColor: '#ffffff',
               borderRadius: 10,
               marginTop: theme.spacing(12),

               width: window.screen.width >= 768 ? '70%' : '90%',
            }}
         >
            <Grid item>
               <img src={logo} alt='logo' className={classes.logo} />
               {window.location.href.includes('reset') ? (
                  <Typography
                     variant='h6'
                     style={{ color: '#1b3863', fontWeight: 400 }}
                  >
                     Reset Login Password
                  </Typography>
               ) : (
                  <Typography
                     variant='h6'
                     style={{ color: '#1b3863', fontWeight: 400 }}
                  >
                     Security verification
                  </Typography>
               )}

               {window.location.href.includes('reset') ? (
                  <Typography variant='body2' color='secondary'>
                     Welcome On board !
                  </Typography>
               ) : (
                  <Typography
                     variant='body2'
                     variant='body2'
                     style={{ color: 'black', paddingTop: 10 }}
                  >
                     To ensure your account , please complete the
                     following verifications
                  </Typography>
               )}
            </Grid>
            <Grid item>
               <div
                  style={{
                     display: 'block',
                     marginTop: theme.spacing(4),
                     paddingBottom: '20%',
                  }}
               >
                  <form>
                     {window.location.href.includes('reset') ? (
                        <TextField
                           name='email'
                           label='Enter account detail to reset password'
                           value={'value'}
                           className={classes.textfield}
                           //   onChange={handleChange}
                        />
                     ) : (
                        <>
                           <TextField
                              name='otp'
                              label='Enter OTP'
                              value={otp}
                              className={classes.textfield}
                              onChange={handleChangeOtp}
                           />
                           <Typography
                              variant='body2'
                              style={{
                                 color: '#ccc',
                                 paddingTop: 10,
                              }}
                           >
                              Enter code sent to your
                              {isPhone ? ' PhoneNumber ' : ' Email '}
                              {isPhone
                                 ? props.history.location.data
                                      .phoneNumber
                                 : props.history.location.data.user
                                      .email}
                           </Typography>
                        </>
                     )}
                     {window.location.href.includes('reset') ? (
                        <Button
                           type='submit'
                           variant='contained'
                           color='secondary'
                           style={{
                              borderRadius: 20,
                              width: '50%',
                              marginTop: '4%',
                           }}
                           //   onClick={handleSubmit}
                        >
                           Next
                        </Button>
                     ) : (
                        <Button
                           type='submit'
                           variant='contained'
                           color='secondary'
                           style={{
                              borderRadius: 20,
                              width: '50%',
                              marginTop: '4%',
                           }}
                           onClick={(e) => handleOtp(e, otp)}
                        >
                           Submit
                        </Button>
                     )}
                  </form>
               </div>
            </Grid>
            <Typography
               style={{
                  fontSize: 12,
                  color: '#ccc',
                  marginTop: 10,
               }}
            >
               2020 bong.com , all right reserved
            </Typography>
         </Grid>
      </div>
   );
}

export default withRouter(ResetLogin);
