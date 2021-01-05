import React, { useState, useEffect } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Topartiststable from "../Components/Topartiststable";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SortIcon from "@material-ui/icons/Sort";
import Addtopartists from "../Components/Addtopartists";
import { getTopartists, editTopartists } from "../Pagesactions/songsactions";

const Topartists = () => {
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
    console.log("i am running");
    setOpen(false);
  };

  const handleAddTrending = async (data) => {
    console.log(data);
    // addTrending(data);
    let res;
    res = await editTopartists({ topartists: data, active: active });
    console.log(res);
    setUpdateData(true);
  };

  const handleDeleteList = async () => {
    let yoo = [];
    let res;
    res = await editTopartists({ topartists: yoo, active: active });
    setUpdateData(true);
  };

  const handleDeleteSong = async (id) => {
    console.log(id);
    let trendingSongs = trending[0].trending;
    let filterSongs;
    filterSongs = await trendingSongs.filter((song) => {
      return song._id !== id;
    });
    console.log(filterSongs);
    // setTrending(filterSongs)
    let res;
    res = await editTopartists({ topartists: filterSongs, active: active });
    console.log(res);
    if (res) {
      console.log("i am running");
      setUpdateData(true);
    }
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
    let res;
    res = await editTopartists({ topartists: sortedList, active: active });
    setUpdateData(true);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      let allTrending;
      allTrending = await getTopartists();
      console.log(allTrending);
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
        <h2>Top Artists</h2>
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
                    {trending[0].topartists.length === 0 ? (
                      " Top Artists List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {console.log(trending[0].topartists)}
                        {trending ? (
                          <Topartiststable
                            data={trending[0].topartists}
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
              <Addtopartists
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

export default Topartists;
