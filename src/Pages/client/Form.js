import React from 'react';
import {
   Checkbox,
   Button,
   TextField,
   Typography,
   Divider,
   FormControl,
   Select,
   InputLabel,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/material.css';
import { genMediaQuery } from '../../Styles/constants';
import './Form.css';

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#ffffff',
      padding: theme.spacing(2),
      width: '100%',
   },
   textfield: {
      width: '100%',
      '& .MuiOutlinedInput-input': {
         padding: '10.5px 14px',
      },
      '& .MuiFilledInput-root': {
         backgroundColor: '#fff',
      },
   },
   logo: {
      width: 100,
      height: 60,
      objectFit: 'contain',
   },

   phoneField: {
      backgroundColor: 'red',
      '& .react-tel-input .form-control': {
         width: '100% !important',
         '& input': {
            width: '100% !important',
         },
      },
      '& .MuiFilledInput-root': {
         backgroundColor: '#fff',
      },
   },
   submitBtn: {
      [genMediaQuery('xs')]: {
         width: '65%',
      },
      [genMediaQuery('xxxs')]: {
         width: '70%',
      },
   },
}));

function Form(props) {
   console.log(props.btnlabel);
   const classes = useStyles();
   const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(
      true
   );

   return (
      <>
         <div style={{ display: 'block', paddingTop: '4%' }}>
            <form>
               {props.mobile === true ? (
                  <FormControl style={{ width: '100%' }}>
                     <PhoneInput
                        country={'us'}
                        name='mobileNo'
                        value={props.phone}
                        label='phone'
                        variant='filled'
                        fullwidth
                        onChange={(e) => props.phoneChange(e)}
                        className={classes.phoneField}
                        className='phoneInput'
                     />
                  </FormControl>
               ) : (
                  <TextField
                     fullWidth
                     name='email'
                     label='Email'
                     value={props.user.email}
                     variant='filled'
                     className={classes.textfield}
                     onChange={(e) => props.handleChange(e)}
                  />
               )}

               <TextField
                  name='password'
                  label='Password'
                  value={props.user.password}
                  variant='filled'
                  fullwidth
                  margin='normal'
                  className={classes.textfield}
                  onChange={(e) => props.handleChange(e)}
               />

               {props.chekflag === 'chk' ? (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                     }}
                  >
                     <Checkbox
                        checked={props.checked}
                        onChange={(e) => props.handleCheck(e)}
                        inputProps={{
                           'aria-label': 'primary checkbox',
                        }}
                     />
                     <Typography
                        variant='body2'
                        style={{ paddingTop: 10, color: 'black' }}
                     >
                        I have read and aggreed to the{' '}
                     </Typography>
                     <Typography
                        variant='body2'
                        style={{ paddingTop: 10 }}
                     >
                        <Link
                           style={{ color: 'rgb(216, 68, 30)' }}
                           to='#'
                        >
                           {' '}
                           Terms Of Service
                        </Link>
                     </Typography>
                  </div>
               ) : (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                     }}
                  >
                     <Typography
                        variant='body2'
                        style={{ paddingTop: 10 }}
                     >
                        <Link
                           style={{ color: '#ccc' }}
                           to='/client/reset'
                        >
                           Forget Password
                        </Link>
                     </Typography>
                  </div>
               )}
               <Button
                  type='submit'
                  variant='contained'
                  style={{
                     borderRadius: 20,
                     //  width:
                     //     window.screen.width >= 768 ? '50%' : '20%',
                     //   padding: window.screen.width >= 768 ? "10" : "0",
                     marginTop: 5,
                     backgroundColor: '#F44040',
                     color: '#fff',
                  }}
                  disabled={props.isDisabled}
                  className={classes.submitBtn}
                  onClick={(e) => props.handleSubmit(e)}
               >
                  <Typography
                     style={{
                        fontSize:
                           window.screen.width >= 768 ? 14 : 10,
                     }}
                  >
                     {props.btnlabel}
                  </Typography>
               </Button>
            </form>
         </div>
         <div
            style={{
               marginTop: '3%',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
            }}
         >
            <Divider style={{ width: '35%', fontWeight: 400 }} />
            <Typography variant='body2' style={{ color: 'black' }}>
               Alternatively
            </Typography>

            <Divider style={{ width: '35%', fontWeight: 400 }} />
         </div>
      </>
   );
}

export default Form;
