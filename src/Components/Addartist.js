import React, { useState, useEffect, useCallback } from "react";
import { getAlbums } from "../Pagesactions/albumactions";
import { getSongs } from "../Pagesactions/songsactions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Selectalbumforartist from "../Components/Selectalbumforartist";
import Selectsongsforartist from "../Components/Selectsongsforartist";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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

  return (
    <div>
      {console.log(selectAlbums)}
      {console.log(state)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onSubmit={handleAddArtist}
      >
        <DialogTitle id="form-dialog-title">Add Artist</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Artist Name"
            type="text"
            fullWidth
            name="artistname"
            value={state.artistname}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Artist Image Link"
            type="text"
            fullWidth
            value={state.artistimage}
            name="artistimage"
            onChange={handleChange}
          />
          <br />
          <br />

          <h5>
            Add Albums{" "}
            <a className="btn btn-outline-danger" onClick={handleOnAddAlbums}>
              {onAddAlbums ? "X" : "+"}
            </a>
          </h5>
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

          <h5>
            Add Songs{" "}
            <a className="btn btn-outline-danger" onClick={handleOnAddSongs}>
              {onAddSongs ? "X" : "+"}
            </a>
          </h5>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddArtist} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addartist;
