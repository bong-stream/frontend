import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getArtists } from "../Pagesactions/artistsactions";
import { getSongs } from "../Pagesactions/songsactions";
import { getAlbums } from "../Pagesactions/albumactions";
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
import Selectalbumforartist from "./Selectalbumforartist";

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
  const [allAlbums, setAllAlbums] = useState([]);
  const [foundAlbums, setFoundAlbums] = useState([]);
  const [editAlbums, setEditAlbums] = useState(false);
  const [addAlbums, setAddAlbums] = useState(false);
  const [allRelatedAlbums, setAllRelatedAlbums] = useState([]);
  const [foundRelatedAlbums, setFoundRelatedAlbums] = useState([]);
  const [editRelatedAlbums, setEditRelatedAlbums] = useState(false);
  const [addRelatedAlbums, setAddRelatedAlbums] = useState(false);
  const [allOtherAlbums, setAllOtherAlbums] = useState([]);
  const [foundOtherAlbums, setFoundOtherAlbums] = useState([]);
  const [editOtherAlbums, setEditOtherAlbums] = useState(false);
  const [addOtherAlbums, setAddOtherAlbums] = useState(false);

  console.log(data);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(state);
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
  const handleOtherAlbumsToggle = () => {
    setEditOtherAlbums(!editOtherAlbums);
    setAddOtherAlbums(false);
  };

  const handleAddOtherAlbums = () => {
    handleOtherAlbumsToggle();
    setAddOtherAlbums(!addOtherAlbums);
  };
  const handleRelatedAlbumsToggle = () => {
    setEditRelatedAlbums(!editRelatedAlbums);
    setAddRelatedAlbums(false);
  };

  const handleAddRelatedAlbums = () => {
    handleRelatedAlbumsToggle();
    setAddRelatedAlbums(!addRelatedAlbums);
  };

  const handleSelectedAddArtists = (data) => {
    let yoo;
    // console.log(foundArtists);
    // console.log(data);

    yoo = allArtists.filter((artist) => {
      return artist._id === data;
    });

    // console.log(yoo);

    setFoundArtists(yoo[0]);
    setState({
      ...state,
      artists: yoo[0]._id,
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

    // console.log(ids);
    // console.log(data);
  };

  const handleSelectedOtherAlbums = (data) => {
    let ids = [];
    console.log(data);
    data.map((subData) => {
      ids.push(subData._id);
    });

    setFoundOtherAlbums(data);
    setState({
      ...state,
      otheralbums: ids,
    });
  };

  const handleSelectedRelatedAlbums = (data) => {
    let ids = [];
    console.log(data);
    data.map((subData) => {
      ids.push(subData._id);
    });

    setFoundRelatedAlbums(data);
    setState({
      ...state,
      relatedalbums: ids,
    });
  };

  const deleteAlbumArtists = async (id) => {
    // console.log(id);

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
    // console.log(ids);
    await setFoundSongs(yoo);
    await setState({
      ...state,
      songs: ids,
    });
  };

  const deleteOtherAlbum = async (id) => {
    let yoo;
    let ids = [];
    yoo = foundOtherAlbums.filter((album) => {
      if (album._id !== id) {
        return album;
      }
    });
    foundOtherAlbums.filter((album) => {
      if (album._id !== id) {
        ids.push(album._id);
      }
    });
    console.log(ids);
    console.log(yoo);
    await setFoundOtherAlbums(yoo);
    await setState({
      ...state,
      otheralbums: ids,
    });
  };

  const deleteRelatedAlbum = async (id) => {
    let yoo;
    let ids = [];
    yoo = foundRelatedAlbums.filter((album) => {
      if (album._id !== id) {
        return album;
      }
    });
    foundRelatedAlbums.filter((album) => {
      if (album._id !== id) {
        ids.push(album._id);
      }
    });
    console.log(ids);
    console.log(yoo);
    await setFoundRelatedAlbums(yoo);
    await setState({
      ...state,
      relatedalbums: ids,
    });
  };

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      let filterArtists;
      allArtists = await getArtists();
      setAllArtists(allArtists);
      // console.log(allArtists);

      allArtists.filter((artist) => {
        // console.log(artist);
        // console.log(state.artists);
        if (artist._id === state.artists) {
          filterArtists = artist;
        }
      });

      // console.log(filterArtists);
      await setFoundArtists(filterArtists);
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

    const fetchAlbums = async () => {
      let allAlbums;
      let filterOtherAlbums = [];
      let filterRelatedAlbums = [];
      allAlbums = await getAlbums();
      setAllAlbums(allAlbums);
      console.log(allAlbums);
      console.log(state);
      if (state.relatedalbums !== null && state.relatedalbums !== undefined) {
        state.relatedalbums.map((albumId) => {
          allAlbums.filter((album) => {
            if (
              album.relatedalbums !== null &&
              album.relatedalbums !== undefined
            ) {
              album.relatedalbums.map((relatedId) => {
                if (relatedId === albumId) {
                  filterRelatedAlbums.push(album);
                }
              });
            }
          });
        });
      }

      if (state.otheralbums !== null && state.otheralbums !== undefined) {
        state.otheralbums.map((albumId) => {
          allAlbums.filter((album) => {
            if (album.otheralbums !== null && album.otheralbums !== undefined) {
              album.otheralbums.map((otherId) => {
                if (otherId === albumId) {
                  filterOtherAlbums.push(album);
                }
              });
            }
          });
        });
      }

      console.log(filterOtherAlbums);
      console.log(filterRelatedAlbums);

      await setFoundOtherAlbums(filterOtherAlbums);
      await setFoundRelatedAlbums(filterRelatedAlbums);

      // await setFoundAlbums(filterAlbums);
    };

    fetchAlbums();

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
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Album Name"
                    type="text"
                    name="albumname"
                    value={state.albumname}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    margin="dense"
                    id="name"
                    placeholder="Number of Tracks"
                    type="text"
                    name="tracks"
                    value={state.tracks}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Album Duration"
                    type="text"
                    name="duration"
                    value={state.duration}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Album Poets"
                    type="text"
                    name="poets"
                    value={state.poets}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Mix and Master"
                    type="text"
                    name="mixmaster"
                    value={state.mixmaster}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Producer"
                    type="text"
                    name="producer"
                    value={state.producer}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Label"
                    type="text"
                    name="label"
                    value={state.label}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Year of Production"
                    type="text"
                    name="year"
                    value={state.year}
                    onChange={handleChange}
                  />
                  <br />
                  <textarea
                    class="form-control"
                    margin="dense"
                    id="name"
                    multiline
                    rows="5"
                    placeholder="Summary"
                    type="text"
                    name="summary"
                    value={state.summary}
                    onChange={handleChange}
                  />
                  <br />
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
                                  {/* {console.log()} */}
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
                  <div className="row">
                    <div className="col-8">
                      <span style={{ fontSize: "25px" }}>Other Albums</span>
                    </div>
                    <div className="col-4">
                      {" "}
                      <button
                        style={{ marginLeft: "20px", marginBottom: "7px" }}
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleOtherAlbumsToggle}
                      >
                        {editOtherAlbums ? "X" : <EditIcon />}
                      </button>
                      <span>
                        {editOtherAlbums || addOtherAlbums ? (
                          <button
                            style={{ marginLeft: "20px", marginBottom: "7px" }}
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleAddOtherAlbums}
                          >
                            {addOtherAlbums ? "X" : "+"}
                          </button>
                        ) : null}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      {editOtherAlbums ? (
                        <div>
                          {foundOtherAlbums ? (
                            <List>
                              {foundOtherAlbums.map((album) => (
                                <ListItem>
                                  {/* {console.log()} */}
                                  <ListItemText
                                    primary={album.albumname}
                                    // secondary={secondary ? "Secondary text" : null}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                      <DeleteForeverIcon
                                        onClick={() =>
                                          deleteOtherAlbum(album._id)
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
                    {addOtherAlbums ? (
                      <Selectalbumforartist
                        data={allAlbums}
                        selectAlbums={handleSelectedOtherAlbums}
                      />
                    ) : null}
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <span style={{ fontSize: "25px" }}>Related Albums</span>
                    </div>
                    <div className="col-4">
                      {" "}
                      <button
                        style={{ marginLeft: "20px", marginBottom: "7px" }}
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleRelatedAlbumsToggle}
                      >
                        {editRelatedAlbums ? "X" : <EditIcon />}
                      </button>
                      <span>
                        {editRelatedAlbums || addRelatedAlbums ? (
                          <button
                            style={{ marginLeft: "20px", marginBottom: "7px" }}
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleAddRelatedAlbums}
                          >
                            {addRelatedAlbums ? "X" : "+"}
                          </button>
                        ) : null}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      {editRelatedAlbums ? (
                        <div>
                          {foundRelatedAlbums ? (
                            <List>
                              {foundRelatedAlbums.map((album) => (
                                <ListItem>
                                  {/* {console.log()} */}
                                  <ListItemText
                                    primary={album.albumname}
                                    // secondary={secondary ? "Secondary text" : null}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                      <DeleteForeverIcon
                                        onClick={() =>
                                          deleteRelatedAlbum(album._id)
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
                    {addRelatedAlbums ? (
                      <Selectalbumforartist
                        data={allAlbums}
                        selectAlbums={handleSelectedRelatedAlbums}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
