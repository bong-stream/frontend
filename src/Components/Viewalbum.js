import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import "../Styles/View.css";
import Avatar from "@material-ui/core/Avatar";
import { Row, Col, Card, Dropdown, Carousel } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Viewalbum({
  open,
  handleToggleView,
  data,
  albums,
  songs,
}) {
  const classes = useStyles();
  console.log(data);
  console.log(songs);

  const [filterAlbums, setFilterAlbums] = useState();
  const [filterSongs, setFilterSongs] = useState();

  useEffect(() => {
    let yoo = [];
    let yoo2 = [];
    // data.albums.map((albumId) => {
    //   albums.map((album) => {
    //     if (album._id === albumId) {
    //       yoo.push(album);
    //     }
    //   });
    // });

    data.songs.map((songId) => {
      songs.map((song) => {
        if (song._id === songId) {
          yoo2.push(song);
        }
      });
    });

    console.log(yoo);
    setFilterAlbums(yoo);
    console.log(yoo2);
    setFilterSongs(yoo2);
  }, []);

  return (
    <div className={classes.root}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleToggleView}
        TransitionComponent={Transition}
      >
        <AppBar
          className={classes.appBar}
          style={{
            backgroundColor: "#F44040",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleToggleView}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              View Album
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleToggleView}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <div>
          <div className="text-center">
            <div
              style={{
                width: "100%",
                height: "110px",
              }}
              className="cover"
            ></div>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4 ">
                <div className="d-flex justify-content-center">
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      data.albumimage
                        ? data.albumimage
                        : "https://images.pexels.com/photos/792326/pexels-photo-792326.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                    className={classes.large}
                    style={{
                      width: "200px",
                      height: "200px",
                      marginTop: "-45px",
                    }}
                  />
                </div>

                <h4>{data.albumname}</h4>
              </div>
              <div className="col-4"></div>
            </div>

            <div className="container text-center">
              <div className="row text-center">
                <div className="col-12 col-md-4 text-center">
                  {/* {" "}
                  <br />
                  {filterAlbums ? (
                    <Card className="new-cust-card">
                      <Card.Header>
                        <Card.Title as="h5">S</Card.Title>
                      </Card.Header>
                      <div style={{ height: "415px" }}>
                        <PerfectScrollbar>
                          <Card.Body className="p-b-0">
                            {filterAlbums.map((album) => {
                              return (
                                <div className="align-middle mb-2">
                                  <div className="row">
                                    <div className="col-4">
                                      <img
                                        src={album.albumimage}
                                        alt="user"
                                        className="img-radius img-fluid align-top "
                                        style={{
                                          width: "55px",
                                          height: "55px",
                                          borderRadius: "50%",
                                        }}
                                      />
                                    </div>
                                    <div className="col-8">
                                      <div className="d-inline-block ">
                                        <a>
                                          <h5 style={{ marginTop: "12px" }}>
                                            {album.albumname}
                                          </h5>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              );
                            })}
                          </Card.Body>
                        </PerfectScrollbar>
                      </div>
                    </Card>
                  ) : null} */}
                </div>
                <div className="col-12 col-md-8">
                  <br />
                  {filterSongs ? (
                    <div className="row">
                      {filterSongs.map((song) => {
                        return (
                          <div className="col-12 col-md-6 mb-5">
                            <div style={{ width: "300px", height: "415px" }}>
                              <Card className="user-card user-card-3 support-bar1">
                                <Card.Body>
                                  <div className="text-center">
                                    <div className="position-relative d-inline-block">
                                      <img
                                        className="img-radius img-fluid wid-150"
                                        src={song.songimage}
                                        alt="User"
                                        style={{
                                          borderRadius: "50%",
                                          width: "200px",
                                          height: "200px",
                                        }}
                                      />
                                      <h3 className="mb-1 mt-3 f-w-400">
                                        {song.songname}
                                      </h3>
                                      <p className="mb-3 text-muted">yoo</p>
                                    </div>
                                  </div>
                                </Card.Body>
                                <Card.Footer className="bg-light">
                                  <Row className="text-center">
                                    <Col>
                                      <h6 className="mb-1">22</h6>
                                      <p className="mb-0">Plays</p>
                                    </Col>
                                    <Col>
                                      <h6 className="mb-1">{song.year}</h6>
                                      <p className="mb-0">Year</p>
                                    </Col>
                                    <Col>
                                      <h6 className="mb-1">678</h6>
                                      <p className="mb-0">Following</p>
                                    </Col>
                                  </Row>
                                </Card.Footer>
                              </Card>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
