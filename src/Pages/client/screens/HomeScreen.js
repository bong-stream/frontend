import {
  Button,
  Divider,
  Grid,
  Link,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";

import song from "../../../assets/song.jpg";
import MusicCard from "../../../Components/client/MusicCard";
import MusicStepper from "../../../Components/client/MusicPaginator";
import SimpleStripCard from "../../../Components/client/SimpleStripCard";
import Carousel from "react-elastic-carousel";
import "../../../assets/CrouselStyle.css";
import appstore from "../../../assets/appstore.png";

import playstore from "../../../assets/goo.png";
import axios from "axios";
import { GlobalData } from "../../../App";
import {
  getTopCharts,
  getRecentPlay,
  getRecomended,
  getPopular,
} from "../../../Pagesactions/HomeActions";

const tutorialSteps = [
  {
    title: "hamara parcham",
    label: "San Francisco ",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "a jaaa pardesi",
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "hamara parcham",
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    title: "a jaaa pardesi",
    label: "NeONBRAND ",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "a jaaa pardesi",
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "a jaaa pardesi",
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "a jaaa pardesi",
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "a jaaa pardesi",
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "a jaaa pardesi",
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    title: "a jaaa pardesi",
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const useStyles = makeStyles((theme) => ({
  rootGrid: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(2),
    width: "100%",
  },
  footerImg: {
    width: 150,
    height: 40,
    paddingLeft: 3,
    paddingTop: 6,
    objectFit: "conatin",
  },
}));
function HomeScreen() {
  const classes = useStyles();
  const theme = useTheme();
  const [charts, setcharts] = useState([]);

  const [playlist, setplaylist] = useState([]);
  const [recomended, setrecomended] = useState([]);
  const [popular, setpopular] = useState([]);
  const data = useContext(GlobalData);

  useEffect(() => {
    const fetchTopCharts = async () => {
      let topchartlist;
      topchartlist = await getTopCharts();
      // console.log(topchartlist[0].topcharts[0].topchart[0].songimage);
      if (topchartlist.length > 0) {
        console.log("topchart");
        setcharts(topchartlist[0].topcharts[1].topchart);
      }
    };
    const fetchRecentPlay = async () => {
      let recentPlay;
      recentPlay = await getRecentPlay();
      console.log(recentPlay);
      if (recentPlay.length > 0) {
        console.log("recent");
        setplaylist(recentPlay[0].bongplaylist);
      }
    };
    const fetchRecommended = async () => {
      let recomended;
      recomended = await getRecomended();
      if (recomended.length > 0) {
        console.log("recomended");
        setrecomended(recomended[0].recommended);
      }
    };

    const fetchPopular = async () => {
      let popular;
      popular = await getPopular();
      console.log(popular);
      if (recomended.length > 0) {
        console.log("recomended");
        setpopular(popular[0].popular);
      }
    };
    fetchPopular();
    fetchTopCharts();
    fetchRecentPlay();
    fetchRecommended();
  }, []);
  console.log("object", recomended);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        margin: window.screen.width >= 768 ? "auto" : 10,
        width: window.screen.width >= 768 ? "85%" : "98%",
      }}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        style={{
          marginTop: "1%",
        }}
      >
        <Grid item style={{ paddingTop: theme.spacing(2) }}>
          <Grid container justify="center" spacing={2}>
            {[0, 1].map((value) => (
              <Grid key={value} item>
                <MusicCard
                  title="Pakistani Song"
                  label="newSong"
                  imgPath={song}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <div style={{ display: "flex", justifyContent: "space-Between" }}>
            <Typography
              style={{
                color: "#fff",
                paddingLeft:
                  window.screen.width >= 768
                    ? theme.spacing(12)
                    : theme.spacing(8),
                paddingBottom: theme.spacing(2),
                paddingTop: theme.spacing(1),
              }}
            >
              Recent Play
            </Typography>
            <Button
              style={{
                marginBottom: theme.spacing(2),
                color: "#fff",
                backgroundColor: "#193459",
                marginLeft: 3,
              }}
            >
              View All
            </Button>
          </div>
          <div className={classes.crousel}>
            <Carousel
              itemsToShow={window.screen.width >= 768 ? 5 : 2}
              itemsToScroll={window.screen.width >= 768 ? 5 : 2}
            >
              {playlist.length > 0 &&
                playlist.map((item) => (
                  <div
                    style={{
                      display: "block",
                      paddingLeft: theme.spacing(3),
                      flexDirection: "row",
                      zIndex: 1,
                    }}
                  >
                    <SimpleStripCard
                      key={item._id}
                      imgPath={item.songimage}
                      title={item.songname}
                      // label={item.label}
                      // name={item.name}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: theme.spacing(3),
            }}
          >
            <Typography
              style={{
                color: "#fff",
                paddingLeft:
                  window.screen.width >= 768
                    ? theme.spacing(12)
                    : theme.spacing(8),
                paddingBottom: theme.spacing(1),
                paddingTop: theme.spacing(1),
              }}
            >
              Top Chart
            </Typography>
            <Button
              variant="outlined"
              style={{
                marginBottom: theme.spacing(2),
                color: "#fff",
                backgroundColor: "#193459",
                marginLeft: 3,
              }}
            >
              View All
            </Button>
          </div>
          <div className={classes.crousel}>
            <Carousel
              itemsToShow={window.screen.width >= 768 ? 5 : 2}
              itemsToScroll={window.screen.width >= 768 ? 5 : 2}
            >
              {charts.length > 0 &&
                charts.map((item) => (
                  <div
                    style={{
                      display: "block",
                      paddingLeft: theme.spacing(3),
                      // flexWrap: "nowrap",
                      flexDirection: "row",
                      zIndex: 1,
                    }}
                  >
                    <SimpleStripCard
                      key={item._id}
                      imgPath={item.songimage}
                      title={item.songname}
                      // label={item.label}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: theme.spacing(3),
            }}
          >
            <Typography
              style={{
                color: "#fff",
                paddingLeft:
                  window.screen.width >= 768
                    ? theme.spacing(12)
                    : theme.spacing(8),
                paddingBottom: theme.spacing(1),
                paddingTop: theme.spacing(1),
              }}
            >
              Recommended
            </Typography>
            <Button
              variant="outlined"
              style={{
                marginBottom: theme.spacing(2),
                color: "#fff",
                backgroundColor: "#193459",
                marginLeft: 3,
              }}
            >
              View All
            </Button>
          </div>
          <div className={classes.crousel}>
            <Carousel
              itemsToShow={window.screen.width >= 768 ? 5 : 2}
              itemsToScroll={window.screen.width >= 768 ? 5 : 2}
            >
              {recomended.map((item) => (
                <div
                  style={{
                    display: "block",
                    paddingLeft: theme.spacing(3),
                    // flexWrap: "nowrap",
                    flexDirection: "row",
                    zIndex: 1,
                  }}
                >
                  <SimpleStripCard
                    key={item._id}
                    imgPath={item.songimage}
                    title={item.songname}
                    // label={item.label}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: theme.spacing(3),
            }}
          >
            <Typography
              style={{
                color: "#fff",
                paddingLeft:
                  window.screen.width >= 768
                    ? theme.spacing(12)
                    : theme.spacing(8),
                paddingBottom: theme.spacing(1),
                paddingTop: theme.spacing(1),
              }}
            >
              Popular Vedios
            </Typography>
            <Button
              variant="outlined"
              style={{
                marginBottom: theme.spacing(2),
                color: "#fff",
                backgroundColor: "#193459",
                marginLeft: 3,
              }}
            >
              View All
            </Button>
          </div>
          <div className={classes.crousel}>
            <Carousel
              itemsToShow={window.screen.width >= 768 ? 5 : 2}
              itemsToScroll={window.screen.width >= 768 ? 5 : 2}
            >
              {popular.map((item) => (
                <div
                  style={{
                    display: "block",
                    paddingLeft: theme.spacing(3),
                    // flexWrap: "nowrap",
                    flexDirection: "row",
                    zIndex: 1,
                  }}
                >
                  <SimpleStripCard
                    key={item._id}
                    imgPath={item.songimage}
                    title={item.songname}
                    // label={item.label}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Grid>
        <Divider
          style={{
            color: "#7e93cf",
            // paddingTop: theme.spacing(1),
            marginTop: theme.spacing(3),
            width: "96%",
          }}
        />
        <Grid item style={{ paddingTop: theme.spacing(6) }}>
          <Grid container direction="row" justify="space-evenly">
            <Grid item>
              <Grid container direction="column" justify="center">
                <Grid item sm={4} md={4} xs={12} lg={4}>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        paddingTop: 10,
                      }}
                    >
                      {" "}
                      Company
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sm={4} md={4} xs={12} lg={4}>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        paddingTop: 10,
                      }}
                    >
                      {" "}
                      About
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sm={4} md={4} xs={12} lg={4}>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        paddingTop: 10,
                      }}
                    >
                      {" "}
                      Job
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        paddingTop: 10,
                      }}
                    >
                      {" "}
                      Useful Links
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        paddingTop: 10,
                      }}
                    >
                      {" "}
                      Support
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        paddingTop: 10,
                      }}
                    >
                      {" "}
                      Terms & Conditions
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" justify="space-around">
                <Grid item xs={12}>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        paddingTop: 10,
                        fontSize: "1.4rem",
                      }}
                    >
                      {" "}
                      Download the BONG App!
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sm={4} md={4} xs={12} lg={4}>
                  <div style={{ display: "flex" }}>
                    <img
                      src={playstore}
                      alt="google play store"
                      className={classes.footerImg}
                    />

                    <img
                      src={appstore}
                      alt="google play store"
                      className={classes.footerImg}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider
          style={{
            color: "#7e93cf",
            // paddingTop: theme.spacing(1),
            marginTop: theme.spacing(6),
            width: "96%",
          }}
        />
        <Grid item>
          <Typography
            style={{
              color: "white",
              fontSize: "0.6rem",
              textDecoration: "none",
              padding: theme.spacing(3),
            }}
          >
            2020 | All Rights Reserved || developed by Team Bong
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeScreen;
