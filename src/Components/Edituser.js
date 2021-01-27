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

export default function Edituser({ open, handleToggle, handleEdit, data }) {
  const classes = useStyles();
  // console.log(data);
  const [state, setState] = useState({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    age: data.age,
    gender: data.gender,
    id: data.id,
    userimage: data.userimage,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleImage = (id, image) => {
    // console.log(image);
    setState({
      ...state,
      userimage: image,
    });
  };

  const handleSubmit = () => {
    handleEdit(state);
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
              Edit User
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
                  imageSrc={state.userimage}
                />
              </div>
              <div className="col-12 col-md-6">
                <h4>User Details</h4>
                <input
                  class="form-control"
                  autoFocus
                  margin="dense"
                  id="name"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                />
                <br />
                <input
                  class="form-control"
                  margin="dense"
                  id="name"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
                <br />
                <input
                  class="form-control"
                  margin="dense"
                  id="name"
                  placeholder="Phone Number"
                  type="text"
                  name="phoneNumber"
                  value={state.phoneNumber}
                  onChange={handleChange}
                />
                <br />
                <input
                  class="form-control"
                  margin="dense"
                  id="name"
                  placeholder="Age"
                  type="number"
                  name="age"
                  value={state.age}
                  onChange={handleChange}
                />
                <br />
                <input
                  class="form-control"
                  margin="dense"
                  id="name"
                  placeholder="Gender"
                  type="text"
                  name="gender"
                  value={state.gender}
                  onChange={handleChange}
                />
                <br />
                <br />
              </div>
              <div className="col-12 col-md-2"></div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
