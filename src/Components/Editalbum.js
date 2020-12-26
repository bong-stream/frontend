import React, { useState, useEffect, useCallback } from "react";
import { getArtists } from "../Pagesactions/artistsactions";
import { getSongs } from "../Pagesactions/songsactions";
import Selectartistforalbum from "../Components/Selectartistforalbum";
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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

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
  });

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
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
        // onSubmit={handleSubmit}
      >
        <DialogTitle id="form-dialog-title">Edit Artist</DialogTitle>
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
          <div>
            <div>
              <span style={{ fontSize: "25px" }}>Artist</span>

              <button
                style={{ marginLeft: "20px", marginBottom: "7px" }}
                className="btn btn-sm btn-danger"
                onClick={handleArtistsToggle}
              >
                {editArtists ? "X" : <EditIcon />}
              </button>
              <span>
                {editArtists || addArtists ? (
                  <button
                    style={{ marginLeft: "20px", marginBottom: "7px" }}
                    className="btn btn-sm btn-danger"
                    onClick={handleAddArtists}
                  >
                    {addArtists ? "X" : "+"}
                  </button>
                ) : null}
              </span>
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

          <div>
            <div>
              <span style={{ fontSize: "25px" }}>Songs</span>

              <button
                style={{ marginLeft: "20px", marginBottom: "7px" }}
                className="btn btn-sm btn-danger"
                onClick={handleSongsToggle}
              >
                {editSongs ? "X" : <EditIcon />}
              </button>
              <span>
                {editSongs || addSongs ? (
                  <button
                    style={{ marginLeft: "20px", marginBottom: "7px" }}
                    className="btn btn-sm btn-danger"
                    onClick={handleAddSongs}
                  >
                    {addSongs ? "X" : "+"}
                  </button>
                ) : null}
              </span>
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
                                onClick={() => deleteArtistSong(song._id)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update Album
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
