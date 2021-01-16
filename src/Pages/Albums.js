import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import Albumstable from "../Components/Albumstable";
import Editalbum from "../Components/Editalbum";
import {
  getAlbums,
  addAlbums,
  deleteAlbums,
  editAlbums,
  activeAlbums,
} from "../Pagesactions/albumactions";
import { getSongs } from "../Pagesactions/songsactions";
import { getArtists } from "../Pagesactions/artistsactions";
import Icon from "@material-ui/core/Icon";
import FaceIcon from "@material-ui/icons/Face";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import NavigationIcon from "@material-ui/icons/Navigation";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Addalbum from "../Components/Addalbum";
import AlbumIcon from "@material-ui/icons/Album";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import "../Styles/adminpages.css";
import "../Styles/adminalbum.css";
import Viewalbum from "../Components/Viewalbum";
import Filters from "../Components/Filters";

const Albums = () => {
  const [albums, setAlbums] = useState();
  const [artists, setArtists] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [viewData, setViewData] = useState();
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editAlbumData, setEditAlbumData] = useState();

  useEffect(() => {
    const fetchAlbums = async () => {
      let allAlbums;
      allAlbums = await getAlbums();
      // console.log(allAlbums);
      setAlbums({ albums: allAlbums, columnToSort: "", sortDirection: "" });
    };
    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setSongs(allSongs);
    };

    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      // console.log(allArtists);
      setArtists(allArtists);
    };

    fetchSongs();

    fetchAlbums();
    setUpdateData(false);
  }, [updateData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditAlbumData();
    // console.log(editAlbumData);
  };

  const addAlbum = async (data) => {
    // console.log(data);

    let res = await addAlbums(data);
    setUpdateData(true);
  };

  const deleteAlbum = async (id) => {
    // console.log(id);
    let res;
    res = await deleteAlbums(id);
    setUpdateData(true);
  };

  const editAlbum = async (data) => {
    // console.log(data);

    await setEditAlbumData(data);
    setOpenEdit(true);
  };

  const handleEditAlbum = async (data) => {
    // console.log(data);
    let res;
    res = await editAlbums(data);
    setUpdateData(true);
  };

  const handleToggleView = () => {
    setOpenView(!openView);
  };
  const handleView = (data) => {
    // console.log(data);
    setViewData(data);
    handleToggleView();
  };

  const handleSearchChange = (evt) => {
    let yoo;
    setSearchValue(evt.target.value);
    // console.log(evt.target.value);
    yoo = albums.filter((album) => {
      return album.albumname
        .toLowerCase()
        .includes(evt.target.value.toLowerCase());
    });
    // console.log(yoo);
    setSearch(yoo);
  };
  const handleSortType = (type, columnName) => {
    setAlbums({
      ...albums,
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
    // console.log(active, id);
    let res = await activeAlbums(active, id);
    setUpdateData(true);
  };

  return (
    <div className="main album">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-0"></div>
          <div className="col-10 col-md-11">
            <Row>
              <Col className="mb-4" xl={6} md={6}>
                {albums ? (
                  <Card>
                    <Card.Body>
                      <Row className="align-items-center m-l-0">
                        <Col sm="auto">
                          {/* <i className="icon feather icon-book f-30 text-c-purple" /> */}
                          <AlbumIcon style={{ color: "#f44040" }} />
                        </Col>
                        <Col>
                          <h6 className="text-muted m-b-10">Total Albums</h6>
                          <h2 className="m-b-0">{albums.albums.length}</h2>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ) : null}
              </Col>
              <Col className="mb-4" xl={6} md={6}>
                <Card>
                  <Card.Body>
                    <Row className="align-items-center m-l-0">
                      <Col sm="auto">
                        <FavoriteIcon style={{ color: "#f44040" }} />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">
                          Total Albums likes
                        </h6>
                        <h2 className="m-b-0">0</h2>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4" xl={6} md={6}>
                <Card>
                  <Card.Body>
                    <Row className="align-items-center m-l-0">
                      <Col sm="auto">
                        {/* <i className="icon feather icon-users f-30 text-c-red" /> */}
                        <NavigationIcon style={{ color: "#f44040" }} />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">New Artists</h6>
                        <h2 className="m-b-0">0</h2>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4" xl={6} md={6}>
                <Card>
                  <Card.Body>
                    <Row className="align-items-center m-l-0">
                      <Col sm="auto">
                        {/* <i className="icon feather icon-award f-30 text-c-blue" /> */}
                        <PlayArrowIcon style={{ color: "#f44040" }} />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">Albums Played</h6>
                        <h2 className="m-b-0">0</h2>
                      </Col>
                    </Row>
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
                      placeholder="Search by Username"
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
                      name1: "Albums name A-Z",
                      name2: "Albums name Z-A",
                      date1: "Date up",
                      date2: "Date down",
                    }}
                    columnName={{
                      name1: "albumname",
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
            {albums ? (
              <Albumstable
                // data={searchValue.length > 0 ? search : albums.albums}
                data={
                  searchValue.length > 0
                    ? orderBy(search, albums.columnToSort, albums.sortDirection)
                    : orderBy(
                        albums.albums,
                        albums.columnToSort,
                        albums.sortDirection
                      )
                }
                handleDelete={deleteAlbum}
                handleEdit={editAlbum}
                handleView={handleView}
                className="mb-4"
                handleActiveChange={handleActiveChange}
              />
            ) : null}
            <Addalbum
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              addAlbum={addAlbum}
            />
            {editAlbumData ? (
              <Editalbum
                data={editAlbumData}
                open={openEdit}
                handleClickOpen={handleClickOpenEdit}
                handleCloseEdit={handleCloseEdit}
                handleEditAlbum={handleEditAlbum}
              />
            ) : null}
            {openView ? (
              <Viewalbum
                open={openView}
                handleToggleView={handleToggleView}
                data={viewData}
                albums={albums}
                songs={songs}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-0 mb-4">
            {/* <h3 style={{ color: "white" }}>New Album</h3>
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

export default Albums;
