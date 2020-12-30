import React, { useState, useEffect, useCallback } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import {
  addTopcharts,
  editTopcharts,
  getTopcharts,
} from "../Pagesactions/songsactions";
import {
  addTrending,
  editTrending,
  getTrending,
} from "../Pagesactions/songsactions";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SortIcon from "@material-ui/icons/Sort";
import Trendingtable from "../Components/Trendingtable";
import Addchart from "../Components/Addchart";

const Admintopcharts = () => {
  const [open, setOpen] = React.useState(false);
  const [topcharts, setTopcharts] = useState();
  const [top20, setTop20] = useState();
  const [top50, setTop50] = useState();
  const [top100, setTop100] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [listName, setListName] = useState();
  const [sortStateTop20, setSortStateTop20] = useState(false);
  const [sortStateTop50, setSortStateTop50] = useState(false);
  const [sortStateTop100, setSortStateTop100] = useState(false);
  const [sortedList, setSortedList] = useState();
  const [sortedListName, setSortedListName] = useState();

  const handleClickOpen = (name) => {
    console.log(name);
    setListName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCharts = async (topchart, name) => {
    // console.log(data, name);
    let data;
    let res;
    if (name === "top20") {
      data = {
        topchart,
        name,
        id: top20,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    } else if (name === "top50") {
      data = {
        topchart,
        name,
        id: top50,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    } else {
      data = {
        topchart,
        name,
        id: top100,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    }
  };

  const handleDeleteList = async (name) => {
    let data;
    let res;
    if (name === "top20") {
      data = {
        topchart: [],
        name,
        id: top20,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    } else if (name === "top50") {
      data = {
        topchart: [],
        name,
        id: top50,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    } else if (name === "top100") {
      data = {
        topchart: [],
        name,
        id: top100,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    }
  };

  const handleDeleteSong = async (id, name) => {
    console.log(id, name);
    let data;
    let res;
    let filterCharts;
    if (name === "top20") {
      let topchart = topcharts[0].topchart;
      filterCharts = topchart.filter((chart) => {
        return chart._id !== id;
      });
      data = {
        topchart: filterCharts,
        name,
        id: top20,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    } else if (name === "top50") {
      let topchart = topcharts[1].topchart;
      filterCharts = topchart.filter((chart) => {
        return chart._id !== id;
      });
      data = {
        topchart: filterCharts,
        name,
        id: top50,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    } else if (name === "top100") {
      let topchart = topcharts[2].topchart;
      filterCharts = topchart.filter((chart) => {
        return chart._id !== id;
      });
      data = {
        topchart: filterCharts,
        name,
        id: top100,
      };
      res = await editTopcharts(data);
      setUpdateData(true);
    }
  };

  const handleNewSort = (sortedArray, name) => {
    console.log(sortedArray, name);
    // console.log(sortedArray);
    setSortedList(sortedArray);
    setSortedListName(name);

    let data;
    if (name === "top20") {
      console.log("top20 running");
      setSortStateTop20(true);
      setSortStateTop50(false);
      setSortStateTop100(false);
    } else if (name === "top50") {
      console.log("top 50 runing");
      setSortStateTop20(false);
      setSortStateTop50(true);
      setSortStateTop100(false);
    } else if (name === "top100") {
      console.log("top 100 running");
      setSortStateTop20(false);
      setSortStateTop50(false);
      setSortStateTop100(true);
    }
  };

  const handleSortList = async () => {
    // console.log("hello g");
    // console.log(sortedList);
    // setSortState(false);
    // await editPopular(sortedList);
    // setUpdateData(true);
    console.log(sortedList, sortedListName);
    let data;
    if (sortedListName === "top20") {
      data = {
        topchart: sortedList,
        name: sortedListName,
        id: top20,
      };
      editTopcharts(data);
      setSortStateTop20(false);
      setUpdateData(true);
    } else if (sortedListName === "top50") {
      data = {
        topchart: sortedList,
        name: sortedListName,
        id: top50,
      };
      editTopcharts(data);
      setSortStateTop50(false);
      setUpdateData(true);
    } else if (sortedListName === "top100") {
      data = {
        topchart: sortedList,
        name: sortedListName,
        id: top100,
      };
      editTopcharts(data);
      setSortStateTop100(false);
      setUpdateData(true);
    }
  };

  useEffect(() => {
    const fetchTopcharts = async () => {
      let allTopcharts;
      allTopcharts = await getTopcharts();
      console.log(allTopcharts);
      setTopcharts(allTopcharts);
      allTopcharts.map((top) => {
        if (top.name === "top20") {
          setTop20(top._id);
        } else if (top.name === "top50") {
          setTop50(top._id);
        } else {
          setTop100(top._id);
        }
      });
      setSortStateTop20(false);
      setSortStateTop50(false);
      setSortStateTop100(false);
    };

    fetchTopcharts();

    setUpdateData(false);
  }, [updateData]);
  return (
    <div className="main">
      <h2>Top Charts</h2>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 my-4">
            <div className="row text-center">
              <div className="col-12 ">
                <h3>Top 20</h3>
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleClickOpen("top20")}
                >
                  New List <AddCircleIcon />
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteList("top20")}
                >
                  Delete List <DeleteIcon />
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={handleSortList}
                  disabled={sortStateTop20 ? false : true}
                >
                  <SortIcon /> Save Sort
                </button>
              </div>
              <br />
              <div className="col-12 my-4">
                {topcharts ? (
                  <React.Fragment>
                    {topcharts[0].topchart.length === 0 ? (
                      " Top 20 List is Empty"
                    ) : (
                      <div>
                        {topcharts ? (
                          <Trendingtable
                            data={topcharts[0].topchart}
                            handleDeleteSong={handleDeleteSong}
                            name="top20"
                            handleNewSort={handleNewSort}
                          />
                        ) : null}
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 my-4">
            <div className="row">
              <div className="col-12 ">
                <h3>Top 50</h3>
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleClickOpen("top50")}
                >
                  New List <AddCircleIcon />
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteList("top50")}
                >
                  Delete List <DeleteIcon />
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={handleSortList}
                  disabled={sortStateTop50 ? false : true}
                >
                  <SortIcon /> Save Sort
                </button>
              </div>
              <br />
              <div className="col-12 my-4">
                {topcharts ? (
                  <React.Fragment>
                    {topcharts[1].topchart.length === 0 ? (
                      " Top50 List is Empty"
                    ) : (
                      <div>
                        {topcharts ? (
                          <Trendingtable
                            data={topcharts[1].topchart}
                            handleDeleteSong={handleDeleteSong}
                            name="top50"
                            handleNewSort={handleNewSort}
                          />
                        ) : null}
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 my-4">
            <div className="row">
              <div className="col-12 ">
                <h3>Top 100</h3>
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleClickOpen("top100")}
                >
                  New List <AddCircleIcon />
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteList("top100")}
                >
                  Delete List <DeleteIcon />
                </button>
                <br />
                <br />
                <button
                  style={{ width: "120px" }}
                  className="btn btn-sm btn-danger"
                  onClick={handleSortList}
                  disabled={sortStateTop100 ? false : true}
                >
                  <SortIcon /> Save Sort
                </button>
              </div>
              <br />
              <div className="col-12 my-4">
                {topcharts ? (
                  <React.Fragment>
                    {topcharts[2].topchart.length === 0 ? (
                      " Top 100 List is Empty"
                    ) : (
                      <div>
                        {topcharts ? (
                          <Trendingtable
                            data={topcharts[2].topchart}
                            handleDeleteSong={handleDeleteSong}
                            name="top100"
                            handleNewSort={handleNewSort}
                          />
                        ) : null}
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
                {open ? (
                  <Addchart
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    handleAddCharts={handleAddCharts}
                    listName={listName}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admintopcharts;
