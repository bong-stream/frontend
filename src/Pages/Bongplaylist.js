import React, { useState, useEffect } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Trendingtable from "../Components/Trendingtable";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SortIcon from "@material-ui/icons/Sort";
import Addtrending from "../Components/Addtrending";
import {
  getBongplaylist,
  editBongplaylist,
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

const Bongplaylist = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [trending, setTrending] = useState();
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

  const handleAddTrending = async (data) => {
    // console.log(data);
    // addTrending(data);
    let res;
    res = await editBongplaylist({ bongplaylist: data, active: active });
    // console.log(res);
    setUpdateData(true);
  };

  const handleDeleteList = async () => {
    let yoo = [];
    let res;
    res = await editBongplaylist({ bongplaylist: yoo, active: active });
    setUpdateData(true);
  };

  const handleDeleteSong = async (id) => {
    // console.log(id);
    // console.log(id, trending);
    let trendingSongs = trending[0].bongplaylist;
    let filterSongs;
    filterSongs = await trendingSongs.filter((song) => {
      return song._id !== id;
    });
    // console.log(filterSongs);
    // setTrending(filterSongs)
    let res;
    res = await editBongplaylist({ bongplaylist: filterSongs, active: active });
    // console.log(res);
    if (res) {
      // console.log("i am running");
      setUpdateData(true);
    }
  };

  const handleNewSort = (sortedArray) => {
    console.log(sortedArray);
    setSortedList(sortedArray);
    setSortState(true);
  };

  const handleSortList = async () => {
    // console.log("hello g");
    // console.log(sortedList);
    setSortState(false);
    let res;
    res = await editBongplaylist({ bongplaylist: sortedList, active: active });
    setUpdateData(true);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      let allTrending;
      allTrending = await getBongplaylist();
      // console.log(allTrending);
      setTrending(allTrending);
      setActive(allTrending[0].active);
      setSortedList(allTrending);
      setSortState(false);
    };

    fetchTrending();
    setUpdateData(false);
  }, [updateData]);

  return (
    <div className="main">
      <div>
        <h2>Bong Playlist</h2>
        <br />
      </div>
      <div className="container">
        <div className="row">
          <div className="mb-4 col-12 col-md-1"></div>
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
                {trending ? (
                  <React.Fragment>
                    {trending[0].bongplaylist.length === 0 ? (
                      " Bongplaylist List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {/* {console.log(trending[0].bongplaylist)} */}
                        <List className={classes.root}>
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${1 + 1}`}
                                // src={value.image}
                              />
                            </ListItemAvatar>
                            <h4 style={{ color: "black" }}>Bong Playlist</h4>
                          </ListItem>
                        </List>
                        {trending ? (
                          <Trendingtable
                            data={trending[0].bongplaylist}
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
              <Addtrending
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleAddTrending={handleAddTrending}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bongplaylist;
