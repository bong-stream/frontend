import React, { useState, useEffect, useCallback } from "react";
import Selectsongsfortrending from "../Components/Selectsongsfortrending";
import { getSongs } from "../Pagesactions/songsactions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Addtrending({
  open,
  handleClose,
  handleClickOpen,
  handleAddTrending,
}) {
  const classes = useStyles();
  const [fetchedSongs, setFetchedSongs] = useState();
  const [selectSongs, setSelectSongs] = useState();

  const handleSelectSongs = (data) => {
    // console.log(data);
    setSelectSongs(data);
    handleAddTrending(data);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setFetchedSongs(allSongs);
    };
    fetchSongs();
  }, []);

  return (
    <div>
      {/* {console.log(fetchedSongs)} */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{
          backgroundColor: "#F44040",
        }}
      >
        <AppBar
          className={classes.appBar}
          style={{
            backgroundColor: "#F44040",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Choose Songs for trending
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Brunch this weekend?" />
          </ListItem>
        </List> */}
        {fetchedSongs ? (
          <div className="container">
            <Selectsongsfortrending
              data={fetchedSongs}
              selectSongs={handleSelectSongs}
              handleClose={handleClose}
            />
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
