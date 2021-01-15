import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import Artiststable from "../Components/Artiststable";
import Addartist from "../Components/Addartist";
import Editartist from "../Components/Editartist";
import {
  getArtists,
  addArtists,
  deleteArtists,
  editArtists,
  activeArtists,
} from "../Pagesactions/artistsactions";
import { getAlbums } from "../Pagesactions/albumactions";
import { getSongs } from "../Pagesactions/songsactions";
import Icon from "@material-ui/core/Icon";
import FaceIcon from "@material-ui/icons/Face";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import NavigationIcon from "@material-ui/icons/Navigation";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import Viewartist from "../Components/Viewartist";
import "../Styles/adminpages.css";
import "../Styles/adminartist.css";
import Filters from "../Components/Filters";

const Artist = () => {
  const [artists, setArtists] = useState();
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [editArtistData, setEditArtistData] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [viewData, setViewData] = useState();
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [totalActiveArtists, setTotalActiveArtists] = useState();

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      let activeArtists;
      allArtists = await getArtists();
      console.log(allArtists);
      setArtists({ artists: allArtists, columnToSort: "", sortDirection: "" });
      activeArtists = allArtists.filter((user) => {
        return user.active === true;
      });
      console.log(activeArtists);
      setTotalActiveArtists(activeArtists.length);
    };
    const fetchAlbums = async () => {
      let allAlbums;
      allAlbums = await getAlbums();
      console.log(allAlbums);
      setAlbums(allAlbums);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      console.log(allSongs);
      setSongs(allSongs);
    };

    fetchSongs();

    fetchAlbums();

    fetchArtists();
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
    setEditArtistData();
    console.log(editArtistData);
  };

  const addArtist = async (data, albums, songs) => {
    console.log(data, albums, songs);
    let res;
    res = await addArtists(data, albums, songs);
    setUpdateData(true);
  };

  const deleteArtist = async (id) => {
    console.log(id);
    let res;
    res = await deleteArtists(id);
    setUpdateData(true);
  };

  const editArtist = async (data) => {
    console.log(data);
    await setEditArtistData(data);
    setOpenEdit(true);
  };

  const handleEditArtist = async (data) => {
    console.log(data);
    let res;
    res = await editArtists(data);
    console.log(res);
    setUpdateData(true);
  };

  const handleToggleView = () => {
    setOpenView(!openView);
  };

  const handleView = (data) => {
    console.log(data);
    setViewData(data);
    handleToggleView();
  };

  const handleSearchChange = (evt) => {
    let yoo;
    setSearchValue(evt.target.value);
    console.log(evt.target.value);
    yoo = artists.artists.filter((user) => {
      return user.artistname
        .toLowerCase()
        .includes(evt.target.value.toLowerCase());
    });
    console.log(yoo);
    setSearch(yoo);
  };
  const handleSortType = (type, columnName) => {
    setArtists({
      ...artists,
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
    let res = await activeArtists(active, id);
    setUpdateData(true);
  };

  return (
    <div className="main artist">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-0"></div>
          <div className="col-10 col-md-11 ">
            <Row>
              <Col className="mb-4" xl={6} md={6}>
                {artists ? (
                  <Card>
                    <Card.Body>
                      <Row className="align-items-center m-l-0">
                        <Col sm="auto">
                          {/* <i className="icon feather icon-book f-30 text-c-purple" /> */}
                          <FaceIcon style={{ color: "#f44040" }} />
                        </Col>
                        <Col>
                          <h6 className="text-muted m-b-10">Total Artists</h6>
                          <h2 className="m-b-0">{artists.artists.length}</h2>
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
                          Total artists likes
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
                        <i className="icon feather icon-award f-30 text-c-blue" />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">Active Artists</h6>
                        <h2 className="m-b-0">{totalActiveArtists}</h2>
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
                      name1: "Artist name A-Z",
                      name2: "Artist name Z-A",
                      date1: "Date up",
                      date2: "Date down",
                    }}
                    columnName={{
                      name1: "artistname",
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
            {console.log(artists)}
            {artists ? (
              <Artiststable
                // data={searchValue.length > 0 ? search : artists.artists}
                data={
                  searchValue.length > 0
                    ? orderBy(
                        search,
                        artists.columnToSort,
                        artists.sortDirection
                      )
                    : orderBy(
                        artists.artists,
                        artists.columnToSort,
                        artists.sortDirection
                      )
                }
                handleDelete={deleteArtist}
                handleEdit={editArtist}
                className="mb-4"
                handleView={handleView}
                handleActiveChange={handleActiveChange}
              />
            ) : null}
            {open ? (
              <Addartist
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                addArtist={addArtist}
              />
            ) : null}

            {editArtistData ? (
              <Editartist
                data={editArtistData}
                open={openEdit}
                handleClickOpen={handleClickOpenEdit}
                handleCloseEdit={handleCloseEdit}
                handleEditArtist={handleEditArtist}
              />
            ) : null}

            {openView ? (
              <Viewartist
                open={openView}
                handleToggleView={handleToggleView}
                data={viewData}
                albums={albums}
                songs={songs}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-0 mb-4">
            {/* <h3 style={{ color: "white" }}> New Artist </h3>
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

export default Artist;
