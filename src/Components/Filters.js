import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import FilterListIcon from "@material-ui/icons/FilterList";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Filters({
  handleSortType,
  filterName,
  columnName,
  type,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeType = ({ type, column }) => {
    console.log(type);
    handleSortType(type, column);
  };

  return (
    <div className="mx-3">
      <button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="btn btn-danger"
      >
        Filters
        <FilterListIcon />
      </button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText
            primary={filterName.name1}
            onClick={() =>
              handleChangeType({ column: columnName.name1, type: type.asc })
            }
          />
          <ListItemIcon>
            <ArrowDropUpIcon />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText
            primary={filterName.name2}
            onClick={() =>
              handleChangeType({ column: columnName.name1, type: type.desc })
            }
          />
          <ListItemIcon>
            <ArrowDropDownIcon />
          </ListItemIcon>
        </StyledMenuItem>
        {/* <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem> */}
      </StyledMenu>
    </div>
  );
}
