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

export default function Selectartistforsong({ data, selectArtists }) {
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => async () => {
    console.log(value);
    const currentIndex = checked.indexOf(value);
    console.log(currentIndex);
    const newChecked = [...checked];
    console.log(newChecked);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    await setChecked(newChecked);
  };

  const handleAddAlbums = () => {
    console.log(checked);
    selectArtists(checked);
  };

  return (
    <List className={classes.root}>
      {console.log(data)}
      {data.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        console.log(labelId);
        console.log(value._id);

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
            <ListItemText id={labelId} primary={`${value.artistname}`} />
          </ListItem>
        );
      })}
      <button className="btn btn-sm btn-danger" onClick={handleAddAlbums}>
        Add Artist
      </button>
    </List>
  );
}
