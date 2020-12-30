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

const Adminpopular = () => {
  const [open, setOpen] = React.useState(false);
  const [popular, setPopular] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [sortedList, setSortedList] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPopular = async (data) => {
    console.log(data);
    // addPopular(data);
    // console.log("yoo");
    let res;

    res = await editPopular(data);
    setUpdateData(true);
  };

  const handleDeleteList = async () => {
    let yoo = [];
    let res;
    res = await editPopular(yoo);
    setUpdateData(true);
  };

  const handleDeleteSong = async (id) => {
    console.log(id);
    let popularSongs = popular[0].popular;
    let filterSongs;
    filterSongs = popularSongs.filter((song) => {
      return song._id !== id;
    });
    console.log(filterSongs);
    // setpopular(filterSongs)
    await editPopular(filterSongs);
    setUpdateData(true);
  };

  const handleNewSort = async (sortedArray) => {
    // console.log(sortedArray);
    await setSortedList(sortedArray);
    setSortState(true);
  };

  const handleSortList = async () => {
    console.log("hello g");
    console.log(sortedList);
    setSortState(false);

    let res;
    res = await editPopular(sortedList);
    setUpdateData(true);
  };

  useEffect(() => {
    const fetchPopular = async () => {
      let allPopular;
      allPopular = await getPopular();
      console.log(allPopular);
      setPopular(allPopular);
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
          <div className=" mb-4 col-12 col-md-2">
            <button
              style={{ width: "120px" }}
              className="btn btn-sm btn-danger"
              onClick={handleClickOpen}
            >
              New List <AddCircleIcon />
            </button>
            <br />
            <br />
            <button
              style={{ width: "120px" }}
              className="btn btn-sm btn-danger"
              onClick={handleDeleteList}
            >
              Delete List <DeleteIcon />
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
            {open ? (
              <Addpopular
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleAddPopular={handleAddPopular}
              />
            ) : null}
          </div>
          <div className="col-12 col-md-8 ">
            <div className="row">
              <div className="col-0 col-md-2"></div>
              <div className="col-11 col-md-6">
                {popular ? (
                  <React.Fragment>
                    {popular[0].popular.length === 0 ? (
                      " Popular List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
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
              <div className="col-1 col-md-2"></div>
            </div>
          </div>
          <div className="col-12 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Adminpopular;
