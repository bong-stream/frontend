import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";

import {
  getSongs,
  addSongs,
  editSongs,
  deleteSongs,
  activeSongs,
} from "../Pagesactions/songsactions";
import Songstable from "../Components/Songstable";
import Addsong from "../Components/Addsong";
import Editsong from "../Components/Editsong";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import seoAnalytics1 from "../Components/charts/sale-seo-analytics-1";
import seoAnalytics2 from "../Components/charts/sale-seo-analytics-2";
import seoAnalytics3 from "../Components/charts/sale-seo-analytics-3";
import seoAnalytics4 from "../Components/charts/sale-seo-analytics-4";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Icon from "@material-ui/core/Icon";
import "../Styles/adminpages.css";
import "../Styles/adminsong.css";
import Filters from "../Components/Filters";

const Songs = () => {
  const [songs, setSongs] = useState();
  const [totalDownloads, setTotalDownloads] = useState("0");
  const [open, setOpen] = React.useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editSongData, setEditSongData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = (data) => {
    setOpenEdit(true);
    // console.log(data);
    setEditSongData(data);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditSongData();
    // console.log(editSongData);
  };

  const handleEditSong = async (data) => {
    // console.log(data);
    let res;
    res = await editSongs(data);
    setUpdateData(true);
  };

  const addSong = async (data) => {
    // console.log(data);
    let res;
    res = await addSongs(data);
    // console.log(res);
    setUpdateData(true);
  };

  // const editSong = (data) => {
  // console.log(data);
  //   editSongs(data);
  //   setUpdateData(true);
  // };
  const deleteSong = async (id) => {
    // console.log(id);
    let res;
    res = await deleteSongs(id);
    setUpdateData(true);
  };

  const handleSearchChange = (evt) => {
    let yoo;
    setSearchValue(evt.target.value);
    // console.log(evt.target.value);
    yoo = songs.songs.filter((user) => {
      return user.songname
        .toLowerCase()
        .includes(evt.target.value.toLowerCase());
    });
    // console.log(yoo);
    setSearch(yoo);
  };

  const handleSortType = (type, columnName) => {
    setSongs({
      ...songs,
      columnToSort: columnName,
      sortDirection: type,
    });
    // this.setState((state) => ({
    //   columnToSort: columnName,
    //   sortDirection:
    //     state.columnToSort === columnName
    //       ? invertDirection[state.sortDirection]
    //       : "asc",
    // }));
  };

  const handleActiveChange = async (active, id) => {
    console.log(active, id);
    let res = await activeSongs(active, id);
    setUpdateData(true);
  };

  useEffect(() => {
    let allSongs = [];
    const fetchSongs = async () => {
      allSongs = await getSongs();
      console.log(allSongs);
      setSongs({ songs: allSongs, columnToSort: "", sortDirection: "" });

      let count = 0;
      allSongs.map((song) => {
        count += song.noofplays;
      });
      // console.log(count);
      // setTotalPlays(count);
    };
    // const countPlays = () => {

    // };

    fetchSongs();
    setUpdateData(false);
  }, [updateData]);

  return (
    <div className="main song">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-0"></div>
          <div className="col-10 col-md-11">
            <Row>
              <Col className="mb-4" md={6}>
                {songs ? (
                  <Card>
                    <Card.Body>
                      <MusicNoteIcon style={{ color: "#f44040" }} />
                      <h3>{songs.songs.length}</h3>
                      <p className="text-muted"> Total Songs</p>
                      <Chart {...seoAnalytics1} />
                    </Card.Body>
                  </Card>
                ) : null}
              </Col>
              <Col className="mb-4" md={6}>
                {totalDownloads ? (
                  <Card>
                    <Card.Body>
                      <CloudDownloadIcon style={{ color: "#f44040" }} />
                      <h3>{totalDownloads}</h3>
                      <p className="text-muted">Total Downloads</p>
                      <Chart {...seoAnalytics2} />
                    </Card.Body>
                  </Card>
                ) : null}
              </Col>
              <Col className="mb-4" md={6}>
                <Card>
                  <Card.Body>
                    <ViewStreamIcon style={{ color: "#f44040" }} />
                    <h3>0</h3>
                    <p className="text-muted">Total Streams</p>
                    <Chart {...seoAnalytics3} />
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4" md={6}>
                <Card>
                  <Card.Body>
                    <FavoriteIcon style={{ color: "#f44040" }} />
                    <h3>0</h3>
                    <p className="text-muted">Total Likes</p>
                    <Chart {...seoAnalytics4} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div>
              <div className="row">
                <div className="col-12 col-md-8 d-flex justify-content-start">
                  {" "}
                  <div class="input-group ">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search by Song Name"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <div class="input-group-append">
                      <button className="btn btn-danger">Search</button>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <Filters
                    handleSortType={handleSortType}
                    filterName={{
                      name1: "Song name A-Z",
                      name2: "Song name Z-A",
                      date1: "Date up",
                      date2: "Date down",
                    }}
                    columnName={{
                      name1: "songname",
                      name2: "date",
                    }}
                    type={{
                      asc: "asc",
                      desc: "desc",
                    }}
                  />
                  <button
                    className="btn  btn-sm btn-danger m-0"
                    onClick={handleClickOpen}
                  >
                    Add{" "}
                    <AddCircleIcon
                      style={{
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
            <br />

            {songs ? (
              <Songstable
                data={
                  searchValue.length > 0
                    ? orderBy(search, songs.columnToSort, songs.sortDirection)
                    : orderBy(
                        songs.songs,
                        songs.columnToSort,
                        songs.sortDirection
                      )
                }
                handleDelete={deleteSong}
                handleEdit={handleClickOpenEdit}
                className="mb-4"
                handleActiveChange={handleActiveChange}
              />
            ) : null}
            {open ? (
              <Addsong
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                addSong={addSong}
              />
            ) : null}
            {editSongData ? (
              <Editsong
                data={editSongData}
                open={openEdit}
                handleClickOpen={handleClickOpenEdit}
                handleCloseEdit={handleCloseEdit}
                handleEditSong={handleEditSong}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-0 mb-4">
            {/* <h3 style={{ color: "white" }}> Add New Song </h3>
            <Icon style={{ marginTop: "500px" }}>
              <AddCircleIcon
                style={{ color: "#F44040", fontSize: 50, marginTop: "10px" }}
                onClick={handleClickOpen}
              />
            </Icon> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songs;
