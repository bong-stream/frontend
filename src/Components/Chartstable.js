import React from "react";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Chartstable({ data, handleDeleteSong }) {
  const classes = useStyles();

  const handleDelete = (id) => {
    handleDeleteSong(id);
  };
  return (
    <List className={classes.root} style={{ width: "375px" }}>
      {data.map((value) => {
        return (
          <ListItem alignItems="flex-start" style={{ width: "100%" }}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={value.songimage} />
            </ListItemAvatar>
            <ListItemText
              style={{ color: "black" }}
              primary={`${value.songname}`}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Gatie
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <DragIndicatorIcon />
                <DeleteIcon onClick={() => handleDelete(value._id)} />
              </IconButton>
              <Divider variant="inset" component="li" />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
