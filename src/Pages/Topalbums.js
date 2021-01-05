import React, { useState, useEffect } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Topalbumtable from "../Components/Topalbumtable";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SortIcon from "@material-ui/icons/Sort";
import Addtopalbums from "../Components/Addtopalbums";
import { getTopalbums, editTopalbums } from "../Pagesactions/songsactions";

const Topalbums = () => {
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
    res = await editTopalbums({ topalbums: data, active: active });
    console.log(res);
    setUpdateData(true);
  };

  const handleDeleteList = async () => {
    let yoo = [];
    let res;
    res = await editTopalbums({ topalbums: yoo, active: active });
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
    res = await editTopalbums({ topalbums: filterSongs, active: active });
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
    res = await editTopalbums({ topalbums: sortedList, active: active });
    setUpdateData(true);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      let allTrending;
      allTrending = await getTopalbums();
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
        <h2>Top Albums</h2>
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
                    {trending[0].topalbums.length === 0 ? (
                      " Top Albums List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {console.log(trending[0].topalbums)}
                        {trending ? (
                          <Topalbumtable
                            data={trending[0].topalbums}
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
              <Addtopalbums
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

export default Topalbums;
