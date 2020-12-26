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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Addsong = ({ open, addSong, handleClose }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    songname: "",
    songimage: "",
    artists: [],
  });

  const [fetchedAlbums, setFetchedAlbums] = useState();
  const [fetchedSongs, setFetchedSongs] = useState();
  const [fetchedArtists, setFetchedArtists] = useState();
  const [selectArtists, setSelectArtists] = useState();
  const [onAddArtists, setOnAddArtists] = useState(false);
  const [file, setFile] = useState();

  const handleAddSong = useCallback(async (evt) => {
    evt.preventDefault();
    console.log(state);
    console.log(file);

    const data = new FormData();
    data.append("songname", state.songname);
    data.append("songimage", state.songimage);
    data.append("artists", state.artists);
    data.append("file", file);

    addSong(data);
    handleClose();
  });

  const handleOnAddArtists = () => {
    setOnAddArtists(!onAddArtists);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleArtists = useCallback(async (data) => {
    console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    await setSelectArtists(data);
    setState({
      ...state,
      artists: ids,
    });
  });

  const handleFile = (uploadedFile) => {
    setFile(uploadedFile);
  };

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

    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      console.log(allArtists);
      setFetchedArtists(allArtists);
    };

    fetchAlbums();
    fetchSongs();
    fetchArtists();
  }, []);

  return (
    <div>
      {console.log(state)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onSubmit={handleAddSong}
      >
        <DialogTitle id="form-dialog-title">Add Song</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Song Name"
            type="text"
            fullWidth
            name="songname"
            value={state.songname}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Song Image Link"
            type="text"
            fullWidth
            value={state.songimage}
            name="songimage"
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
                <Selectartistforsong
                  data={fetchedArtists}
                  selectArtists={handleArtists}
                />
              ) : null}
            </div>
          ) : null}
          <div className="flex">
            <Upload handleFile={handleFile} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSong} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addsong;
