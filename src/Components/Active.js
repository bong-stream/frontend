import React from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    // margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Active = ({ label, handleChange, active }) => {
  const handleActiveChange = () => {
    handleChange(!active, label);
  };
  return (
    <div className="d-inline-block" style={{ position: "absolute", right: 0 }}>
      {/* <div className="row"> */}
      {/* <div className="col-4"> */}
      <FormControlLabel
        control={
          <IOSSwitch
            checked={active}
            onChange={handleActiveChange}
            name={label}
          />
        }
        // label={label}
      />
      {/* </div> */}
      {/* <div style={{ marginTop: "8px" }} className="col-8">
          <h5> {label}</h5>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Active;
