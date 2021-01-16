import React, { useState, useEffect, useCallback } from "react";
import { getAlbums } from "../Pagesactions/albumactions";
import { getSongs } from "../Pagesactions/songsactions";
import { getArtists } from "../Pagesactions/artistsactions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Selectartistforsong from "../Components/Selectartistforsong";
import Upload from "../Components/Upload";
import Imageupload from "../Components/Imageupload";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Selectsongsforartist from "./Selectsongsforartist";

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

const Addsong = ({ open, addSong, handleClose }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    songname: "",
    songimage: "",
    artists: [],
    genres: "",
    lyrics: "",
    poet: "",
    mixmaster: "",
    producer: "",
    label: "",
    year: "",
    summary: "",
    relatedSongs: [],
  });

  const [fetchedAlbums, setFetchedAlbums] = useState();
  const [fetchedSongs, setFetchedSongs] = useState();
  const [fetchedArtists, setFetchedArtists] = useState();
  const [selectArtists, setSelectArtists] = useState();
  const [selectSongs, setSelectSongs] = useState([]);
  const [onAddArtists, setOnAddArtists] = useState(false);
  const [onAddRelatedSongs, setOnAddRelatedSongs] = useState(false);
  const [file, setFile] = useState();

  const handleAddSong = useCallback(async (evt) => {
    evt.preventDefault();
    // console.log(state);
    // console.log(file);

    const data = new FormData();
    data.append("songname", state.songname);
    data.append("songimage", state.songimage);
    data.append("artists", state.artists);
    data.append("genres", state.genres);
    data.append("lyrics", state.lyrics);
    data.append("poet", state.poet);
    data.append("mixmaster", state.mixmaster);
    data.append("producer", state.producer);
    data.append("label", state.label);
    data.append("year", state.year);
    data.append("summary", state.summary);
    data.append("relatedSongs", state.relatedSongs);
    data.append("file", file);

    addSong(data);
    handleClose();
  });

  const handleOnAddArtists = () => {
    setOnAddArtists(!onAddArtists);
  };
  const handleOnAddRelatedSongs = () => {
    setOnAddRelatedSongs(!onAddRelatedSongs);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleArtists = useCallback(async (data) => {
    // console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    await setSelectArtists(data);
    setState({
      ...state,
      artists: ids,
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
      relatedSongs: ids,
    });
  });

  const handleImage = (id, image) => {
    // console.log(image);
    setState({
      ...state,
      songimage: image,
    });
  };

  const handleFile = (uploadedFile) => {
    setFile(uploadedFile);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      let allAlbums;
      allAlbums = await getAlbums();
      // console.log(allAlbums);
      setFetchedAlbums(allAlbums);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setFetchedSongs(allSongs);
    };

    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      // console.log(allArtists);
      setFetchedArtists(allArtists);
    };

    fetchAlbums();
    fetchSongs();
    fetchArtists();
  }, []);

  return (
    <div>
      {/* {console.log(state)} */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onSubmit={handleAddSong}
      >
        <DialogTitle id="form-dialog-title">Add Song</DialogTitle>
      </Dialog>
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
              Add Song
            </Typography>
            <Button color="inherit" onClick={handleAddSong}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <div>
                <Imageupload
                  className="mb-4"
                  id="songimage"
                  onInput={handleImage}
                />
              </div>
              <br />
              <div className="flex">
                <Upload handleFile={handleFile} />
              </div>
            </div>
            <div className="col-12 col-md-8">
              <h4>Song Details</h4>
              <div className="row">
                <div className="col-12 col-md-6">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Song Name"
                    type="text"
                    name="songname"
                    value={state.songname}
                    onChange={handleChange}
                  />
                  <TextField
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
                    label="Song Poet"
                    type="text"
                    name="poet"
                    value={state.poet}
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
                    label="Year"
                    type="text"
                    name="year"
                    value={state.year}
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
                    margin="dense"
                    id="name"
                    multiline
                    rows={8}
                    label="Song Lyrics"
                    type="text"
                    name="lyrics"
                    value={state.lyrics}
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
                  <br />
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
                    {onAddArtists ? (
                      <div>
                        {fetchedArtists ? (
                          <Selectartistforsong
                            data={fetchedArtists}
                            selectArtists={handleArtists}
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-8">
                      <h5>Related Songs </h5>
                    </div>
                    <div className="col-4">
                      <a
                        className="btn btn-outline-danger"
                        onClick={handleOnAddRelatedSongs}
                      >
                        {onAddRelatedSongs ? "X" : "+"}
                      </a>
                    </div>
                    {onAddRelatedSongs ? (
                      <div>
                        {fetchedSongs ? (
                          <Selectsongsforartist
                            data={fetchedSongs}
                            selectSongs={handleSongs}
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSong} color="primary">
            Add
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default Addsong;
