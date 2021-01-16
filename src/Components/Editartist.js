import React, { useState, useEffect, useCallback, useMemo } from "react";
import Selectalbumforartist from "../Components/Selectalbumforartist";
import Selectsongsforartist from "../Components/Selectsongsforartist";
import { getAlbums } from "../Pagesactions/albumactions";
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

export default function Editartist({
  open,
  data,
  handleEditArtist,
  handleCloseEdit,
}) {
  const [state, setState] = useState({
    id: data.id,
    artistname: data.artistname,
    artistimage: data.artistimage,
    albums: data.albums,
    songs: data.songs,
    dob: data.dob,
    city: data.city,
    country: data.country,
    lastname: data.lastname,
  });
  // console.log(data);
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
    handleEditArtist(state);
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
    // console.log(foundAlbums);
    // console.log(data);
    // foundAlbums.map((yoo) => {
    //   dub = data.filter((subData) => {
    //     return subData._id !== yoo;
    //   });
    //   return dub;
    // });

    data.map((subData) => {
      ids.push(subData._id);
    });

    setFoundAlbums(data);
    setState({
      ...state,
      albums: ids,
    });

    // console.log(ids);
    // console.log(data);
  };

  const handleSelectedAddSongs = (data) => {
    let ids = [];
    // console.log(foundSongs);
    // console.log(data);
    // foundAlbums.map((yoo) => {
    //   dub = data.filter((subData) => {
    //     return subData._id !== yoo;
    //   });
    //   return dub;
    // });

    data.map((subData) => {
      ids.push(subData._id);
    });

    setFoundSongs(data);
    setState({
      ...state,
      songs: ids,
    });

    // console.log(ids);
    // console.log(data);
  };

  // const handleDeleteAlbum = useMemo(() => console.log(foundSongs), [
  //   foundSongs,
  // ]);

  useEffect(() => {
    const fetchAlbums = async () => {
      let allAlbums;
      let filterAlbums = [];
      allAlbums = await getAlbums();
      setAllAlbums(allAlbums);
      // console.log(allAlbums);
      state.albums.map((albumId) => {
        allAlbums.filter((album) => {
          if (album._id === albumId) {
            filterAlbums.push(album);
          }
        });
      });

      await setFoundAlbums(filterAlbums);
    };

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

    fetchAlbums();
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
              Edit Artist
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <Imageupload imageSrc={state.artistimage} />
            </div>
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h4>Artist Detials</h4>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Artist Name"
                    type="text"
                    name="artistname"
                    value={state.artistname}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    margin="dense"
                    id="name"
                    label="Last Name"
                    type="text"
                    name="lastname"
                    value={state.lastname}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="City"
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Country"
                    type="text"
                    name="country"
                    value={state.country}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    id="date"
                    label="Date of Birth"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="dob"
                    value={state.dob}
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
                          <span style={{ fontSize: "25px" }}>Albums</span>
                        </div>
                        <div className="col-4">
                          <button
                            style={{ marginLeft: "20px", marginBottom: "7px" }}
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleAlbumsToggle}
                          >
                            {editAlbums ? "X" : <EditIcon />}
                          </button>
                          <span>
                            {editAlbums || addAlbums ? (
                              <button
                                style={{
                                  marginLeft: "20px",
                                  marginBottom: "7px",
                                }}
                                className="btn btn-sm btn-outline-danger"
                                onClick={handleAddAlbums}
                              >
                                {addAlbums ? "X" : "+"}
                              </button>
                            ) : null}
                          </span>
                        </div>
                      </div>

                      {editAlbums ? (
                        <div>
                          {foundAlbums ? (
                            <List>
                              {foundAlbums.map((album) => {
                                return (
                                  <ListItem key={album._id}>
                                    {/* {console.log()} */}
                                    <ListItemText
                                      primary={album.albumname}
                                      // secondary={secondary ? "Secondary text" : null}
                                    />
                                    <ListItemSecondaryAction>
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                      >
                                        <DeleteForeverIcon
                                          onClick={() =>
                                            deleteArtistAlbum(album._id)
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
                    {addAlbums ? (
                      <Selectalbumforartist
                        data={allAlbums}
                        selectAlbums={handleSelectedAddAlbums}
                      />
                    ) : null}
                  </div>

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
