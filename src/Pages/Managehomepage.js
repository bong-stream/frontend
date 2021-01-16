import React, { useState, useEffect } from "react";
import {
  getTrending,
  editTrending,
  getPopular,
  editPopular,
  getBongplaylist,
  editBongplaylist,
  getRecommended,
  editRecommended,
  getTopalbums,
  editTopalbums,
  getTopartists,
  editTopartists,
  getTopcharts,
  editTopcharts,
} from "../Pagesactions/songsactions";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Active from "../Components/Active";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AlbumIcon from "@material-ui/icons/Album";
import FaceIcon from "@material-ui/icons/Face";
import { getArtists } from "../Pagesactions/artistsactions";
import { getSongs } from "../Pagesactions/songsactions";
import { getUsers } from "../Pagesactions/usersactions";
import { getAlbums } from "../Pagesactions/albumactions";

const Managehomepage = () => {
  const [activeTrending, setActiveTrending] = useState(true);
  const [activePopular, setActivePopular] = useState(true);
  const [activeBongplaylist, setActiveBongplaylist] = useState(true);
  const [activeRecommended, setActiveRecommended] = useState(true);
  const [activeTopalbums, setActiveTopalbums] = useState(true);
  const [activeTopartists, setActiveTopartists] = useState(true);
  const [activeTopcharts, setActiveTopcharts] = useState(true);
  const [fetchDone, setFetchDone] = useState(false);
  const [trending, setTrending] = useState();
  const [popular, setPopular] = useState();
  const [bongplaylist, setBongplaylist] = useState();
  const [topalbums, setTopalbums] = useState();
  const [topartists, setTopartists] = useState();
  const [recommended, setRecommended] = useState();
  const [topcharts, setTopcharts] = useState();
  const [artists, setArtists] = useState(undefined);
  const [songs, setSongs] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [users, setUsers] = useState(undefined);

  const handleChange = async (active, label) => {
    // console.log(active, label);

    if (label === "Trending") {
      await editTrending({ active, trending: trending });
      setActiveTrending(active);
    } else if (label === "Popular") {
      await editPopular({ active, popular: popular });
      setActivePopular(active);
    } else if (label === "Bongplaylist") {
      // console.log(active, bongplaylist);
      await editBongplaylist({ active, bongplaylist: bongplaylist });
      setActiveBongplaylist(active);
    } else if (label === "Topalbums") {
      await editTopalbums({ active, topalbums: topalbums });
      setActiveTopalbums(active);
    } else if (label === "Topartists") {
      await editTopartists({ active, topartists: topartists });
      setActiveTopartists(active);
    } else if (label === "Recommended") {
      await editRecommended({ active, recommended: recommended });
      setActiveRecommended(active);
    } else if (label === "Topcharts") {
      await editTopcharts({ active, topcharts: topcharts });
      setActiveTopcharts(active);
    }
  };

  useEffect(() => {
    let trending,
      popular,
      bongplaylist,
      recommended,
      topalbums,
      topartists,
      topcharts;
    const fetch = async () => {
      trending = await getTrending();
      // console.log("helo trending", trending);
      setActiveTrending(trending[0].active);
      setTrending(trending[0].trending);
      popular = await getPopular();
      setActivePopular(popular[0].active);
      setPopular(popular[0].popular);
      bongplaylist = await getBongplaylist();
      setActiveBongplaylist(bongplaylist[0].active);
      setBongplaylist(bongplaylist[0].bongplaylist);
      // console.log(bongplaylist[0].bongplaylist);
      recommended = await getRecommended();
      setActiveRecommended(recommended[0].active);
      setRecommended(recommended[0].recommended);
      topalbums = await getTopalbums();
      setActiveTopalbums(topalbums[0].active);
      setTopalbums(topalbums[0].topalbums);
      topartists = await getTopartists();
      setActiveTopartists(topartists[0].active);
      setTopartists(topartists[0].topartists);
      topcharts = await getTopcharts();
      // console.log(topcharts);
      setActiveTopcharts(topcharts[0].active);
      setTopcharts(topcharts[0].topcharts);
      // console.log(topcharts[0].topcharts);
      setFetchDone(true);
      // console.log("i am done");
    };
    fetch();

    const fetchAlbums = async () => {
      let allAlbums;
      allAlbums = await getAlbums();
      // console.log(allAlbums);
      setAlbums(allAlbums);
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

    const fetchUsers = async () => {
      let allUsers;
      allUsers = await getUsers();
      // console.log(allUsers);
      setUsers(allUsers);
    };

    fetchUsers();

    fetchArtists();
    fetchAlbums();
    fetchSongs();
  }, []);
  return (
    <div style={{ overflowX: "hidden" }} className="main">
      <br />
      <div>
        <h2>Manage Home Page</h2>
      </div>
      <br />
      <br />
      <div className="container admin">
        <Row>
          <Col className="mb-4" xl={4} md={6}>
            {users ? (
              <Card>
                <Card.Body
                  className="text-center"
                  style={{ position: "relative" }}
                >
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
                  <div
                    style={{ position: "absolute", right: 0, bottom: "15px" }}
                  >
                    <Active
                      label="Trending"
                      handleChange={handleChange}
                      active={activeTrending}
                    />
                  </div>
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
                  <div
                    style={{ position: "absolute", right: 0, bottom: "15px" }}
                  >
                    <Active
                      label="Popular"
                      handleChange={handleChange}
                      active={activePopular}
                    />
                  </div>
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
                  <div
                    style={{ position: "absolute", right: 0, bottom: "15px" }}
                  >
                    <Active
                      label="Topcharts"
                      handleChange={handleChange}
                      active={activeTopcharts}
                    />
                  </div>
                </Card.Body>
              </Card>
            ) : null}
          </Col>

          <br />
          <br />
        </Row>
        <Row>
          <Col className="mb-4" xl={6} md={6}>
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
                  <div
                    style={{ position: "absolute", right: 0, bottom: "15px" }}
                  >
                    <Active
                      label="Bongplaylist"
                      handleChange={handleChange}
                      active={activeBongplaylist}
                    />
                  </div>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={6} md={6}>
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
                  <div
                    style={{ position: "absolute", right: 0, bottom: "15px" }}
                  >
                    <Active
                      label="Topartists"
                      handleChange={handleChange}
                      active={activeTopartists}
                    />
                  </div>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={6} md={12}>
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
                  <div
                    style={{ position: "absolute", right: 0, bottom: "15px" }}
                  >
                    <Active
                      label="Topalbums"
                      handleChange={handleChange}
                      active={activeTopalbums}
                    />
                  </div>
                </Card.Body>
              </Card>
            ) : null}
          </Col>
          <Col className="mb-4" xl={6} md={12}>
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
                  <div
                    style={{ position: "absolute", right: 0, bottom: "15px" }}
                  >
                    <Active
                      label="Recommended"
                      handleChange={handleChange}
                      active={activeRecommended}
                    />
                  </div>
                </Card.Body>
              </Card>
            ) : null}
          </Col>

          <br />
          <br />
        </Row>
        {/* <div className="row">
          <div className="col-12 col-md-4"></div>
          <div className="col-12 col-md-4">
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-12">
                {fetchDone ? (
                  <div className="row">
                    <div className="col-12">
                      <Active
                        label="Trending"
                        handleChange={handleChange}
                        active={activeTrending}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Popular"
                        handleChange={handleChange}
                        active={activePopular}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Bongplaylist"
                        handleChange={handleChange}
                        active={activeBongplaylist}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Topalbums"
                        handleChange={handleChange}
                        active={activeTopalbums}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Topartists"
                        handleChange={handleChange}
                        active={activeTopartists}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Recommended"
                        handleChange={handleChange}
                        active={activeRecommended}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Topcharts"
                        handleChange={handleChange}
                        active={activeTopcharts}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Managehomepage;
