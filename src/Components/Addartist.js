import React, { useState, useEffect, useCallback } from "react";
import { getAlbums } from "../Pagesactions/albumactions";
import { getSongs } from "../Pagesactions/songsactions";
import { getTags, getLabels, getProfession } from "../Pagesactions/infoactions";
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
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Selectinfo from "./Selectinfo";

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
    dob: "",
    lastname: "",
    city: "",
    country: "",
    gender: "",
    biography: "",
    tags: [],
    genres: [],
    profession: [],
    awards: "",
    website: "",
    label: [],
    rate: "",
  });
  const [selectAlbums, setSelectAlbums] = useState([]);
  const [selectSongs, setSelectSongs] = useState([]);
  const [fetchedAlbums, setFetchedAlbums] = useState();
  const [fetchedSongs, setFetchedSongs] = useState();
  const [fetchedTags, setFetchedTags] = useState();
  const [fetchedLabels, setFetchedLabels] = useState();
  const [fetchedProfession, setFetchedProfession] = useState();

  const [onAddAlbums, setOnAddAlbums] = useState(false);
  const [onAddSongs, setOnAddSongs] = useState(false);

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

    const fetchTags = async () => {
      let allTags;
      allTags = await getTags();
      // console.log(allTags);
      setFetchedTags(allTags);
    };
    const fetchLabels = async () => {
      let allLabels;
      allLabels = await getLabels();
      // console.log(allLabels);
      setFetchedLabels(allLabels);
    };
    const fetchProfession = async () => {
      let allProfession;
      allProfession = await getProfession();
      // console.log(allProfession);
      setFetchedProfession(allProfession);
    };

    fetchAlbums();
    fetchTags();
    fetchLabels();
    fetchProfession();
    fetchSongs();
  }, []);

  const handleAddArtist = useCallback(async (evt) => {
    evt.preventDefault();
    // console.log(state);
    // console.log(selectAlbums);
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
    // console.log(data);
    let ids = [];
    await data.map((subData) => ids.push(subData._id));

    await setSelectAlbums(ids);
  });

  const handleSongs = useCallback(async (data) => {
    // console.log(data);
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
    // console.log(image);
    setState({
      ...state,
      artistimage: image,
    });
  };

  const handleTags = (tags) => {
    let ids = [];
    tags.map((tag) => {
      ids.push(tag._id);
    });
    setState({
      ...state,
      tags: ids,
    });
  };
  const handleLabels = (labels) => {
    let ids = [];
    labels.map((label) => {
      ids.push(label._id);
    });
    setState({
      ...state,
      labels: ids,
    });
  };
  const handleProfession = (profession) => {
    let ids = [];
    profession.map((profession) => {
      ids.push(profession._id);
    });
    setState({
      ...state,
      profession: ids,
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
              Add Artist
            </Typography>
            <Button color="inherit" onClick={handleAddArtist}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="container">
          <br />
          <div className="row">
            <div className="col-12 col-md-4">
              <Imageupload
                className="mb-4"
                id="albbumimage"
                onInput={handleImage}
              />
            </div>
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 col-md-12">
                  <h4>Artist Details</h4>
                  <label>Name</label>
                  <br />
                  <TextField
                    style={{ width: "350px" }}
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Artist Name"
                    type="text"
                    name="artistname"
                    value={state.artistname}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label>Last Name</label>
                  <br />
                  <TextField
                    style={{ width: "350px" }}
                    margin="dense"
                    id="name"
                    placeholder="Last Name"
                    type="text"
                    name="lastname"
                    value={state.lastname}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label>Gender</label>
                  <br />

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.gender}
                    onChange={handleChange}
                    name="gender"
                    style={{ width: "350px" }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Rather Not Say">Rather Not Say</MenuItem>
                  </Select>
                  <br />
                  <br />
                  <label>Select Tags</label>
                  <br />
                  {console.log(fetchedTags)}
                  <Selectinfo
                    data={fetchedTags}
                    handleSelectedInfo={handleTags}
                    name="Tags"
                  />
                  <br />
                  <br />
                  <label>Select Labels</label>
                  <br />
                  {console.log(fetchedTags)}
                  <Selectinfo
                    data={fetchedLabels}
                    handleSelectedInfo={handleLabels}
                    name="Labels"
                  />
                  <br />
                  <br />
                  <label>Select Profession</label>
                  <br />
                  <Selectinfo
                    data={fetchedProfession}
                    handleSelectedInfo={handleProfession}
                    name="Profession"
                  />
                  <br />
                  <br />
                  <label>City</label>
                  <br />
                  <TextField
                    style={{ width: "350px" }}
                    margin="dense"
                    id="name"
                    placeholder="Artist City"
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label>Country</label>
                  <br />
                  <TextField
                    style={{ width: "350px" }}
                    margin="dense"
                    id="name"
                    placeholder="Artist Country"
                    type="text"
                    name="country"
                    value={state.country}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label>Website URL</label>
                  <br />
                  <TextField
                    style={{ width: "350px" }}
                    margin="dense"
                    id="name"
                    placeholder="Website URL"
                    type="url"
                    name="website"
                    value={state.website}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label>Biography</label>
                  <br />
                  <TextField
                    margin="dense"
                    style={{ width: "350px" }}
                    id="name"
                    multiline
                    rows={4}
                    placeholder="Biography"
                    type="text"
                    name="biography"
                    value={state.biography}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label>Awards</label>
                  <br />
                  <TextField
                    margin="dense"
                    style={{ width: "350px" }}
                    id="name"
                    multiline
                    rows={4}
                    placeholder="Awards"
                    type="text"
                    name="awards"
                    value={state.awards}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label>Date of Birth</label>
                  <br />
                  <TextField
                    style={{ width: "350px" }}
                    id="date"
                    placeholder="Date of Birth"
                    type="date"
                    defaultValue="2021-01-15"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="dob"
                    value={state.dob}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                </div>

                <div className="col-12 col-md-6">
                  <br />
                  <div className="row">
                    <div className="col-8">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Addartist;
