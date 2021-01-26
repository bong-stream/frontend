import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Deletealert({ open, handleClose, handleDelete, id }) {
  console.log(id);
  const handleDeleteButton = () => {
    handleDelete(id);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Are you Sure you want to Delete
        </DialogTitle>
        <br />
        <br />
        <div className="d-flex justify-content-center mx-5">
          <button
            style={{ width: "160px", height: "40px" }}
            className="btn  btn-primary m-1"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            style={{ width: "160px", height: "40px" }}
            className="btn  btn-danger m-1"
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        </div>
        <br />
        <br />

        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Delete
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
