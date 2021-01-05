import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getArtists } from "../Pagesactions/artistsactions";
import { getSongs } from "../Pagesactions/songsactions";
import { getUsers } from "../Pagesactions/usersactions";
import { getAlbums } from "../Pagesactions/albumactions";
import { GlobalData } from "../App.js";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AlbumIcon from "@material-ui/icons/Album";
import FaceIcon from "@material-ui/icons/Face";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import totalLead from "../Components/charts/crm-total-lead";
import totalVendor from "../Components/charts/crm-total-vendor";
import totalInvoice from "../Components/charts/crm-total-invoice";

const AdminHome = () => {
  const [artists, setArtists] = useState(undefined);
  const [songs, setSongs] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [users, setUsers] = useState(undefined);

  const data = useContext(GlobalData);
  console.log(data);

  useEffect(() => {
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

    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      console.log(allArtists);
      setArtists(allArtists);
    };

    const fetchUsers = async () => {
      let allUsers;
      allUsers = await getUsers();
      console.log(allUsers);
      setUsers(allUsers);
    };

    fetchUsers();

    fetchArtists();
    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <div className="main">
      <div className="container admin">
        {console.log(users, artists, songs, albums)}
        <Row>
          <Col className="mb-4" xl={3} md={6}>
            {users ? (
              <Card>
                <Card.Body className="text-center">
                  <AccountCircleIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">
                    <span className="text-c-blue">{users.length}</span> Users
                  </h4>
                  <p className="m-b-20">Your Users list is growing</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/users"
                  >
                    <button className="btn btn-primary btn-sm btn-round">
                      Manage Users
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={3} md={6}>
            {artists ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-twitter text-c-green d-block f-40" /> */}
                  <FaceIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">
                    <span className="text-c-green">{artists.length}</span>{" "}
                    Artists
                  </h4>
                  <p className="m-b-20">Your Artists list is growing</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/artist"
                  >
                    <button className="btn btn-danger btn-sm btn-round">
                      Manage Artists
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={3} md={12}>
            {albums ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-briefcase text-c-red d-block f-40" /> */}
                  <AlbumIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20"> {albums.length} Albums</h4>
                  <p className="m-b-20">This is your current active plan</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/albums"
                  >
                    <button className="btn btn-primary btn-sm btn-round">
                      Explore Albums
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={3} md={12}>
            {songs ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-briefcase text-c-red d-block f-40" /> */}
                  <MusicNoteIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20"> {songs.length} Songs</h4>
                  <p className="m-b-20">Amazing lists of songs</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/songs"
                  >
                    <button className="btn btn-danger btn-sm btn-round">
                      Explore Songs
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>

          <br />
          <br />
        </Row>
        <Row>
          <Col className="mb-4" xl={4} md={6}>
            {users ? (
              <Card>
                <Card.Body className="text-center">
                  <TrendingUpIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20"> Trending</h4>
                  {/* <p className="m-b-20">Your Users list is growing</p> */}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/trending"
                  >
                    <button className="btn btn-primary btn-sm btn-round">
                      Manage Trending
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={4} md={6}>
            {artists ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-twitter text-c-green d-block f-40" /> */}
                  <WhatshotIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">
                    <span className="text-c-green"></span> Popular
                  </h4>
                  {/* <p className="m-b-20">Your Artists list is growing</p> */}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/popular"
                  >
                    <button className="btn btn-danger btn-sm btn-round">
                      Manage Populars
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={4} md={12}>
            {albums ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-briefcase text-c-red d-block f-40" /> */}
                  <InsertChartIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">Top Charts</h4>
                  {/* <p className="m-b-20">This is your current active plan</p> */}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/charts"
                  >
                    <button className="btn btn-primary btn-sm btn-round">
                      Manage Top Charts
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>

          <br />
          <br />
        </Row>
        <Row>
          <Col className="mb-4">
            {albums ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-briefcase text-c-red d-block f-40" /> */}
                  <HomeWorkIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">Manage HomePage</h4>
                  {/* <p className="m-b-20">This is your current active plan</p> */}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/managehomepage"
                  >
                    <button className="btn btn-primary btn-sm btn-round">
                      Manage Home
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col className="mb-4" xl={3} md={6}>
            {users ? (
              <Card>
                <Card.Body className="text-center">
                  <PlaylistPlayIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">Bong Playlist</h4>
                  <p className="m-b-20">Setup Bong Playlist Here</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/bongplaylist"
                  >
                    <button className="btn btn-primary btn-sm btn-round">
                      Manage Playlist
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={3} md={6}>
            {artists ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-twitter text-c-green d-block f-40" /> */}
                  <FaceIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">Top Artists</h4>
                  <p className="m-b-20">Setup Top Artists Here</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/topartists"
                  >
                    <button className="btn btn-danger btn-sm btn-round">
                      Manage Top Artists
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={3} md={12}>
            {albums ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-briefcase text-c-red d-block f-40" /> */}
                  <AlbumIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20"> Top Albums</h4>
                  <p className="m-b-20">Setup Top Albums List</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/topalbums"
                  >
                    <button className="btn btn-primary btn-sm btn-round">
                      Manage Top ALbums
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={3} md={12}>
            {songs ? (
              <Card>
                <Card.Body className="text-center">
                  {/* <i className="feather icon-briefcase text-c-red d-block f-40" /> */}
                  <MusicNoteIcon style={{ color: "#f44040" }} />
                  <h4 className="m-t-20">Recommended</h4>
                  <p className="m-b-20">Setup recommended List</p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/admin/recommended"
                  >
                    <button className="btn btn-danger btn-sm btn-round">
                      Manage Recommended List
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            ) : null}
          </Col>

          <br />
          <br />
        </Row>
        <Row>
          <Col className="mb-4" md={6} xl={4}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Total Songs</h5>
                <p className="text-c-green f-w-500">
                  <i className="fa fa-caret-up m-r-15"></i> 18% High than last
                  month
                </p>
                <Row>
                  <Col className="b-r-default">
                    <p className="text-muted m-b-5">Overall</p>
                    <h5>76.12%</h5>
                  </Col>
                  <Col className="b-r-default">
                    <p className="text-muted m-b-5">Monthly</p>
                    <h5>16.40%</h5>
                  </Col>
                  <Col>
                    <p className="text-muted m-b-5">Day</p>
                    <h5>4.56%</h5>
                  </Col>
                </Row>
              </Card.Body>
              <Chart {...totalLead} />
            </Card>
          </Col>
          <Col className="mb-4" md={6} xl={4}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Total Artists</h5>
                <p className="text-c-red f-w-500">
                  <i className="fa fa-caret-down m-r-15"></i> 24% High than last
                  month
                </p>
                <Row>
                  <Col className="b-r-default">
                    <p className="text-muted m-b-5">Overall</p>
                    <h5>68.52%</h5>
                  </Col>
                  <Col className="b-r-default">
                    <p className="text-muted m-b-5">Monthly</p>
                    <h5>28.90%</h5>
                  </Col>
                  <Col>
                    <p className="text-muted m-b-5">Day</p>
                    <h5>13.50%</h5>
                  </Col>
                </Row>
              </Card.Body>
              <Chart {...totalVendor} />
            </Card>
          </Col>
          <Col className="mb-4" md={6} xl={4}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Total Users</h5>
                <p className="text-c-green f-w-500">
                  <i className="fa fa-caret-up m-r-15"></i> 20% High than last
                  month
                </p>
                <Row>
                  <Col className="b-r-default">
                    <p className="text-muted m-b-5">Overall</p>
                    <h5>68.52%</h5>
                  </Col>
                  <Col className="b-r-default">
                    <p className="text-muted m-b-5">Monthly</p>
                    <h5>28.90%</h5>
                  </Col>
                  <Col>
                    <p className="text-muted m-b-5">Day</p>
                    <h5>13.50%</h5>
                  </Col>
                </Row>
              </Card.Body>
              <Chart {...totalInvoice} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminHome;
