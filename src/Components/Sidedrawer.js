import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
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
  // const customClasses = styles;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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

          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <ListItem
              button
              style={
                selectedIndex === 0
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon
                style={selectedIndex === 0 ? { color: "white" } : null}
              >
                {" "}
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/managehomepage"
          >
            <ListItem
              button
              style={
                selectedIndex === 1
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon
                style={selectedIndex === 1 ? { color: "white" } : null}
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
          </Link>
          <Collapse in={openMenu && open} timeout="auto" unmountOnExit>
            <br />
            <List component="div" disablePadding>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/trending"
              >
                <ListItem button>
                  <ListItemIcon>
                    <TrendingUpIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Trending" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/popular"
              >
                <ListItem button>
                  <ListItemIcon>
                    <WhatshotIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Popular" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/charts"
              >
                <ListItem button>
                  <ListItemIcon>
                    <InsertChartIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Top Charts" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/bongplaylist"
              >
                <ListItem button>
                  <ListItemIcon>
                    <PlaylistPlayIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="BongPlaylist" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/topartists"
              >
                <ListItem button>
                  <ListItemIcon>
                    <FaceIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Top Artists" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/topalbums"
              >
                <ListItem button>
                  <ListItemIcon>
                    <AlbumIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Top Albums" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/recommended"
              >
                <ListItem button>
                  <ListItemIcon>
                    <MusicNoteIcon style={{ color: "#f44040" }} />
                  </ListItemIcon>
                  <ListItemText primary="Recommended" />
                </ListItem>
              </Link>
            </List>

            <br />
          </Collapse>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/users"
          >
            <ListItem
              button
              style={
                selectedIndex === 2
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon
                style={selectedIndex === 2 ? { color: "white" } : null}
              >
                {" "}
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/artist"
          >
            <ListItem
              button
              style={
                selectedIndex === 3
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon
                style={selectedIndex === 3 ? { color: "white" } : null}
              >
                {" "}
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Artists" />
            </ListItem>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/albums"
          >
            <ListItem
              button
              style={
                selectedIndex === 4
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon
                style={selectedIndex === 4 ? { color: "white" } : null}
              >
                <AlbumIcon />
              </ListItemIcon>
              <ListItemText primary="Albums" />
            </ListItem>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/songs"
          >
            <ListItem
              button
              style={
                selectedIndex === 5
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon
                style={selectedIndex === 5 ? { color: "white" } : null}
              >
                <MusicNoteIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Songs" />
            </ListItem>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/category"
          >
            <ListItem
              button
              style={
                selectedIndex === 6
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon
                style={selectedIndex === 6 ? { color: "white" } : null}
              >
                <CategoryIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/admin/genres"
          >
            <ListItem
              button
              style={
                selectedIndex === 7
                  ? {
                      backgroundColor: " #f44040",
                      color: "white",
                    }
                  : null
              }
              selected={selectedIndex === 7}
              onClick={(event) => handleListItemClick(event, 7)}
            >
              <ListItemIcon
                style={selectedIndex === 7 ? { color: "white" } : null}
              >
                <ArtTrackIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Genres" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}

export default Sidedrawer;
