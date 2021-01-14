import {
   AppBar,
   Box,
   Grid,
   Tab,
   Tabs,
   Typography,
   IconButton,
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../../src/assets/logo.png';
import Form from './Form';
import {
   sendOtpEmail,
   sendOtpMobile,
   signIn,
} from '../../Pagesactions/usersactions';

import { AuthContext } from '../../Contexts/AuthContext';

import fb from './fb.svg';
import google from './google.svg';

import { genMediaQuery } from '../../Styles/constants';
function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box
               p={3}
               style={{
                  padding: '10px 0',
               }}
            >
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
   };
}

const useStyles = makeStyles((theme) => ({
   root: {
      // margin: window.screen.width >= 768 ? 'auto' : 'auto',
      // width: window.screen.width >= 768 ? '70%' : '95%',
      width: '70%',
      margin: 'auto',
      [genMediaQuery('sm')]: {
         margin: 'auto',
         width: '70%',
      },
      [genMediaQuery('xs')]: {
         margin: 'auto',
         width: '95%',
      },
   },
   gridContainer: {
      [genMediaQuery('xs')]: {
         margin: '30px 20px',
      },
   },
   rootGrid: {
      backgroundColor: '#ffffff',
      padding: theme.spacing(2),
      width: '100%',
   },
   textfield: {
      width: '100%',
   },
   logo: {
      width: 100,
      height: 60,
      objectFit: 'contain',
   },
   tabBtn: {
      '& .flexContainer button:focus': {
         // outline: '0px auto -webkit-focus-ring-color',
         border: '2px solid rgb(244, 64, 64)',
      },
      '& button:focus': {
         outline: 'None',
      },
   },
}));

