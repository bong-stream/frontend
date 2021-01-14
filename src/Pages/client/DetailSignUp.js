import React from 'react';
import {
   Button,
   TextField,
   Typography,
   Grid,
   Select,
   InputLabel,
   FormControl,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logo from '../../../src/assets/logo.png';
import { signUp } from '../../Pagesactions/usersactions';
import { AuthContext } from '../../Contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#ffffff',
      padding: theme.spacing(2),
      width: '100%',
   },
   textfield: {
      width: '90%',
      '& .MuiOutlinedInput-input': {
         padding: '15.5px 10px',
      },
      marginTop: 10,
   },
   logo: {
      width: 100,
      height: 60,
      objectFit: 'contain',
   },
}));

function DetailSignUp(props) {
   const classes = useStyles();
   console.log('object', props);

   const { changeToken } = React.useContext(AuthContext);

   const theme = useTheme();
   const [addUser, setAddUser] = React.useState({
      name: '',
      password: '',
      gender: '',
      age: '',
   });
   const handleAddUser = (e) => {
      setAddUser({
         ...addUser,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('final user', addUser);
      if (
         !props.history ||
         !props.history.location ||
         !props.history.location.data
      ) {
         alert('Idiot');
      }
      const newUser = {
         name: addUser.name,
         password: addUser.password,
         number: props.history.location.data.phoneNumber,
         age: addUser.age,
         gender: addUser.gender,
      };
      const registered = await signUp(
         newUser,
         props.history,
         changeToken
      );
      console.log('registered', registered);
      // if (registered) {
      //   alert("user signed up successfully");
      // }
   };

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',

            margin: window.screen.width >= 768 ? 'auto' : 'auto',
            width: window.screen.width >= 768 ? '70%' : '95%',
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
               width: window.screen.width >= 768 ? '70%' : '95%',
            }}
         >
            <Grid item>
               <img src={logo} alt='logo' className={classes.logo} />
               <Typography
                  variant='h6'
                  style={{ color: '#1b3863', fontWeight: 400 }}
               >
                  Create Free Account
               </Typography>
               <Typography variant='body2' color='secondary'>
                  Welcome On board !
               </Typography>
            </Grid>
            <Grid item>
               <div
                  style={{
                     display: 'block',
                     marginTop: theme.spacing(4),
                     paddingBottom: '20%',
                  }}
               >
                  <div style={{ display: 'block', paddingTop: '4%' }}>
                     <form>
                        <TextField
                           name='name'
                           label='name'
                           value={addUser.name}
                           variant='outlined'
                           className={classes.textfield}
                           onChange={handleAddUser}
                        />
                        <TextField
                           name='password'
                           type='password'
                           label='password'
                           value={addUser.password}
                           variant='outlined'
                           className={classes.textfield}
                           onChange={handleAddUser}
                        />
                        <TextField
                           name='age'
                           label='age'
                           value={addUser.age}
                           variant='outlined'
                           fullwidth
                           margin='normal'
                           className={classes.textfield}
                           onChange={handleAddUser}
                        />

                        <FormControl
                           variant='outlined'
                           className={classes.textfield}
                        >
                           <InputLabel htmlFor='gender'>
                              gender
                           </InputLabel>
                           <Select
                              native
                              style={{ width: '100%' }}
                              value={addUser.gender}
                              onChange={handleAddUser}
                              label='Gender'
                              inputProps={{
                                 name: 'gender',
                                 id: 'gender',
                              }}
                           >
                              <option aria-label='None' value='' />
                              <option value={10}>Male</option>
                              <option value={20}>Female</option>
                              <option value={30}>other</option>
                           </Select>
                        </FormControl>

                        <Button
                           type='submit'
                           variant='contained'
                           color='secondary'
                           style={{
                              borderRadius: 20,
                              width: '50%',
                              marginTop: '4%',
                           }}
                           onClick={handleSubmit}
                        >
                           Create Account
                        </Button>
                     </form>
                  </div>
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

export default withRouter(DetailSignUp);
