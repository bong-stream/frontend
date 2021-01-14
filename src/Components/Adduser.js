import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Imageupload from "../Components/Imageupload";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Adduser({ open, handleToggle, handleAddUser }) {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phoneNumber: "",
    gender: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleImage = (id, image) => {
    console.log(image);
    setState({
      ...state,
      userimage: image,
    });
  };

  const handleSubmit = () => {
    handleAddUser(state);
    handleToggle();
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleToggle}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleToggle}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add User
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <br />
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4">
                <Imageupload
                  className="mb-4"
                  id="userimage"
                  onInput={handleImage}
                />
              </div>
              <div className="col-12 col-md-4">
                <h4>User Details</h4>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  margin="dense"
                  id="name"
                  label="Email"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  margin="dense"
                  id="name"
                  label="Phone Number"
                  type="text"
                  name="phoneNumber"
                  value={state.phoneNumber}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  margin="dense"
                  id="name"
                  label="Age"
                  type="number"
                  name="age"
                  value={state.age}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  margin="dense"
                  id="name"
                  label="Gender"
                  type="text"
                  name="gender"
                  value={state.gender}
                  onChange={handleChange}
                />
                <br />
                <TextField
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
                <br />
                <br />
              </div>
              <div className="col-12 col-md-4"></div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
