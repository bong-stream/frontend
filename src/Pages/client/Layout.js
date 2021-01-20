import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/More';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

import logo from '../../../src/assets/logo2.png';
import { Avatar, Button } from '@material-ui/core';
import { AuthContext } from '../../Contexts/AuthContext';

import { genMediaQuery } from '../../Styles/constants';

const useStyles = makeStyles((theme) => ({
   grow: {
      flexGrow: 1,
      '& .MuiAppBar-colorPrimary': {
         backgroundColor: '#1B3862',
      },
      minHeight: 56,
      [genMediaQuery('xs')]: {
         minHeight: 110,
      },
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'block',
      },
   },
   search: {
      width: 'fit-content',
      position: 'relative',
      borderRight: 25,
      color: '#8793A4',
      maxWidth: '70%',

      borderRadius: 20,

      backgroundColor: ' #132D52',
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      // width: '100%',
      [genMediaQuery('xs')]: {
         height: '100%',
         fontSize: '0.6em',
      },
      [theme.breakpoints.up('md')]: {
         marginLeft: theme.spacing(3),
         // width: 'auto',
      },
      margin: 'auto',
      height: 35,
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: 0,
      [genMediaQuery('xs')]: {
         fontSize: '1.5em',
      },
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      fontSize: '1.3em',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',

      [genMediaQuery('sm')]: {
         fontSize: '1.2em',
      },

      [theme.breakpoints.up('md')]: {
         width: '20ch',
      },
   },
   sectionDesktop: {
      display: 'none',
      marginLeft: 'auto',
      [theme.breakpoints.up('md')]: {
         display: 'flex',
      },
   },
   sectionMobile: {
      display: 'flex',
      marginLeft: 'auto',
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   sectionNavLinks: {
      display: 'flex',
      paddingLeft: 40,
      [genMediaQuery('xs')]: {
         display: 'none',
      },
      '& .MuiMenuItem-root': {
         fontSize: '1rem',
         [genMediaQuery('sm')]: {
            fontSize: '0.9em',
         },
      },
   },
   navLinks: {
      [genMediaQuery('xs')]: {
         display: 'block',
      },
      display: 'none',
      '& p': {
         fontSize: '3em',
         margin: 'auto',
         textAlign: 'right',
         marginRight: 30,
         color: 'black',
         fontFamily: 'calibri',
      },
   },
   logo: {
      width: 100,
      height: 60,
      objectFit: 'contain',
      [genMediaQuery('xs')]: {
         width: window.location.href.includes('browse') ? 200 : 100,
         height: window.location.href.includes('browse') ? 100 : 50,
      },
   },
   Toolbar: {
      paddingLeft: 85,
      paddingRight: 55,
      [genMediaQuery('sm')]: {
         paddingLeft: 20,
         paddingRight: 20,
      },
   },
   menuList: {
      // fontSize: '1.3rem',
   },
   auth: {
      color: '#fff',
      '&:hover': {
         backgroundColor: '#fff',
         color: '#1b3863',
         borderRadius: '20',
         paddingLeft: 3,
      },
   },
   notificationItem: {
      // display: 'flex',
      /* position: absolute; */
      /* right: 0; */
      // justifyContent: 'flex-end',
      [genMediaQuery('xs')]: {
         position: 'absolute',
         top: 10,
         right: '12%',
      },
   },
   NavWrapper: {
      '& .MuiMenu-paper': {
         minWidth: '40%',
         [genMediaQuery('xs')]: {
            minWidth: '75%',
            minHeight: '100%',
         },
         top: '0 !important',
         left: 'unset !important',
         right: '0 ',
         background: '#193459',
         '& p': {
            color: '#fff ',
         },
         '& path': {
            color: '#fff !important',
         },
      },
   },
   notificationBadge: {
      [genMediaQuery('xs')]: {
         '& svg': {
            fontSize: '2.7em',
         },
         '& .MuiBadge-badge': {
            fontSize: '1.5em',
            height: '1em',
            width: '1em',
            borderRadius: '50%',
         },
      },
   },
   nestedNavLinks: {
      [genMediaQuery('xs')]: {
         fontSize: '3em',
      },
   },
   moreNavLinks: {
      [genMediaQuery('xs')]: {
         fontSize: '3em',
         margin: 'auto',
         textAlign: 'right',
         marginRight: 30,
         color: 'black',
         fontFamily: 'calibri',
         '& .MuiAvatar-root': {
            [genMediaQuery('xs')]: {
               width: '70px',
               height: '70px',
            },
         },
         overflow: 'visible',
         '& .MuiBadge-badge': {
            [genMediaQuery('xs')]: {
               width: '40px',
               fontSize: '1.2em',
               height: '40px',
            },
         },
      },
   },
   notificationBtn: {
      [genMediaQuery('xs')]: {
         position: 'absolute',
         right: '100%',
      },
   },
   extraNavLinks: {
      marginLeft: 'auto',
      width: 'fit-content',
      [genMediaQuery('xs')]: {
         width: '100% ',
      },
      [genMediaQuery('xs')]: {
         margin: 'auto',
         textAlign: 'right',
         marginRight: 30,
         color: 'black',
         fontFamily: 'calibri',
         '& .MuiAvatar-root': {
            [genMediaQuery('xs')]: {
               width: '70px',
               height: '70px',
            },
         },
         overflow: 'visible',
         '& .MuiBadge-badge': {
            [genMediaQuery('xs')]: {
               width: '40px',
               fontSize: '1.2em',
               height: '40px',
            },
         },
      },
   },
   notificationSM: {
      width: 'fit-content',

      [genMediaQuery('xs')]: {
         width: 'auto',
      },
   },
   moreProfileBtn: {
      paddingLeft: 0,
      [genMediaQuery('xs')]: {
         position: 'absolute',
         right: '20%',
         '& svg': {
            position: 'absolute',
            right: '150px',
            fontSize: '3em',
         },
      },
   },
   closeBtn: {
      display: 'none',
      [genMediaQuery('xs')]: {
         display: 'block',
         position: 'absolute',
         top: '5%',
         right: '7%',
         fontSize: '3.5em',
      },
   },
   expandBtn: {
      '& svg': {
         fontSize: '1.5em',
         [genMediaQuery('xs')]: {
            fontSize:
               window.location.href.includes('browse') && '3em',
         },
      },
   },
}));

