import React, { useState, useEffect, useMemo } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import {
  addTopcharts,
  editTopcharts,
  getTopcharts,
} from "../Pagesactions/songsactions";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Icon from "@material-ui/core/Icon";
import SortIcon from "@material-ui/icons/Sort";
import Trendingtable from "../Components/Trendingtable";
import Addtrending from "../Components/Addtrending";
import Tabsvertical from "../Components/Tabsvertical.js";
import Addnewchart from "../Components/Addnewchart";
import { v4 as uuidv4 } from "uuid";

const Admintopcharts = () => {
  const [fetchedTopcharts, setFetchedTopcharts] = useState();
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState();
  const [newList, setNewList] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [sortState, setSortState] = useState(false);
  const [sortedList, setSortedList] = useState();
  const [updateData, setUpdateData] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNewList = async () => {
    setNewList(!newList);
  };

  const handleId = async (id) => {
    // console.log(id);
    setId(id);
  };

  const handleAddTopcharts = async (songs, name, image) => {
    let topcharts = [
      ...fetchedTopcharts,
      {
        topchart: songs,
        name: name,
        image: image,
        id: uuidv4(),
      },
    ];
    // addTrending(data);
    let res;
    res = await editTopcharts({ topcharts: topcharts, active: active });
    // console.log(res);

    setUpdateData(true);
  };

  const handleDeleteChart = async () => {
    let yooCharts = fetchedTopcharts;
    let filterCharts;
    filterCharts = yooCharts.filter((value) => {
      return value.id !== id;
    });

    let topcharts = [...filterCharts];
    let res;
    res = await editTopcharts({ topcharts: topcharts, active: active });
    // console.log(res);
    setId();
    setUpdateData(true);
  };

  const handleAddNewList = async (data) => {
    // console.log(data);
    fetchedTopcharts.map((value) => {
      if (value.id === id) {
        value.topchart = data;
      }
    });
    let yoo = fetchedTopcharts;
    let topcharts = [...yoo];
    let res;
    res = await editTopcharts({ topcharts: topcharts, active: active });
    // console.log(res);
    setUpdateData(true);
  };

  const handleDeleteList = async () => {
    fetchedTopcharts.map((value) => {
      if (value.id === id) {
        value.topchart = [];
      }
    });
    let yoo = fetchedTopcharts;
    let topcharts = [...yoo];
    let res;
    res = await editTopcharts({ topcharts: topcharts, active: active });
    // console.log(res);
    setUpdateData(true);
  };

  const handleNewSort = (sortedArray) => {
    // console.log(sortedArray);
    setSortedList(sortedArray);
    setSortState(true);
  };

  const handleSortList = async () => {
    setSortState(false);
    fetchedTopcharts.map((value) => {
      if (value.id === id) {
        value.topchart = sortedList;
      }
    });
    let yoo = fetchedTopcharts;
    let topcharts = [...yoo];
    let res;
    res = await editTopcharts({ topcharts: topcharts, active: active });
    // console.log(res);
    setUpdateData(true);
  };

  const handleDeleteSong = async (songId) => {
    let yooSongs = fetchedTopcharts;
    let filterSongs;
    yooSongs.map((value) => {
      if (value.id === id) {
        filterSongs = value.topchart.filter((song) => {
          return song._id !== songId;
        });
        value.topchart = filterSongs;
      }
    });

    let yoo = fetchedTopcharts;
    let topcharts = [...yoo];
    let res;
    res = await editTopcharts({ topcharts: topcharts, active: active });
    // console.log(res);
    setUpdateData(true);
  };

  useEffect(() => {
    const fetchTopcharts = async () => {
      let allTopcharts;
      allTopcharts = await getTopcharts();
      // console.log(allTopcharts);
      setFetchedTopcharts(allTopcharts[0].topcharts);
      setActive(allTopcharts[0].active);
      setSortedList(allTopcharts[0].topcharts);
      setSortState(false);
    };

    fetchTopcharts();
    setUpdateData(false);
  }, [updateData]);
  return (
    <div className="main">
      <div className="container">
        <h3>Top Charts</h3>
        <br />
        <br />
        <div className="row">
          {/* {console.log(fetchedTopcharts)} */}
          <div className="col-12 col-md-8">
            {fetchedTopcharts ? (
              <Tabsvertical
                data={fetchedTopcharts}
                handleDeleteSong={handleDeleteSong}
                handleNewSort={handleNewSort}
                handleId={handleId}
              />
            ) : null}
          </div>
          {id ? (
            <div className="col-12 col-md-2">
              <br />
              <button
                style={{ width: "120px" }}
                className="btn btn-sm btn-danger"
                onClick={handleOpenNewList}
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
              <br />
              <br />
              <button
                style={{ width: "120px" }}
                className="btn btn-sm btn-danger"
                onClick={handleDeleteChart}
              >
                <DeleteIcon /> Delete Chart
              </button>
            </div>
          ) : null}

          <div className="col-12 col-md-2">
            <h5 style={{ color: "white" }}> New Chart </h5>
            <Icon style={{ marginTop: "500px" }}>
              <AddCircleIcon
                style={{ color: "#F44040", fontSize: 35, marginTop: "10px" }}
                onClick={handleClickOpen}
              />
            </Icon>
            {open ? (
              <Addnewchart
                open={open}
                handleClose={handleClose}
                handleAddTopcharts={handleAddTopcharts}
              />
            ) : null}
            {newList ? (
              <Addtrending
                open={newList}
                handleClickOpen={handleOpenNewList}
                handleClose={handleOpenNewList}
                handleAddTrending={handleAddNewList}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admintopcharts;
