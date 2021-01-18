import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Selectgenres({ data, selectGenres }) {
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [checked, setChecked] = React.useState();

  //   const handleToggle = (value) => async () => {
  //     console.log(value);
  //     const currentIndex = checked.indexOf(value);
  //     console.log(currentIndex);
  //     const newChecked = [...checked];
  //     console.log(newChecked);

  //     if (currentIndex === -1) {
  //       newChecked.push(value);
  //     } else {
  //       newChecked.splice(currentIndex, 1);
  //     }

  //     await setChecked(newChecked);
  //   };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setChecked(event.target.value);
  };

  const handleAddArtist = () => {
    selectGenres(checked);
  };

  return (
    <List className={classes.root}>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        // value={checked}
        onChange={handleChange}
      >
        {/* {console.log(data)} */}
        {data.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          // console.log(labelId);
          // console.log(value);

          return (
            <FormControlLabel
              value={value._id}
              control={<Radio />}
              label={value.genresname}
            />
          );
        })}
      </RadioGroup>
      <button className="btn btn-sm btn-danger" onClick={handleAddArtist}>
        Add Genre
      </button>
      {/* {console.log(data)}
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
            <ListItemText id={labelId} primary={`${value.songname}`} />
          </ListItem>
        );
      })} */}
      {/* <button className="btn btn-sm btn-danger" onClick={handleAddAlbums}>
        Add Artist
      </button> */}
    </List>
  );
}
