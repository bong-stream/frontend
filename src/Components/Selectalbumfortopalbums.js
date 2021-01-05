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

export default function Selectalbumfortopalbums({ data, selectAlbums }) {
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
    selectAlbums(checked);
  };

  return (
    <div>
      <div className="row">
        <div className="col-1 col-md-2"></div>
        <div className="col-10 col-md-8">
          <List className={classes.root}>
            {data.map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              console.log(labelId);
              console.log(value);

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
                  <ListItemText id={labelId} primary={`${value.albumname}`} />
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className="col-1 col-md-2 mt-4 text-center">
          <button className="btn btn-sm btn-danger" onClick={handleAddAlbums}>
            Add Albums
          </button>
        </div>
      </div>
    </div>
  );
}
