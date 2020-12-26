import React, { useState, useEffect, useCallback } from "react";
import { getArtists } from "../Pagesactions/artistsactions";
import { getSongs } from "../Pagesactions/songsactions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Selectartistforalbum from "./Selectartistforalbum";
import Selectsongsforartist from "./Selectsongsforartist";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Addalbum({ open, addAlbum, handleClose }) {
  const classes = useStyles();

  const [state, setState] = useState({
    albumname: "",
    albumimage: "",
  });
  const [selectArtists, setSelectArtists] = useState([]);
  const [selectSongs, setSelectSongs] = useState([]);
  const [fetchedArtists, setFetchedArtists] = useState();
  const [fetchedSongs, setFetchedSongs] = useState();
  const [onAddArtists, setOnAddArtists] = useState(false);
  const [onAddSongs, setOnAddSongs] = useState(false);

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

  const handleArtists = useCallback(async (data) => {
    console.log(data);
    // let ids = [];
    // await data.map((subData) => ids.push(subData._id));

    await setSelectArtists(data);
    setState({
      ...state,
      artists: data,
    });
  });

  const handleSongs = useCallback(async (data) => {
    console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    console.log(ids);

    await setSelectSongs(ids);

    setState({
      ...state,
      songs: ids,
    });
  });

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      console.log(allArtists);
      setFetchedArtists(allArtists);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      console.log(allSongs);
      setFetchedSongs(allSongs);
    };

    fetchArtists();
    fetchSongs();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onSubmit={handleAddAlbum}
      >
        <DialogTitle id="form-dialog-title">Add Album</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Album Name"
            type="text"
            fullWidth
            name="albumname"
            value={state.albumname}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Album Image Link"
            type="text"
            fullWidth
            value={state.albumimage}
            name="albumimage"
            onChange={handleChange}
          />
          <br />
          <br />

          <h5>
            Add Artist{" "}
            <a className="btn btn-outline-danger" onClick={handleOnAddArtists}>
              {onAddArtists ? "X" : "+"}
            </a>
          </h5>
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

          <br />

          <h5>
            Add Songs{" "}
            <a className="btn btn-outline-danger" onClick={handleOnAddSongs}>
              {onAddSongs ? "X" : "+"}
            </a>
          </h5>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAlbum} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
