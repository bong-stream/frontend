import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import song from "../../assets/song.jpg";

const useStyles = makeStyles({
  root: {
    // maxWidth: 250,
    width: 120,
    display: "flex",
  },
  media: {
    height: 110,
    objectFit: "contain",
  },
  title: {
    color: "#fff",
    fontSize: "0.8rem",
  },
});

const SimpleStripCard = (props) => {
  const { imgPath, title } = props;
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imgPath}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
      <Typography gutterBottom variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.title}
        component="p"
      >
        song
      </Typography>
    </>
  );
};

export default SimpleStripCard;
