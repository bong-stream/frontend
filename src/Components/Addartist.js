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

const Addartist = ({ open, addArtist, handleClose }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    artistname: "",
    artistimage: "",
  });
  const [selectAlbums, setSelectAlbums] = useState([]);
  const [selectSongs, setSelectSongs] = useState([]);
  const [fetchedAlbums, setFetchedAlbums] = useState();
  const [fetchedSongs, setFetchedSongs] = useState();

  const [onAddAlbums, setOnAddAlbums] = useState(false);
  const [onAddSongs, setOnAddSongs] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      let allAlbums;
      allAlbums = await getAlbums();
      console.log(allAlbums);
      setFetchedAlbums(allAlbums);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      console.log(allSongs);
      setFetchedSongs(allSongs);
    };

    fetchAlbums();
    fetchSongs();
  }, []);

  const handleAddArtist = useCallback(async (evt) => {
    evt.preventDefault();
    console.log(state);
    console.log(selectAlbums);
    // await setState({
    //   ...state,
    //   albums: selectAlbums,
    // });
    // console.log(state);
    addArtist(state, selectAlbums, selectSongs);
    handleClose();
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleAlbums = useCallback(async (data) => {
    console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    await setSelectAlbums(ids);
  });

  const handleSongs = useCallback(async (data) => {
    console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    await setSelectSongs(ids);
  });

  const handleOnAddAlbums = () => {
    setOnAddAlbums(!onAddAlbums);
  };
  const handleOnAddSongs = () => {
    setOnAddSongs(!onAddSongs);
  };
  const handleImage = (id, image) => {
    console.log(image);
    setState({
      ...state,
      artistimage: image,
    });
  };

  return (
    <div>
      {console.log(selectAlbums)}
      {console.log(state)}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onSubmit={handleAddArtist}
      >
        <DialogTitle id="form-dialog-title">Add Artist</DialogTitle>
      </Dialog> */}
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
              Add Artist
            </Typography>
            <Button color="inherit" onClick={handleAddArtist}>
              save
            </Button>
          </Toolbar>
        </AppBar>
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
              <h4>Artist Details</h4>
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
              <br />
              <br />

              <div>
                <div className="row">
                  <div className="col-4">
                    <h5>Add Albums </h5>
                  </div>
                  <div className="col-4">
                    <a
                      className="btn btn-outline-danger"
                      onClick={handleOnAddAlbums}
                    >
                      {onAddAlbums ? "X" : "+"}
                    </a>
                  </div>
                </div>

                {onAddAlbums ? (
                  <div>
                    {fetchedAlbums ? (
                      <Selectalbumforartist
                        data={fetchedAlbums}
                        selectAlbums={handleAlbums}
                      />
                    ) : null}
                  </div>
                ) : null}

                <br />
                <div className="row">
                  <div className="col-4">
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
                    {fetchedAlbums ? (
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Addartist;
