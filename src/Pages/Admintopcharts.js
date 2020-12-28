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
import Trendingtable from "../Components/Trendingtable";
import Addchart from "../Components/Addchart";

const Admintopcharts = () => {
  const [open, setOpen] = React.useState(false);
  const [topcharts, setTopcharts] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [trending, setTrending] = useState();
  const [listName, setListName] = useState();

  const handleClickOpen = (name) => {
    console.log(name);
    setListName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCharts = (data, name) => {
    console.log(data, name);
  };

  useEffect(() => {
    const fetchTopcharts = async () => {
      let allTopcharts;
      allTopcharts = await getTopcharts();
      console.log(allTopcharts);
      setTopcharts(allTopcharts);
    };

    fetchTopcharts();

    const fetchTrending = async () => {
      let allTrending;
      allTrending = await getTrending();
      console.log(allTrending);
      setTrending(allTrending);
    };

    fetchTrending();
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
                  //   onClick={handleDeleteList}
                >
                  Delete List <DeleteIcon />
                </button>
              </div>
              <br />
              <div className="col-12 my-4">
                {trending ? (
                  <React.Fragment>
                    {trending[0].trending.length === 0 ? (
                      " Trending List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {trending ? (
                          <Trendingtable
                            data={trending[0].trending}
                            // handleDeleteSong={handleDeleteSong}
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
                  //   onClick={handleDeleteList}
                >
                  Delete List <DeleteIcon />
                </button>
              </div>
              <br />
              <div className="col-12 my-4">
                {trending ? (
                  <React.Fragment>
                    {trending[0].trending.length === 0 ? (
                      " Trending List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {trending ? (
                          <Trendingtable
                            data={trending[0].trending}
                            // handleDeleteSong={handleDeleteSong}
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
                  //   onClick={handleDeleteList}
                >
                  Delete List <DeleteIcon />
                </button>
              </div>
              <br />
              <div className="col-12 my-4">
                {trending ? (
                  <React.Fragment>
                    {trending[0].trending.length === 0 ? (
                      " Trending List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {trending ? (
                          <Trendingtable
                            data={trending[0].trending}
                            // handleDeleteSong={handleDeleteSong}
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
