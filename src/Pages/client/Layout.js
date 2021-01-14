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

import logo from '../../../src/assets/logo.png';
import { Avatar, Button } from '@material-ui/core';
import { AuthContext } from '../../Contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
   grow: {
      flexGrow: 1,
      '& .MuiAppBar-colorPrimary': {
         backgroundColor: '#193459',
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
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#1b3863',
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(3),
         width: 'auto',
      },
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: '20ch',
      },
   },
   sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
         display: 'flex',
      },
   },
   sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   logo: {
      width: 100,
      height: 60,
      objectFit: 'contain',
   },
   menuList: {
      fontSize: '0.8rem',
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
         <MenuItem onClick={handleMenuClose}>
            Account Setting
         </MenuItem>
         <MenuItem onClick={logoutUser}>Log Out</MenuItem>
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
      >
         <MenuItem>
            <IconButton
               aria-label='show 4 new mails'
               variant='outlined'
               color='inherit'
            >
               <Badge badgeContent={4} color='secondary'>
                  <NotificationsIcon />
               </Badge>
            </IconButton>
         </MenuItem>
         <MenuItem>
            <IconButton
               aria-label='show 11 new notifications'
               color='inherit'
            >
               <Badge badgeContent={11} color='secondary'>
                  <Avatar />
               </Badge>
            </IconButton>
            <p>Notifications</p>
         </MenuItem>
         <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
               aria-label='account of current user'
               aria-controls='primary-search-account-menu'
               aria-haspopup='true'
               color='inherit'
            >
               <ExpandMoreIcon />
            </IconButton>
            <p>Profile</p>
         </MenuItem>
      </Menu>
   );

   return (
      <div className={classes.grow}>
         <AppBar position='fixed'>
            <Toolbar>
               <img src={logo} alt='logo' className={classes.logo} />
               <div style={{ display: 'flex' }}>
                  <MenuItem
                     onClick={() =>
                        (window.location.href = '/client/browse')
                     }
                     className={classes.menuList}
                  >
                     Browse
                  </MenuItem>
                  <MenuItem
                     className={classes.menuList}
                     onClick={() =>
                        (window.location.href = '/client/discover')
                     }
                  >
                     Discover
                  </MenuItem>
                  <MenuItem
                     className={classes.menuList}
                     onClick={() =>
                        (window.location.href = '/client/radio')
                     }
                  >
                     Radio
                  </MenuItem>
                  <MenuItem
                     className={classes.menuList}
                     onClick={() =>
                        (window.location.href = '/client/library')
                     }
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
                        // onClick={handleProfileMenuOpen}
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
