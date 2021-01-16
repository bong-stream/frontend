import React, { useState, useEffect } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Trendingtable from "../Components/Trendingtable";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SortIcon from "@material-ui/icons/Sort";
import Addpopular from "../Components/Addpopular";
import {
  addPopular,
  editPopular,
  getPopular,
} from "../Pagesactions/songsactions";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Adminpopular = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [popular, setPopular] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [sortedList, setSortedList] = useState();
  const [active, setActive] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPopular = async (data) => {
    // console.log(data);
    // addPopular(data);
    console.log("yoo");
    let res;

    res = await editPopular({ popular: data, active: active });
    setUpdateData(true);
  };

  const handleDeleteList = async () => {
    let yoo = [];
    let res;
    res = await editPopular({ popular: yoo, active: active });
    setUpdateData(true);
  };

  const handleDeleteSong = async (id) => {
    // console.log(id);
    let popularSongs = popular[0].popular;
    let filterSongs;
    filterSongs = popularSongs.filter((song) => {
      return song._id !== id;
    });
    // console.log(filterSongs);
    // setpopular(filterSongs)
    await editPopular({ popular: filterSongs, active: active });
    setUpdateData(true);
  };

  const handleNewSort = async (sortedArray) => {
    // console.log(sortedArray);
    await setSortedList(sortedArray);
    setSortState(true);
  };

  const handleSortList = async () => {
    // console.log("hello g");
    // console.log(sortedList);
    setSortState(false);

    let res;
    res = await editPopular({ popular: sortedList, active: active });
    setUpdateData(true);
  };

  useEffect(() => {
    const fetchPopular = async () => {
      let allPopular;
      allPopular = await getPopular();
      // console.log(allPopular);
      setPopular(allPopular);
      setActive(allPopular[0].active);
      setSortedList(allPopular);
      setSortState(false);
    };

    fetchPopular();
    setUpdateData(false);
  }, [updateData]);

  return (
    <div className="main">
      <div>
        <h2>Popular Songs</h2>
        <br />
      </div>
      <div className="container">
        <div className="row">
          <div className=" mb-4 col-12 col-md-1"></div>
          <div className="col-12 col-md-10 text-center">
            <div className="row">
              <div className="col-0 col-md-3">
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={handleClickOpen}
                >
                  <AddCircleIcon /> New List
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={handleDeleteList}
                >
                  <DeleteIcon /> Delete List
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={handleSortList}
                  disabled={sortState ? false : true}
                >
                  <SortIcon /> Save Sort
                </button>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center">
                {popular ? (
                  <React.Fragment>
                    {popular[0].popular.length === 0 ? (
                      " Popular List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        <List className={classes.root}>
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${1 + 1}`}
                                // src={value.image}
                              />
                            </ListItemAvatar>
                            <h4 style={{ color: "black" }}>Popular List</h4>
                          </ListItem>
                        </List>
                        {/* {console.log(popular[0].popular[0].popular)} */}
                        {popular ? (
                          <Trendingtable
                            data={popular[0].popular}
                            handleDeleteSong={handleDeleteSong}
                            handleNewSort={handleNewSort}
                          />
                        ) : null}
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
              </div>
              <div className="col-1 col-md-3"></div>
            </div>
          </div>
          <div className="col-12 col-md-1">
            {open ? (
              <Addpopular
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleAddPopular={handleAddPopular}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminpopular;
