import React, { useState, useEffect, useCallback } from "react";
import { getAlbums } from "../Pagesactions/albumactions";
import { getSongs } from "../Pagesactions/songsactions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Selectalbumforartist from "../Components/Selectalbumforartist";
import Selectsongsforartist from "../Components/Selectsongsforartist";
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

const Addgenres = ({ open, addGenres, handleClose }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    genresname: "",
    genresimage: "",
    genresdescription: "",
    songs: [],
  });
  //   const [selectAlbums, setSelectAlbums] = useState([]);
  const [selectSongs, setSelectSongs] = useState([]);
  //   const [fetchedAlbums, setFetchedAlbums] = useState();
  const [fetchedSongs, setFetchedSongs] = useState();

  //   const [onAddAlbums, setOnAddAlbums] = useState(false);
  const [onAddSongs, setOnAddSongs] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setFetchedSongs(allSongs);
    };

    fetchSongs();
  }, []);

  const handleAddArtist = useCallback(async (evt) => {
    evt.preventDefault();
    addGenres(state);
    handleClose();
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleOnAddSongs = () => {
    setOnAddSongs(!onAddSongs);
  };
  const handleSongs = useCallback(async (data) => {
    // console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    await setSelectSongs(ids);
    setState({
      ...state,
      songs: ids,
    });
  });
  const handleImage = (id, image) => {
    // console.log(image);
    setState({
      ...state,
      genresimage: image,
    });
  };

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
              Add Genres
            </Typography>
            <Button color="inherit" onClick={handleAddArtist}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="container">
          <div className="row">
            <div className="col-12 col-md-4"></div>
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h4>Genre Details</h4>
                  <br />
                  <input
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Genre Name"
                    type="text"
                    name="genresname"
                    value={state.genresname}
                    onChange={handleChange}
                  />
                  <br />
                  <textarea
                    class="form-control"
                    autoFocus
                    margin="dense"
                    id="name"
                    rows="5"
                    placeholder="Genre Description"
                    type="text"
                    name="genresdescription"
                    value={state.genresdescription}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <Imageupload
                    className="mb-4"
                    id="albbumimage"
                    onInput={handleImage}
                  />
                  <br />
                  <button
                    className="btn btn-danger"
                    color="inherit"
                    onClick={handleAddArtist}
                  >
                    save
                  </button>
                </div>

                <div className="col-12 col-md-6">
                  <br />
                  <br />

                  <br />
                  <div className="row">
                    <div className="col-8">
                      <h5>Add Songs </h5>
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
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Addgenres;
