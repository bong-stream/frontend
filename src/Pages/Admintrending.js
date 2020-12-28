import React, { useState, useEffect } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Trendingtable from "../Components/Trendingtable";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SortIcon from "@material-ui/icons/Sort";
import Addtrending from "../Components/Addtrending";
import {
  addTrending,
  editTrending,
  getTrending,
} from "../Pagesactions/songsactions";

const Admintrending = () => {
  const [open, setOpen] = React.useState(false);
  const [trending, setTrending] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [sortedList, setSortedList] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTrending = (data) => {
    console.log(data);
    // addTrending(data);
    editTrending(data);
    setUpdateData(true);
  };

  const handleDeleteList = () => {
    let yoo = [];
    editTrending(yoo);
    setUpdateData(true);
  };

  const handleDeleteSong = async (id) => {
    console.log(id);
    let trendingSongs = trending[0].trending;
    let filterSongs;
    filterSongs = trendingSongs.filter((song) => {
      return song._id !== id;
    });
    console.log(filterSongs);
    // setTrending(filterSongs)
    await editTrending(filterSongs);
    setUpdateData(true);
  };

  const handleNewSort = (sortedArray) => {
    // console.log(sortedArray);
    setSortedList(sortedArray);
    setSortState(true);
  };

  const handleSortList = async () => {
    console.log("hello g");
    console.log(sortedList);
    setSortState(false);

    await editTrending(sortedList);
    setUpdateData(true);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      let allTrending;
      allTrending = await getTrending();
      console.log(allTrending);
      setTrending(allTrending);
      setSortedList(allTrending);
      setSortState(false);
    };

    fetchTrending();
    setUpdateData(false);
  }, [updateData]);

  return (
    <div className="main">
      <div>
        <h2>Trending</h2>
        <br />
      </div>
      <div className="container">
        <div className="row">
          <div className="mb-4 col-12 col-md-2">
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
          <div className="col-12 col-md-8 text-center">
            <div className="row">
              <div className="col-0 col-md-2"></div>
              <div className="col-11 col-md-8">
                {trending ? (
                  <React.Fragment>
                    {trending[0].trending.length === 0 ? (
                      " Trending List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {trending ? (
                          <Trendingtable
                            data={trending[0].trending}
                            handleDeleteSong={handleDeleteSong}
                            handleNewSort={handleNewSort}
                          />
                        ) : null}
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
              </div>
              <div className="col-0 col-md-2"></div>
            </div>
          </div>
          <div className="col-12 col-md-2">
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

export default Admintrending;
