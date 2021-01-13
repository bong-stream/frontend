import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // maxWidth: 250,
    width: window.location.href.includes("Home") ? 320 : 120,
  },
  media: {
    height: window.location.href.includes("Home") ? 190 : 110,
    objectFit: "contain",
  },
  title: {
    color: "#fff",
    fontSize: "0.8rem",
  },
});

const MusicCard = (props) => {
  console.log("object", props.title, props.imgPath);
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={props.imgPath} />
        </CardActionArea>
      </Card>
      <Typography gutterBottom variant="h6" className={classes.title}>
        {props.title}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.title}
        component="p"
      >
        {props.label}
      </Typography>
    </>
  );
};

export default MusicCard;
