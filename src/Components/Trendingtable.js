import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DragHandle = sortableHandle(() => (
  <IconButton edge="end" aria-label="comments">
    <DragIndicatorIcon />
  </IconButton>
));

const SortableItem = sortableElement(
  ({ value, name, classes, handleDelete }) => (
    <ListItem alignItems="flex-start" width="100%">
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
        <DragHandle />
        <IconButton>
          <DeleteIcon onClick={() => handleDelete(value._id, name)} />
        </IconButton>
        <Divider variant="inset" component="li" />
      </ListItemSecondaryAction>
    </ListItem>
  )
);

const SortableContainer = sortableContainer(({ children, classes }) => {
  return (
    <List width="100%" className={classes.root}>
      {children}
    </List>
  );
});

const Trendingtable = ({ data, handleDeleteSong, name, handleNewSort }) => {
  const classes = useStyles();

  const [state, setState] = useState(data);

  const handleDelete = (id, name) => {
    handleDeleteSong(id, name);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState((items) => arrayMove(items, oldIndex, newIndex));
  };

  useMemo(() => {
    handleNewSort(state, name);
  }, [state]);

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle classes={classes}>
      {console.log(state)}
      {state.map((value, index) => (
        <SortableItem
          key={`item-${value._id}`}
          index={index}
          value={value}
          handleDelete={handleDelete}
          classes={classes}
        />
      ))}
    </SortableContainer>
    // <List className={classes.root} width="100%">
    //   {data.map((value) => {
    //     return (
    //       <ListItem alignItems="flex-start" width="100%">
    //         <ListItemAvatar>
    //           <Avatar alt="Remy Sharp" src={value.songimage} />
    //         </ListItemAvatar>
    //         <ListItemText
    //           style={{ color: "black" }}
    //           primary={`${value.songname}`}
    //           secondary={
    //             <React.Fragment>
    //               <Typography
    //                 component="span"
    //                 variant="body2"
    //                 className={classes.inline}
    //                 color="textPrimary"
    //               >
    //                 Ali Gatie
    //               </Typography>
    //             </React.Fragment>
    //           }
    //         />
    //         <ListItemSecondaryAction>
    //           <IconButton edge="end" aria-label="comments">
    //             <DragIndicatorIcon />
    //           </IconButton>
    //           <IconButton>
    //             <DeleteIcon onClick={() => handleDelete(value._id, name)} />
    //           </IconButton>
    //           <Divider variant="inset" component="li" />
    //         </ListItemSecondaryAction>
    //       </ListItem>
    //     );
    //   })}
    // </List>
  );
};

export default sortableContainer(Trendingtable);