function CreateAccount(props) {
   const { changeToken } = React.useContext(AuthContext);
   console.log('*****');
   console.log('changedToken', changeToken);

   const classes = useStyles();
   const theme = useTheme();
   const [value, setValue] = useState(0);
   const [checked, setChecked] = useState(true);
   const [mobile, setMobile] = useState(false);
   const [number, setNumber] = useState('');
   const [isDisabled, setIsDisabled] = useState(true);

   const otp = '12345';
   const [user, setUser] = useState({
      email: '',
      password: '',
      // age,
   });

   React.useEffect(() => {
      console.clear();
      let inValid = 0;

      console.log('number.length', number.length);
      if (number.length <= 0) {
         console.log('inside 1');
         inValid += 1;
      }
      console.log('user.email.length', user.email.length);
      console.log('user.password.length', user.password.length);

      if (user.email.length <= 0 || user.password.length <= 0) {
         console.log('inside 3');
         inValid += 1;
      }

      console.log('inValid', inValid);

      if (inValid <= 1) {
         setIsDisabled(false);
      } else {
         setIsDisabled(true);
      }
   }, [user, number]);

   const handleChangeCheck = (event) => {
      setChecked(event.target.checked);
   };
   const handlePhoneChange = (number) => {
      setNumber(number);
   };

   const handleChangeMobile = (event, newValue) => {
      setValue(newValue);
      setMobile(true);
   };
   const handleOnChange = (e) => {
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });
   };

   const handleChangeIndex = (index) => {
      setValue(index);
      setMobile(true);
   };

   const openNewAccount = () => {
      const newObj = {
         user,
         checked,
         phoneNumber: number,
      };
      console.clear();

      console.log('object', newObj);

      let toVerify;
      // * Send OTP to Mobile and Email
      if (value === 1) {
         // * Mobile
         sendOtpMobile(newObj, props.history);
      } else {
         // * Email
         sendOtpEmail(newObj, props.history);
      }
   };

   const signInToAccount = () => {
      const newObj = {
         user,
      };

      console.log('before changing token');
      signIn(newObj);

      console.log('changing Token');
      // window.location.href = '/client/home';
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      window.location.href.includes('createAccount')
         ? openNewAccount()
         : signInToAccount();
   };

   const createAccount = window.location.href.includes(
      'createAccount'
   );
   console.log('url', createAccount);
   const width = window.screen.width;
   console.log('object', width);

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',

            // margin: window.screen.width >= 768 ? 'auto' : 'auto',
            // width: window.screen.width >= 768 ? '70%' : '95%',
         }}
         className={classes.root}
      >
         <Grid
            container
            direction='column'
            justify='center'
            alignItems='stretch'
            style={{
               backgroundColor: '#ffffff',
               borderRadius: 10,
               marginTop: theme.spacing(6),

               width: '100%',
               // width: window.screen.width >= 768 ? '70%' : '95%',
            }}
            className={classes.gridContainer}
         >
            <Grid item>
               <img src={logo} alt='logo' className={classes.logo} />
               {window.location.href.includes('createAccount') ? (
                  <Typography
                     variant='h6'
                     style={{ color: '#1b3863', fontWeight: 400 }}
                  >
                     Create Account Free
                  </Typography>
               ) : (
                  <Typography
                     variant='h6'
                     style={{ color: '#1b3863', fontWeight: 400 }}
                  >
                     Login to account
                  </Typography>
               )}

               <Typography
                  variant='body2'
                  style={{
                     color: '#F44040',
                  }}
               >
                  Welcome On board !
               </Typography>
            </Grid>
            <Grid item className={classes.rootGrid}>
               <AppBar
                  position='static'
                  style={{
                     display: 'flex',
                     backgroundColor: '#fff',
                     justifyContent: 'center',
                     boxShadow: 'none',
                     // alignItems: 'center',
                  }}
               >
                  <Tabs
                     value={value}
                     onChange={handleChangeMobile}
                     indicatorColor='none'
                     style={{
                        color: '#F44040',
                     }}
                     classes={{ flexContainer: classes.tabBtn }}
                  >
                     <Tab
                        style={{
                           color: 'black',
                           '&:focus': {
                              outline: 'none',
                              border: 'none',
                           },
                           borderBottom:
                              value === 0
                                 ? '2px solid rgb(244, 64, 64)'
                                 : 'none',
                        }}
                        label='Email'
                        {...a11yProps(0)}
                     />
                     <Tab
                        style={{
                           color: 'black',
                           '&:focus': {
                              outline: 'none',
                              border: 'none',
                           },
                           borderBottom:
                              value === 1
                                 ? '2px solid rgb(244, 64, 64)'
                                 : 'none',
                        }}
                        label='Mobile'
                        {...a11yProps(1)}
                     />
                  </Tabs>
               </AppBar>
               <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
               >
                  <TabPanel
                     value={value}
                     index={0}
                     dir={theme.direction}
                     style={{
                        padding: '10px 0',
                     }}
                  >
                     <Form
                        btnlabel={
                           window.location.href.includes(
                              'createAccount'
                           )
                              ? 'Create Account'
                              : 'login'
                        }
                        chekflag={
                           window.location.href.includes(
                              'createAccount'
                           )
                              ? 'chk'
                              : 'notChk'
                        }
                        isDisabled={isDisabled}
                        handleChange={handleOnChange}
                        user={user}
                        handleCheck={handleChangeCheck}
                        handleSubmit={handleSubmit}
                     />
                  </TabPanel>
                  <TabPanel
                     value={value}
                     index={1}
                     dir={theme.direction}
                  >
                     <Form
                        btnlabel={
                           window.location.href.includes(
                              'createAccount'
                           )
                              ? 'Create Account'
                              : 'login'
                        }
                        chekflag={
                           window.location.href.includes(
                              'createAccount'
                           )
                              ? 'chk'
                              : 'notChk'
                        }
                        mobile={mobile}
                        handleChange={handleOnChange}
                        user={user}
                        handleCheck={handleChangeCheck}
                        checked={checked}
                        phone={number}
                        phoneChange={handlePhoneChange}
                        handleSubmit={handleSubmit}
                        otp={otp}
                     />
                  </TabPanel>
               </SwipeableViews>
            </Grid>
            <Grid item>
               <div>
                  <IconButton
                     style={{
                        backgroundImage: `url(${fb})`,
                        backgroundRepeat: 'no-repeat',
                        borderRadius: 0,
                        padding: 20,
                        margin: 10,
                     }}
                  >
                     {/* <FacebookIcon size='large' /> */}
                  </IconButton>
                  <IconButton
                     style={{
                        backgroundImage: `url(${google})`,
                        backgroundRepeat: 'no-repeat',
                        borderRadius: 0,
                        padding: 20,
                        margin: 10,
                     }}
                  >
                     {/* <MoodIcon size='large' /> */}
                  </IconButton>
               </div>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     padding: '1%',
                  }}
               >
                  {window.location.href.includes('createAccount') ? (
                     <Typography
                        variant='body2'
                        style={{ color: 'black', paddingRight: 5 }}
                     >
                        Already Registered?
                     </Typography>
                  ) : (
                     <Typography
                        variant='body2'
                        style={{ color: 'black', paddingRight: 5 }}
                     >
                        Not registered yet?
                     </Typography>
                  )}

                  {window.location.href.includes('createAccount') ? (
                     <Typography variant='body2'>
                        <Link
                           style={{ color: 'rgb(216, 68, 30)' }}
                           to='/client/login'
                        >
                           Login Here
                        </Link>
                     </Typography>
                  ) : (
                     <Typography variant='body2'>
                        <Link
                           style={{ color: 'rgb(216, 68, 30)' }}
                           to='/client/createAccount'
                        >
                           Free Registration
                        </Link>
                     </Typography>
                  )}
               </div>
               <Typography
                  style={{
                     //   marginRight: "40%",
                     fontSize: 12,
                     color: '#ccc',
                     marginTop: 10,
                  }}
               >
                  2020 bong.com , all right reserved
               </Typography>
            </Grid>
         </Grid>
      </div>
   );
}

export default withRouter(CreateAccount);
