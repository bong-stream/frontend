import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Selectsongsfortrending({
  data,
  selectSongs,
  handleClose,
}) {
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => async () => {
    // console.log(value._id);
    const currentIndex = checked.indexOf(value);
    // console.log(currentIndex);
    const newChecked = [...checked];
    // console.log(newChecked);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    await setChecked(newChecked);
  };

  const handleAddAlbums = () => {
    let ids = [];
    checked.map((song) => {
      ids.push(song._id);
    });
    // console.log(ids);
    // console.log(checked);
    // selectSongs(ids);
    selectSongs(checked);

    handleClose();
  };

  return (
    <div>
      <br />
      <div className="row">
        <div className="col-1 col-md-2"></div>
        <div className="col-10 col-md-8 ">
          <List className={classes.root}>
            {/* {console.log(data)} */}
            {data.map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              // console.log(labelId);
              // console.log(value._id);

              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={0}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.songname}`} />
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className="col-1 col-md-2 mt-4 text-center">
          <button className="btn btn-sm btn-danger" onClick={handleAddAlbums}>
            Add Songs
          </button>
        </div>
      </div>
    </div>
  );
}
