import React, { useState, useEffect, useCallback, useMemo } from "react";
import Selectalbumforartist from "../Components/Selectalbumforartist";
import Selectsongsforartist from "../Components/Selectsongsforartist";
import { getSongs } from "../Pagesactions/songsactions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Imageupload from "../Components/Imageupload";

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

export default function Editcategory({
  open,
  data,
  handleEditGenre,
  handleCloseEdit,
}) {
  const [state, setState] = useState({
    id: data.id,
    categoryname: data.categoryname,
    categoryimage: data.categoryimage,
    songs: data.songs,
  });
  console.log(data);
  const classes = useStyles();

  const [allAlbums, setAllAlbums] = useState([]);
  const [foundAlbums, setFoundAlbums] = useState([]);
  const [editAlbums, setEditAlbums] = useState(false);
  const [addAlbums, setAddAlbums] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [foundSongs, setFoundSongs] = useState([]);
  const [editSongs, setEditSongs] = useState(false);
  const [addSongs, setAddSongs] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEditGenre(state);
    handleCloseEdit();
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const deleteArtistAlbum = async (id) => {
    let yoo;
    let ids = [];
    yoo = foundAlbums.filter((album) => {
      if (album._id !== id) {
        return album;
      }
    });
    foundAlbums.filter((album) => {
      if (album._id !== id) {
        ids.push(album._id);
      }
    });
    // console.log(ids);
    await setFoundAlbums(yoo);
    await setState({
      ...state,
      albums: ids,
    });
  };

  const deleteArtistSong = async (id) => {
    let yoo;
    let ids = [];
    yoo = foundSongs.filter((song) => {
      if (song._id !== id) {
        return song;
      }
    });
    foundSongs.filter((song) => {
      if (song._id !== id) {
        ids.push(song._id);
      }
    });
    // console.log(ids);
    await setFoundSongs(yoo);
    await setState({
      ...state,
      songs: ids,
    });
  };

  const handleAlbumsToggle = () => {
    setEditAlbums(!editAlbums);
    setAddAlbums(false);
  };

  const handleAddAlbums = () => {
    handleAlbumsToggle();
    setAddAlbums(!addAlbums);
  };

  const handleSongsToggle = () => {
    setEditSongs(!editSongs);
    setAddSongs(false);
  };

  const handleAddSongs = () => {
    handleSongsToggle();
    setAddSongs(!addSongs);
  };

  const handleSelectedAddAlbums = (data) => {
    let ids = [];

    data.map((subData) => {
      ids.push(subData._id);
    });

    setFoundAlbums(data);
    setState({
      ...state,
      albums: ids,
    });
  };

  const handleSelectedAddSongs = (data) => {
    let ids = [];

    data.map((subData) => {
      ids.push(subData._id);
    });

    setFoundSongs(data);
    setState({
      ...state,
      songs: ids,
    });
  };

  useEffect(() => {
    const fetchSongs = async () => {
      let allSongs;
      let filterSongs = [];
      allSongs = await getSongs();
      setAllSongs(allSongs);
      // console.log(allSongs);
      state.songs.map((songId) => {
        allSongs.filter((song) => {
          if (song._id === songId) {
            filterSongs.push(song);
          }
        });
      });

      await setFoundSongs(filterSongs);
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseEdit}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Category
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <Imageupload imageSrc={state.categoryimage} />
            </div>
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h4>Category Detials</h4>
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Category Name"
                    type="text"
                    name="categoryname"
                    value={state.categoryname}
                    onChange={handleChange}
                  />
                  <br />

                  <br />
                  <br />
                </div>
                <div className="col-12 col-md-6">
                  <br />
                  <br />

                  <div>
                    <div>
                      <div className="row">
                        <div className="col-8">
                          <span style={{ fontSize: "25px" }}>Songs</span>
                        </div>
                        <div className="col-4">
                          <button
                            style={{ marginLeft: "20px", marginBottom: "7px" }}
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleSongsToggle}
                          >
                            {editSongs ? "X" : <EditIcon />}
                          </button>
                          <span>
                            {editSongs || addSongs ? (
                              <button
                                style={{
                                  marginLeft: "20px",
                                  marginBottom: "7px",
                                }}
                                className="btn btn-sm btn-outline-danger"
                                onClick={handleAddSongs}
                              >
                                {addSongs ? "X" : "+"}
                              </button>
                            ) : null}
                          </span>
                        </div>
                      </div>

                      {editSongs ? (
                        <div>
                          {foundSongs ? (
                            <List>
                              {foundSongs.map((song) => {
                                return (
                                  <ListItem>
                                    {console.log()}
                                    <ListItemText
                                      primary={song.songname}
                                      // secondary={secondary ? "Secondary text" : null}
                                    />
                                    <ListItemSecondaryAction>
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                      >
                                        <DeleteForeverIcon
                                          onClick={() =>
                                            deleteArtistSong(song._id)
                                          }
                                        />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                );
                              })}
                            </List>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    {addSongs ? (
                      <Selectsongsforartist
                        data={allSongs}
                        selectSongs={handleSelectedAddSongs}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
