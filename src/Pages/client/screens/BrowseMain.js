import { Divider, Grid, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import MusicCard from "../../../Components/client/MusicCard";
import Carousel from "react-elastic-carousel";
import "../../../assets/BrowseStyle.css";

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
  menuList: {
    fontSize: "0.8rem",
    color: "#fff",
    "&:hover": {
      color: "#b33458",
      backgroundColor: "#1b3870",
      borderRadius: 20,
    },
  },
  menuList2: {
    fontSize: "0.9rem",
    color: "#fff",
    "&:hover": {
      // color: "#b33458",
      backgroundColor: "#b33458",
      borderRadius: 20,
    },
  },
}));
const card = [1, 2, 3, 4, 5, 6, 7];
const list2 = ["Trending", "Popular", "Albums", "featured"];
const Lists = [
  "New Music",
  "Vedios",
  "Podcasts",
  "PlayLists",
  "Genure",
  "Category",
  "Artists",
  "Albums",
];

function BrowseMain() {
  const classes = useStyles();
  const theme = useTheme();
  const [slug, setSlug] = useState("New Music");

  const handleSlug = (e, item) => {
    e.preventDefault();
    setSlug(item);
  };
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
          // margin: window.screen.width >= 768 ? "auto" : 0,

          // width: window.screen.width >= 768 ? "85%" : "100%",
        }}
      >
        <Grid item>
          <div style={{ display: "flex", height: "5%" }}>
            {Lists.map((list) => (
              <MenuItem
                value={slug}
                onClick={(e) => handleSlug(e, list)}
                className={classes.menuList}
              >
                {list}
              </MenuItem>
            ))}
          </div>
          <Divider style={{ color: "#FFF" }} />
          <div
            style={{
              display: "flex",
              height: "5%",
              paddingLeft: "2%",
              paddingTop: "1%",
            }}
          >
            {list2.map((list) => (
              <MenuItem
                value={slug}
                onClick={(e) => handleSlug(e, list)}
                className={classes.menuList2}
              >
                {list}
              </MenuItem>
            ))}
          </div>
        </Grid>
        <Grid item style={{ paddingTop: theme.spacing(3) }}>
          <Carousel
            itemsToShow={window.screen.width >= 768 ? 6 : 2}
            itemsToScroll={window.screen.width >= 768 ? 6 : 2}
          >
            {tutorialSteps.map((item) => (
              <div
                style={{
                  display: "block",
                  paddingLeft: theme.spacing(3),
                  // flexWrap: "nowrap",
                  flexDirection: "row",
                  zIndex: 1,
                }}
              >
                <Grid container justify="center" spacing={2}>
                  {[0, 1, 2, 3].map((value) => (
                    <Grid key={value} item>
                      <MusicCard
                        imgPath={item.imgPath}
                        title={item.title}
                        label={item.label}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid item justify="center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignitem: "center",
              paddingTop: 20,
            }}
          ></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default BrowseMain;
