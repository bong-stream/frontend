import React, { useState, useEffect, useCallback, useMemo } from "react";
import Selectalbumforartist from "../Components/Selectalbumforartist";
import Selectsongsforartist from "../Components/Selectsongsforartist";
import { getAlbums } from "../Pagesactions/albumactions";
import { getSongs } from "../Pagesactions/songsactions";
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

export default function Editartist({
  open,
  data,
  handleEditArtist,
  handleCloseEdit,
}) {
  const [state, setState] = useState({
    id: data.id,
    artistname: data.artistname,
    artistimage: data.artistimage,
    albums: data.albums,
    songs: data.songs,
  });
  console.log(data);
  const [allAlbums, setAllAlbums] = useState([]);
  const [foundAlbums, setFoundAlbums] = useState([]);
  const [editAlbums, setEditAlbums] = useState(false);
  const [addAlbums, setAddAlbums] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [foundSongs, setFoundSongs] = useState([]);
  const [editSongs, setEditSongs] = useState(false);
  const [addSongs, setAddSongs] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEditArtist(state);
    handleCloseEdit();
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const deleteArtistAlbum = async (id) => {
    let yoo;
    let ids = [];
    yoo = foundAlbums.filter((album) => {
      if (album._id !== id) {
        return album;
      }
    });
    foundAlbums.filter((album) => {
      if (album._id !== id) {
        ids.push(album._id);
      }
    });
    console.log(ids);
    await setFoundAlbums(yoo);
    await setState({
      ...state,
      albums: ids,
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

  const handleAlbumsToggle = () => {
    setEditAlbums(!editAlbums);
    setAddAlbums(false);
  };

  const handleAddAlbums = () => {
    handleAlbumsToggle();
    setAddAlbums(!addAlbums);
  };

  const handleSongsToggle = () => {
    setEditSongs(!editSongs);
    setAddSongs(false);
  };

  const handleAddSongs = () => {
    handleSongsToggle();
    setAddSongs(!addSongs);
  };

  const handleSelectedAddAlbums = (data) => {
    let ids = [];
    console.log(foundAlbums);
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
      albums: ids,
    });

    console.log(ids);
    console.log(data);
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

  const handleDeleteAlbum = useMemo(() => console.log(foundSongs), [
    foundSongs,
  ]);

  useEffect(() => {
    const fetchAlbums = async () => {
      let allAlbums;
      let filterAlbums = [];
      allAlbums = await getAlbums();
      setAllAlbums(allAlbums);
      console.log(allAlbums);
      state.albums.map((albumId) => {
        allAlbums.filter((album) => {
          if (album._id === albumId) {
            filterAlbums.push(album);
          }
        });
      });

      await setFoundAlbums(filterAlbums);
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

    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Artist</DialogTitle>
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
          <div>
            <div>
              <span style={{ fontSize: "25px" }}>Albums</span>

              <button
                style={{ marginLeft: "20px", marginBottom: "7px" }}
                className="btn btn-sm btn-danger"
                onClick={handleAlbumsToggle}
              >
                {editAlbums ? "X" : <EditIcon />}
              </button>
              <span>
                {editAlbums || addAlbums ? (
                  <button
                    style={{ marginLeft: "20px", marginBottom: "7px" }}
                    className="btn btn-sm btn-danger"
                    onClick={handleAddAlbums}
                  >
                    {addAlbums ? "X" : "+"}
                  </button>
                ) : null}
              </span>
              {editAlbums ? (
                <div>
                  {foundAlbums ? (
                    <List>
                      {foundAlbums.map((album) => (
                        <ListItem>
                          {console.log()}
                          <ListItemText
                            primary={album.albumname}
                            // secondary={secondary ? "Secondary text" : null}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteForeverIcon
                                onClick={() => deleteArtistAlbum(album._id)}
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
            {addAlbums ? (
              <Selectalbumforartist
                data={allAlbums}
                selectAlbums={handleSelectedAddAlbums}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