export default function PrimarySearchAppBar() {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(
      null
   );

   const { changeToken } = React.useContext(AuthContext);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const logoutUser = () => {
      changeToken(undefined);
      window.location.reload();
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const menuId = 'primary-search-account-menu';
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem
            onClick={handleMenuClose}
            className={classes.nestedNavLinks}
         >
            Account Setting
         </MenuItem>
         <MenuItem
            onClick={logoutUser}
            className={classes.nestedNavLinks}
         >
            Log Out
         </MenuItem>
      </Menu>
   );

   const mobileMenuId = 'primary-search-account-menu-mobile';
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
         className={classes.NavWrapper}
      >
         <MenuItem
            className={classes.navLinks}
            style={{
               marginTop: 10,
            }}
         >
            <div className={classes.search} style={{}}>
               <div className={classes.searchIcon}>
                  <SearchIcon
                     style={{
                        fontSize: '3.2em',
                     }}
                  />
               </div>
               <InputBase
                  placeholder='Search…'
                  classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput,
                  }}
                  style={{
                     color: '#fff',
                     fontSize: '3em',
                  }}
                  inputProps={{ 'aria-label': 'search' }}
               />
            </div>
         </MenuItem>

         <CloseIcon
            className={classes.closeBtn}
            onClick={handleMenuClose}
         />
         <MenuItem
            className={classes.navLinks}
            onClick={() => (window.location.href = '/client/browse')}
         >
            <p
               style={{
                  color:
                     window.location.href.includes('browse') &&
                     '#F44040',

                  borderBottom:
                     window.location.href.includes('browse') &&
                     '1px solid #F44040',
               }}
            >
               Browse
            </p>
         </MenuItem>
         <MenuItem
            className={classes.navLinks}
            onClick={() =>
               (window.location.href = '/client/discover')
            }
         >
            <p
               style={{
                  color:
                     window.location.href.includes('discover') &&
                     '#F44040 ',

                  borderBottom:
                     window.location.href.includes('discover') &&
                     '1px solid #F44040',
               }}
            >
               Discover
            </p>
         </MenuItem>
         <MenuItem
            className={classes.navLinks}
            onClick={() => (window.location.href = '/client/radio')}
         >
            <p
               style={{
                  color:
                     window.location.href.includes('radio') &&
                     '#F44040 ',

                  borderBottom:
                     window.location.href.includes('radio') &&
                     '1px solid #F44040',
               }}
            >
               Radio
            </p>
         </MenuItem>
         <MenuItem
            className={classes.navLinks}
            onClick={() => (window.location.href = '/client/library')}
         >
            <p
               style={{
                  color:
                     window.location.href.includes('library') &&
                     '#F44040 ',

                  borderBottom:
                     window.location.href.includes('library') &&
                     '1px solid #F44040',
               }}
            >
               My Library
            </p>
         </MenuItem>
         <MenuItem
            className={`${classes.notificationItem} ${classes.extraNavLinks} ${classes.notificationSM}`}
         >
            <IconButton
               aria-label='show 4 new mails'
               variant='outlined'
               color='inherit'
            >
               <Badge
                  badgeContent={4}
                  color='secondary'
                  className={classes.notificationBadge}
               >
                  <NotificationsIcon />
               </Badge>
            </IconButton>
         </MenuItem>
         <MenuItem className={classes.extraNavLinks}>
            <IconButton
               aria-label='show 11 new notifications'
               color='inherit'
               className={classes.notificationBtn}
            >
               <Badge badgeContent={11} color='secondary'>
                  <Avatar />
               </Badge>
            </IconButton>
            <p className={classes.moreNavLinks}>Notifications</p>
         </MenuItem>
         <MenuItem
            onClick={handleProfileMenuOpen}
            className={classes.extraNavLinks}
         >
            <IconButton
               aria-label='account of current user'
               aria-controls='primary-search-account-menu'
               aria-haspopup='true'
               color='inherit'
               className={classes.moreProfileBtn}
            >
               <ExpandMoreIcon />
            </IconButton>
            <p className={classes.moreNavLinks}>Profile</p>
         </MenuItem>
      </Menu>
   );

   return (
      <div className={classes.grow}>
         <AppBar position='fixed'>
            <Toolbar className={classes.Toolbar}>
               <img src={logo} alt='logo' className={classes.logo} />
               <div className={classes.sectionNavLinks}>
                  <div style={{ display: 'flex' }}>
                     <MenuItem
                        onClick={() =>
                           (window.location.href = '/client/browse')
                        }
                        style={{
                           color:
                              window.location.href.includes(
                                 'browse'
                              ) && '#F44040',

                           borderBottom:
                              window.location.href.includes(
                                 'browse'
                              ) && '1px solid #F44040',
                        }}
                        className={classes.menuList}
                     >
                        Browse
                     </MenuItem>
                     <MenuItem
                        className={classes.menuList}
                        onClick={() =>
                           (window.location.href = '/client/discover')
                        }
                        style={{
                           color:
                              window.location.href.includes(
                                 'discover'
                              ) && '#F44040',
                           borderBottom:
                              window.location.href.includes(
                                 'discover'
                              ) && '1px solid #F44040',
                        }}
                     >
                        Discover
                     </MenuItem>
                     <MenuItem
                        className={classes.menuList}
                        onClick={() =>
                           (window.location.href = '/client/radio')
                        }
                        style={{
                           color:
                              window.location.href.includes(
                                 'radio'
                              ) && '#F44040',
                           borderBottom:
                              window.location.href.includes(
                                 'radio'
                              ) && '1px solid #F44040',
                        }}
                     >
                        Radio
                     </MenuItem>
                     <MenuItem
                        className={classes.menuList}
                        onClick={() =>
                           (window.location.href = '/client/library')
                        }
                        style={{
                           color:
                              window.location.href.includes(
                                 'library'
                              ) && '#F44040',
                           borderBottom:
                              window.location.href.includes(
                                 'library'
                              ) && '1px solid #F44040',
                        }}
                     >
                        My Library
                     </MenuItem>
                  </div>
                  <div className={classes.search}>
                     <div className={classes.searchIcon}>
                        <SearchIcon />
                     </div>
                     <InputBase
                        placeholder='Search…'
                        classes={{
                           root: classes.inputRoot,
                           input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                     />
                  </div>
                  <div className={classes.grow} />
               </div>
               {window.location.href.includes('Home') ? (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                     }}
                  >
                     <Button size='small' className={classes.auth}>
                        Login
                     </Button>
                     <Button size='small' className={classes.auth}>
                        Sign Up
                     </Button>
                  </div>
               ) : (
                  <div className={classes.sectionDesktop}>
                     <IconButton
                        aria-label='show 4 new mails'
                        color='inherit'
                     >
                        <Badge badgeContent={4} color='secondary'>
                           <NotificationsIcon />
                        </Badge>
                     </IconButton>
                     <IconButton
                        aria-label='show 17 new notifications'
                        color='inherit'
                        onClick={handleProfileMenuOpen}
                     >
                        <Avatar />
                     </IconButton>
                     <IconButton
                        edge='end'
                        aria-label='account of current user'
                        aria-controls={menuId}
                        aria-haspopup='true'
                        onClick={handleProfileMenuOpen}
                        color='inherit'
                     >
                        <ExpandMoreIcon />
                     </IconButton>
                  </div>
               )}
               <div className={classes.sectionMobile}>
                  <IconButton
                     aria-label='show more'
                     aria-controls={mobileMenuId}
                     aria-haspopup='true'
                     onClick={handleMobileMenuOpen}
                     color='inherit'
                     className={classes.expandBtn}
                  >
                     <MoreIcon />
                  </IconButton>
               </div>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
         <Toolbar></Toolbar>
      </div>
   );
}
