import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Link, NavLink, useHistory } from "react-router-dom";
import Imageavatar from "./Imageavatar";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AlbumIcon from "@material-ui/icons/Album";
import FaceIcon from "@material-ui/icons/Face";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppsIcon from "@material-ui/icons/Apps";
import Logo from ".././assets/logo2.png";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import CategoryIcon from "@material-ui/icons/Category";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import LabelIcon from "@material-ui/icons/Label";
import InstagramIcon from "@material-ui/icons/Instagram";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ApartmentIcon from "@material-ui/icons/Apartment";
import InfoIcon from "@material-ui/icons/Info";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: " #f44040",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    backgroundColor: "black",
    color: "white",
  },
}));

// const styles = {
//   paper: {
//     backgroundColor: "black",
//     color: "white",
//   },
// };

function Sidedrawer() {
  const classes = useStyles();
  const history = useHistory();
  console.log(history.location.pathname);
  // let path = history.location.pathname;
  // const customClasses = styles;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [path, setPath] = React.useState(history.location.pathname);
  console.log("i am path", path);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    // setPath(history.location.pathname);
  };

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setPath(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{
          backgroundColor: "#F44040",
        }}
        // color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <img style={{ width: "105px" }} src={Logo} />
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        // classes={{ paper: customClasses.paper }}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className="mb-1">
          {open && (
            <div className="row m-1">
              <div className="col-3 mt-2">
                <Imageavatar imageSrc="https://images.pexels.com/photos/2853535/pexels-photo-2853535.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
              </div>
              <div className="col-6">
                <h5 className="mt-3">Admin Name</h5>
              </div>
              <div className="col-3 ">
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
            </div>
          )}
        </div>
        <Divider />
        <List>
          <br />
          <br />
          <br />
          {!open && (
            <ListItem>
              <ListItemIcon style={{ color: "white" }}>
                {" "}
                {/* <AppsIcon /> */}
                <Imageavatar imageSrc="https://images.pexels.com/photos/2853535/pexels-photo-2853535.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
              </ListItemIcon>
              {/* <ListItemText primary="Home" /> */}
            </ListItem>
          )}
          {console.log("inner story of path", path)}
          <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
            <ListItem
              button
              style={
                path === "/"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={path === "/"}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon style={path === "/" ? { color: "white" } : null}>
                {" "}
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>

          {/* <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/managehomepage"
          >
            <ListItem
              button
              style={
                path === "/admin/managehomepage"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon
                style={
                  path === "/admin/managehomepage" ? { color: "white" } : null
                }
              >
                {" "}
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
              {openMenu ? (
                <IconButton
                  onClick={handleClick}
                  edge="start"
                  color="inherit"
                  aria-label="close"
                >
                  <ExpandLess />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleClick}
                  edge="start"
                  color="inherit"
                  aria-label="close"
                >
                  <ExpandMore />
                </IconButton>
              )}
            </ListItem>
          </NavLink>
          <Collapse in={openMenu && open} timeout="auto" unmountOnExit>
            <br />
            <List component="div" disablePadding>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/trending"
              >
                <ListItem button>
                  <ListItemIcon>
                    <TrendingUpIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Trending" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/popular"
              >
                <ListItem button>
                  <ListItemIcon>
                    <WhatshotIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Popular" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/charts"
              >
                <ListItem button>
                  <ListItemIcon>
                    <InsertChartIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Top Charts" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/bongplaylist"
              >
                <ListItem button>
                  <ListItemIcon>
                    <PlaylistPlayIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="BongPlaylist" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/topartists"
              >
                <ListItem button>
                  <ListItemIcon>
                    <FaceIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Top Artists" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/topalbums"
              >
                <ListItem button>
                  <ListItemIcon>
                    <AlbumIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Top Albums" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/recommended"
              >
                <ListItem button>
                  <ListItemIcon>
                    <MusicNoteIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Recommended" />
                </ListItem>
              </NavLink>
            </List>

            <br />
          </Collapse> */}

          {/* <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/users"
          >
            <ListItem
              button
              style={
                path === "/admin/users"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon
                style={path === "/admin/users" ? { color: "white" } : null}
              >
                {" "}
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </NavLink> */}
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/artist"
          >
            <ListItem
              button
              style={
                path === "/admin/artist"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon
                style={path === "/admin/artist" ? { color: "white" } : null}
              >
                {" "}
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Artists" />
            </ListItem>
          </NavLink>
          <ListItem
            button
            style={
              path === "/admin/managehomepage"
                ? {
                    backgroundColor: " #f44040",
                    color: "white",
                  }
                : null
            }
            // selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon
              style={
                path === "/admin/managehomepage" ? { color: "white" } : null
              }
            >
              {" "}
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Basic Info" />
            {openMenu ? (
              <IconButton
                onClick={handleClick}
                edge="start"
                color="inherit"
                aria-label="close"
              >
                <ExpandLess />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleClick}
                edge="start"
                color="inherit"
                aria-label="close"
              >
                <ExpandMore />
              </IconButton>
            )}
          </ListItem>
          <Collapse in={openMenu && open} timeout="auto" unmountOnExit>
            <br />
            <List component="div" disablePadding>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/genres"
              >
                <ListItem button>
                  <ListItemIcon style={{ color: "#f44040" }}>
                    <ArtTrackIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Genres" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/labels"
              >
                <ListItem button>
                  <ListItemIcon>
                    <LabelIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Labels" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/tags"
              >
                <ListItem button>
                  <ListItemIcon>
                    <LocalOfferIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Tags" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/socialmedia"
              >
                <ListItem button>
                  <ListItemIcon>
                    <InstagramIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Social Media" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/profession"
              >
                <ListItem button>
                  <ListItemIcon>
                    <ApartmentIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Profession" />
                </ListItem>
              </NavLink>
            </List>

            <br />
          </Collapse>

          {/* <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/albums"
          >
            <ListItem
              button
              style={
                path === "/admin/albums"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon
                style={path === "/admin/albums" ? { color: "white" } : null}
              >
                <AlbumIcon />
              </ListItemIcon>
              <ListItemText primary="Albums" />
            </ListItem>
          </NavLink>

          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/songs"
          >
            <ListItem
              button
              style={
                path === "/admin/songs"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon
                style={path === "/admin/songs" ? { color: "white" } : null}
              >
                <MusicNoteIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Songs" />
            </ListItem>
          </NavLink>

          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/category"
          >
            <ListItem
              button
              style={
                path === "/admin/category"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon
                style={path === "/admin/category" ? { color: "white" } : null}
              >
                <CategoryIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
          </NavLink>

          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/genres"
          >
            <ListItem
              button
              style={
                path === "/admin/genres"
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              // selected={selectedIndex === 7}
              onClick={(event) => handleListItemClick(event, 7)}
            >
              <ListItemIcon
                style={path === "/admin/genres" ? { color: "white" } : null}
              >
                <ArtTrackIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Genres" />
            </ListItem>
          </NavLink> */}
        </List>
      </Drawer>
    </div>
  );
}

export default Sidedrawer;
