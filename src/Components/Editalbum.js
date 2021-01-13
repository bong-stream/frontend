import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getArtists } from "../Pagesactions/artistsactions";
import { getSongs } from "../Pagesactions/songsactions";
import Selectartistforalbum from "../Components/Selectartistforalbum";
import Selectsongsforartist from "../Components/Selectsongsforartist";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
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

export default function Editalbum({
  open,
  handleClickOpen,
  data,
  handleEditAlbum,
  handleCloseEdit,
}) {
  const [state, setState] = useState({
    id: data.id,
    albumname: data.albumname,
    albumimage: data.albumimage,
    artists: data.artists,
    songs: data.songs,
    tracks: data.tracks,
    genres: data.genres,
    duration: data.duration,
    poets: data.poets,
    mixmaster: data.mixmaster,
    producer: data.producer,
    label: data.label,
    year: data.year,
    summary: data.summary,
    otheralbums: data.otheralbums,
    relatedalbums: data.relatedalbums,
  });
  const classes = useStyles();

  const [allArtists, setAllArtists] = useState([]);
  const [foundArtists, setFoundArtists] = useState([]);
  const [editArtists, setEditArtists] = useState(false);
  const [addArtists, setAddArtists] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [foundSongs, setFoundSongs] = useState([]);
  const [editSongs, setEditSongs] = useState(false);
  const [addSongs, setAddSongs] = useState(false);

  console.log(data);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(state);
    handleEditAlbum(state);
    handleCloseEdit();
    // setState({
    //   albumname: "",
    //   albumimage: "",
    // });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleArtistsToggle = () => {
    setEditArtists(!editArtists);
    setAddArtists(false);
  };

  const handleAddArtists = () => {
    handleArtistsToggle();
    setAddArtists(!addArtists);
  };

  const handleSongsToggle = () => {
    setEditSongs(!editSongs);
    setAddSongs(false);
  };

  const handleAddSongs = () => {
    handleSongsToggle();
    setAddSongs(!addSongs);
  };

  const handleSelectedAddArtists = (data) => {
    let yoo;
    console.log(foundArtists);
    console.log(data);

    yoo = allArtists.filter((artist) => {
      return artist._id === data;
    });

    console.log(yoo);

    setFoundArtists(yoo[0]);
    setState({
      ...state,
      artists: yoo[0]._id,
    });
  };

  const handleSelectedAddSongs = (data) => {
    let ids = [];
    console.log(foundSongs);
    console.log(data);
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

    console.log(ids);
    console.log(data);
  };

  const deleteAlbumArtists = async (id) => {
    console.log(id);

    await setFoundArtists("");
    await setState({
      ...state,
      artists: "",
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
    console.log(ids);
    await setFoundSongs(yoo);
    await setState({
      ...state,
      songs: ids,
    });
  };

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      let filterArtists;
      allArtists = await getArtists();
      setAllArtists(allArtists);
      console.log(allArtists);

      allArtists.filter((artist) => {
        console.log(artist);
        console.log(state.artists);
        if (artist._id === state.artists) {
          filterArtists = artist;
        }
      });

      console.log(filterArtists);
      await setFoundArtists(filterArtists);
    };

    const fetchSongs = async () => {
      let allSongs;
      let filterSongs = [];
      allSongs = await getSongs();
      setAllSongs(allSongs);
      console.log(allSongs);
      state.songs.map((songId) => {
        allSongs.filter((song) => {
          if (song._id === songId) {
            filterSongs.push(song);
          }
        });
      });

      await setFoundSongs(filterSongs);
    };

    fetchArtists();
    fetchSongs();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
        // onSubmit={handleSubmit}
      >
        <DialogTitle id="form-dialog-title">Edit Artist</DialogTitle>
      </Dialog>
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
              Edit Album
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="container">
          <DialogContentText></DialogContentText>
          <div className="row">
            <div className="col-12 col-md-4">
              <Imageupload imageSrc={state.albumimage} />
            </div>
            <div className="col-12 col-md-8">
              <h4>Album Details</h4>
              <div className="row">
                <div className="col-12 col-md-6">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Album Name"
                    type="text"
                    name="albumname"
                    value={state.albumname}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="Number of Tracks"
                    type="text"
                    name="tracks"
                    value={state.tracks}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Genres"
                    type="text"
                    name="genres"
                    value={state.genres}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Album Duration"
                    type="text"
                    name="duration"
                    value={state.duration}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Album Poets"
                    type="text"
                    name="poets"
                    value={state.poets}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Mix and Master"
                    type="text"
                    name="mixmaster"
                    value={state.mixmaster}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Producer"
                    type="text"
                    name="producer"
                    value={state.producer}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Label"
                    type="text"
                    name="label"
                    value={state.label}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Year of Production"
                    type="text"
                    name="year"
                    value={state.year}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    multiline
                    rows={8}
                    label="Summary"
                    type="text"
                    name="summary"
                    value={state.summary}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                </div>
                <div className="col-12 col-md-6">
                  <div className="row">
                    <div className="col-8">
                      {" "}
                      <span style={{ fontSize: "25px" }}>Artist</span>
                    </div>
                    <div className="col-4">
                      <button
                        style={{ marginLeft: "20px", marginBottom: "7px" }}
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleArtistsToggle}
                      >
                        {editArtists ? "X" : <EditIcon />}
                      </button>
                      <span>
                        {editArtists || addArtists ? (
                          <button
                            style={{ marginLeft: "20px", marginBottom: "7px" }}
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleAddArtists}
                          >
                            {addArtists ? "X" : "+"}
                          </button>
                        ) : null}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div>
                      {editArtists ? (
                        <div>
                          {foundArtists ? (
                            <List>
                              <ListItem>
                                <ListItemText
                                  primary={foundArtists.artistname}
                                  // secondary={secondary ? "Secondary text" : null}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete">
                                    <DeleteForeverIcon
                                      onClick={() =>
                                        deleteAlbumArtists(foundArtists._id)
                                      }
                                    />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </List>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    {addArtists ? (
                      <Selectartistforalbum
                        data={allArtists}
                        selectArtists={handleSelectedAddArtists}
                      />
                    ) : null}
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <span style={{ fontSize: "25px" }}>Songs</span>
                    </div>
                    <div className="col-4">
                      {" "}
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
                            style={{ marginLeft: "20px", marginBottom: "7px" }}
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleAddSongs}
                          >
                            {addSongs ? "X" : "+"}
                          </button>
                        ) : null}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      {editSongs ? (
                        <div>
                          {foundSongs ? (
                            <List>
                              {foundSongs.map((song) => (
                                <ListItem>
                                  {console.log()}
                                  <ListItemText
                                    primary={song.songname}
                                    // secondary={secondary ? "Secondary text" : null}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                      <DeleteForeverIcon
                                        onClick={() =>
                                          deleteArtistSong(song._id)
                                        }
                                      />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              ))}
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
        {/* <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update Album
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
