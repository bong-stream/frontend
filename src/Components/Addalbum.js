import React, { useState, useEffect, useCallback } from "react";
import { getArtists } from "../Pagesactions/artistsactions";
import { getSongs } from "../Pagesactions/songsactions";
import { getAlbums } from "../Pagesactions/albumactions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Selectartistforalbum from "./Selectartistforalbum";
import Selectsongsforartist from "./Selectsongsforartist";
import Selectalbumforartist from "./Selectalbumforartist";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Imageupload from "../Components/Imageupload";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

export default function Addalbum({ open, addAlbum, handleClose }) {
  const classes = useStyles();

  const [state, setState] = useState({
    albumname: "",
    albumimage: "",
    tracks: "",
    genres: "",
    duration: "",
    poets: "",
    mixmaster: "",
    producer: "",
    label: "",
    year: "",
    summary: "",
  });
  const [selectArtists, setSelectArtists] = useState([]);
  const [selectSongs, setSelectSongs] = useState([]);
  const [selectOtherAlbums, setSelectOtherAlbums] = useState([]);
  const [selectRelatedAlbums, setSelectRelatedAlbums] = useState([]);
  const [fetchedArtists, setFetchedArtists] = useState();
  const [fetchedSongs, setFetchedSongs] = useState();
  const [fetchedAlbums, setFetchedAlbums] = useState();
  const [onAddArtists, setOnAddArtists] = useState(false);
  const [onAddSongs, setOnAddSongs] = useState(false);
  const [onAddOtherAlbums, setOnAddOtherAlbums] = useState(false);
  const [onAddRelatedAlbums, setOnAddRelatedAlbums] = useState(false);

  const handleAddAlbum = (evt) => {
    evt.preventDefault();
    addAlbum(state);
    handleClose();
    setState({
      albumname: "",
      albumimage: "",
    });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleOnAddArtists = () => {
    setOnAddArtists(!onAddArtists);
  };
  const handleOnAddSongs = () => {
    setOnAddSongs(!onAddSongs);
  };

  const handleOnAddOtherAlbums = () => {
    setOnAddOtherAlbums(!onAddOtherAlbums);
  };
  const handleOnAddRelatedAlbums = () => {
    setOnAddRelatedAlbums(!onAddRelatedAlbums);
  };

  const handleArtists = useCallback(async (data) => {
    // console.log(data);

    await setSelectArtists(data);
    setState({
      ...state,
      artists: data,
    });
  });

  const handleSongs = useCallback(async (data) => {
    // console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    // console.log(ids);

    await setSelectSongs(ids);

    setState({
      ...state,
      songs: ids,
    });
  });

  const handleOtherAlbums = useCallback(async (data) => {
    // console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    // console.log(ids);

    await setSelectOtherAlbums(ids);

    setState({
      ...state,
      otheralbums: ids,
    });
  });

  const handleRelatedAlbums = useCallback(async (data) => {
    // console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    // console.log(ids);

    await setSelectRelatedAlbums(ids);

    setState({
      ...state,
      relatedalbums: ids,
    });
  });

  const handleImage = (id, image) => {
    // console.log(image);
    setState({
      ...state,
      albumimage: image,
    });
  };

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      // console.log(allArtists);
      setFetchedArtists(allArtists);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setFetchedSongs(allSongs);
    };

    const fetchAlbums = async () => {
      let allAlbums;
      allAlbums = await getAlbums();
      // console.log(allAlbums);
      setFetchedAlbums(allAlbums);
    };

    fetchArtists();
    fetchSongs();

    fetchAlbums();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
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
              Add Album
            </Typography>
            <Button color="inherit" onClick={handleAddAlbum}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <DialogContent className="container">
            <div className="row">
              <div className="col-12 col-md-4">
                <Imageupload
                  className="mb-4"
                  id="albbumimage"
                  onInput={handleImage}
                />
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
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Number of Tracks"
                      type="number"
                      name="tracks"
                      value={state.tracks}
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Genres"
                      type="text"
                      name="genres"
                      value={state.genres}
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Album Duration"
                      type="text"
                      name="duration"
                      value={state.duration}
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Poets"
                      type="text"
                      name="poets"
                      value={state.poets}
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Mix and Master"
                      type="text"
                      name="mixmaster"
                      value={state.mixmaster}
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Producer"
                      type="text"
                      name="producer"
                      value={state.producer}
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Label"
                      type="text"
                      name="label"
                      value={state.label}
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Year of Production"
                      type="text"
                      name="year"
                      value={state.year}
                      onChange={handleChange}
                    />
                    <br />
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
                    <br />
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="row">
                      <div className="col-8">
                        <h5>Add Artist </h5>
                      </div>
                      <div className="col-4">
                        <a
                          className="btn btn-outline-danger"
                          onClick={handleOnAddArtists}
                        >
                          {onAddArtists ? "X" : "+"}
                        </a>
                      </div>
                    </div>
                    <br />

                    {onAddArtists ? (
                      <div>
                        {fetchedArtists ? (
                          <Selectartistforalbum
                            data={fetchedArtists}
                            selectArtists={handleArtists}
                          />
                        ) : null}
                      </div>
                    ) : null}

                    <div className="row">
                      <div className="col-8">
                        <h5>Add Songs{"   "}</h5>
                      </div>
                      <div className="col-4">
                        <a
                          className="btn btn-outline-danger"
                          onClick={handleOnAddSongs}
                        >
                          {onAddSongs ? "X" : "+"}
                        </a>
                      </div>
                    </div>

                    {onAddSongs ? (
                      <div>
                        {fetchedSongs ? (
                          <Selectsongsforartist
                            data={fetchedSongs}
                            selectSongs={handleSongs}
                          />
                        ) : null}
                      </div>
                    ) : null}
                    <br />
                    <div className="row">
                      <div className="col-8">
                        <h5>Related Albums{"   "}</h5>
                      </div>
                      <div className="col-4">
                        <a
                          className="btn btn-outline-danger"
                          onClick={handleOnAddRelatedAlbums}
                        >
                          {onAddRelatedAlbums ? "X" : "+"}
                        </a>
                      </div>
                    </div>

                    {onAddRelatedAlbums ? (
                      <div>
                        {fetchedSongs ? (
                          <Selectalbumforartist
                            data={fetchedAlbums}
                            selectAlbums={handleRelatedAlbums}
                          />
                        ) : null}
                      </div>
                    ) : null}

                    <br />
                    <div className="row">
                      <div className="col-8">
                        <h5>Other Albums{"   "}</h5>
                      </div>
                      <div className="col-4">
                        <a
                          className="btn btn-outline-danger"
                          onClick={handleOnAddOtherAlbums}
                        >
                          {onAddOtherAlbums ? "X" : "+"}
                        </a>
                      </div>
                    </div>

                    {onAddOtherAlbums ? (
                      <div>
                        {fetchedSongs ? (
                          <Selectalbumforartist
                            data={fetchedAlbums}
                            selectAlbums={handleOtherAlbums}
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
