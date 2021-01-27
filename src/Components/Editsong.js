import React, { useState, useEffect, useCallback } from "react";
import { getArtists } from "../Pagesactions/artistsactions";
import { getAlbums } from "../Pagesactions/albumactions";
import { getGenres } from "../Pagesactions/genresactions";
import { getCategory } from "../Pagesactions/categoryactions";
import { getSongs } from "../Pagesactions/songsactions";
import { makeStyles } from "@material-ui/core/styles";
import Selectartistforsong from "../Components/Selectartistforsong";
import Selectsongsforartist from "../Components/Selectsongsforartist";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
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

export default function Editsong({
  open,
  handleClickOpen,
  data,
  handleEditSong,
  handleCloseEdit,
}) {
  const [state, setState] = useState({
    id: data.id,
    songname: data.songname,
    songimage: data.songimage,
    artists: data.artists,
    songs: data.songs,
    genres: data.genres,
    albums: data.albums,
    category: data.category,
    poet: data.poet,
    label: data.label,
    mixmaster: data.mixmaster,
    producer: data.producer,
    summary: data.summary,
    lyrics: data.lyrics,
    year: data.year,
    relatedSongs: data.relatedSongs,
  });
  const classes = useStyles();

  // console.log(open, data);

  const [allArtists, setAllArtists] = useState([]);
  const [foundArtists, setFoundArtists] = useState([]);
  const [editArtists, setEditArtists] = useState(false);
  const [editRelatedSongs, setEditRelatedSongs] = useState(false);
  const [addRelatedSongs, setAddRelatedSongs] = useState(false);
  const [addArtists, setAddArtists] = useState(false);
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [fetchedAlbums, setFetchedAlbums] = useState([]);
  const [fetchedGenres, setFetchedGenres] = useState([]);
  const [fetchedCategory, setFetchedCategory] = useState([]);

  const [foundSongs, setFoundSongs] = useState([]);
  const [foundAlbums, setFoundAlbums] = useState([]);
  const [foundGenres, setFoundGenres] = useState([]);
  const [foundCategory, setFoundCategory] = useState([]);

  const [editSongs, setEditSongs] = useState(false);
  const [addSongs, setAddSongs] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(state);
    handleEditSong(state);
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

  const handleRelatedSongsToggle = () => {
    // console.log("yoo");
    setEditRelatedSongs(!editRelatedSongs);
    setAddRelatedSongs(false);
  };

  const handleAddArtists = () => {
    handleArtistsToggle();
    setAddArtists(!addArtists);
  };

  const handleAddRelatedSongs = () => {
    handleRelatedSongsToggle();
    setAddRelatedSongs(!addRelatedSongs);
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
    // console.log(foundArtists);
    // console.log(data);

    yoo = data.map((artist) => {
      return artist._id;
    });

    // console.log(yoo);

    setFoundArtists(data);
    setState({
      ...state,
      artists: yoo,
    });
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

  const deleteSongArtists = async (id) => {
    console.log(id);
    // console.log(foundArtists);
    let filterArtists;
    filterArtists = foundArtists.filter((artist) => {
      return id !== artist._id;
    });

    await setFoundArtists(filterArtists);
    await setState({
      ...state,
      artists: filterArtists,
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

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      let filterArtists = [];
      allArtists = await getArtists();
      setAllArtists(allArtists);
      // console.log(allArtists);

      state.artists.map((artistId) => {
        allArtists.filter((artist) => {
          if (artist._id === artistId) {
            filterArtists.push(artist);
          }
        });
      });

      // console.log(filterArtists);
      await setFoundArtists(filterArtists);
    };

    const fetchSongs = async () => {
      let allSongs;
      let filterSongs = [];
      allSongs = await getSongs();
      // console.log(allSongs);
      setFetchedSongs(allSongs);

      state.relatedSongs.map((songId) => {
        allSongs.filter((song) => {
          if (songId === song._id) {
            filterSongs.push(song);
          }
        });
      });

      // console.log(filterSongs);
      await setFoundSongs(filterSongs);
    };

    const fetchAlbums = async () => {
      let allAlbums;
      let filterAlbums = [];
      allAlbums = await getAlbums();
      // console.log(allAlbums);
      setFetchedAlbums(allAlbums);

      state.albums.map((songId) => {
        allAlbums.filter((song) => {
          if (songId === song._id) {
            filterAlbums.push(song);
          }
        });
      });

      // console.log(filterAlbums);
      await setFoundAlbums(filterAlbums);
    };
    const fetchGenres = async () => {
      let allSongs;
      let filterSongs = [];
      allSongs = await getSongs();
      // console.log(allSongs);
      setFetchedSongs(allSongs);

      state.relatedSongs.map((songId) => {
        allSongs.filter((song) => {
          if (songId === song._id) {
            filterSongs.push(song);
          }
        });
      });

      // console.log(filterSongs);
      await setFoundSongs(filterSongs);
    };
    const fetchCategory = async () => {
      let allSongs;
      let filterSongs = [];
      allSongs = await getSongs();
      // console.log(allSongs);
      setFetchedSongs(allSongs);

      state.relatedSongs.map((songId) => {
        allSongs.filter((song) => {
          if (songId === song._id) {
            filterSongs.push(song);
          }
        });
      });

      // console.log(filterSongs);
      await setFoundSongs(filterSongs);
    };

    fetchAlbums();
    fetchGenres();
    fetchCategory();
    fetchArtists();
    fetchSongs();
  }, []);

  return (
    <div>
      {/* {console.log(state)} */}
      <Dialog
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
        // onSubmit={handleSubmit}
      >
        <DialogTitle id="form-dialog-title">Edit Song</DialogTitle>
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
              Edit Song
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <Imageupload imageSrc={state.songimage} />
            </div>
            <div className="col-12 col-md-8">
              <h4>Song Details</h4>
              <div className="row">
                <div className="col-12 col-md-6">
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Song Name"
                    type="text"
                    name="songname"
                    value={state.songname}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Genres"
                    type="text"
                    name="genres"
                    value={state.genres}
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
                    placeholder="Poets"
                    type="text"
                    name="poet"
                    value={state.poet}
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
                    placeholder="Year of Release"
                    type="text"
                    name="year"
                    value={state.year}
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
                  <textarea
                    class="form-control"
                    margin="dense"
                    id="name"
                    multiline
                    rows="5"
                    placeholder="Lyrics"
                    type="text"
                    name="lyrics"
                    value={state.lyrics}
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
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="row">
                      <div className="col-8">
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
                              style={{
                                marginLeft: "20px",
                                marginBottom: "7px",
                              }}
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
                      {/* {console.log(foundArtists)} */}
                      {editArtists ? (
                        <List>
                          {foundArtists.map((artist) => {
                            return (
                              <ListItem>
                                <ListItemText
                                  primary={artist.artistname}
                                  // secondary={secondary ? "Secondary text" : null}
                                />
                                {/* {console.log(artist.artistname)} */}
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete">
                                    <DeleteForeverIcon
                                      onClick={() =>
                                        deleteSongArtists(artist._id)
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
                    {addArtists ? (
                      <Selectartistforsong
                        data={allArtists}
                        selectArtists={handleSelectedAddArtists}
                      />
                    ) : null}
                    {/* 
                    <div className="row">
                      <div className="col-8">
                        <span style={{ fontSize: "25px" }}>Album</span>
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
                              style={{
                                marginLeft: "20px",
                                marginBottom: "7px",
                              }}
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleAddArtists}
                            >
                              {addArtists ? "X" : "+"}
                            </button>
                          ) : null}
                        </span>
                      </div>
                    </div> */}
                    <div>
                      {/* {console.log(foundArtists)} */}
                      {editArtists ? (
                        <List>
                          {foundArtists.map((artist) => {
                            return (
                              <ListItem>
                                <ListItemText
                                  primary={artist.artistname}
                                  // secondary={secondary ? "Secondary text" : null}
                                />
                                {/* {console.log(artist.artistname)} */}
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete">
                                    <DeleteForeverIcon
                                      onClick={() =>
                                        deleteSongArtists(artist._id)
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
                    {addArtists ? (
                      <Selectartistforsong
                        data={allArtists}
                        selectArtists={handleSelectedAddArtists}
                      />
                    ) : null}

                    {/* <div className="row">
                      <div className="col-8">
                        <span style={{ fontSize: "25px" }}>Related Songs</span>
                      </div>
                      <div className="col-4">
                        <button
                          style={{ marginLeft: "20px", marginBottom: "7px" }}
                          className="btn btn-sm btn-outline-danger"
                          onClick={handleRelatedSongsToggle}
                        >
                          {editRelatedSongs ? "X" : <EditIcon />}
                        </button>
                        <span>
                          {editRelatedSongs || addRelatedSongs ? (
                            <button
                              style={{
                                marginLeft: "20px",
                                marginBottom: "7px",
                              }}
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleAddRelatedSongs}
                            >
                              {addRelatedSongs ? "X" : "+"}
                            </button>
                          ) : null}
                        </span>
                      </div>
                    </div> */}
                    {/* <div>
                      // {console.log(foundArtists)}
                      {editArtists ? (
                        <List>
                          {foundArtists.map((artist) => {
                            return (
                              <ListItem>
                                <ListItemText
                                  primary={artist.artistname}
                                  // secondary={secondary ? "Secondary text" : null}
                                />
                                // {console.log(artist.artistname)}
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete">
                                    <DeleteForeverIcon
                                      onClick={() =>
                                        deleteAlbumArtists(artist._id)
                                      }
                                    />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            );
                          })}
                        </List>
                      ) : null}
                    </div> */}
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
