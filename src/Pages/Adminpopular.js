import React, { useState, useEffect } from "react";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Trendingtable from "../Components/Trendingtable";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Addpopular from "../Components/Addpopular";
import {
  addPopular,
  editPopular,
  getPopular,
} from "../Pagesactions/songsactions";

const Adminpopular = () => {
  const [open, setOpen] = React.useState(false);
  const [popular, setPopular] = useState();
  const [updateData, setUpdateData] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPopular = (data) => {
    console.log(data);
    // addPopular(data);
    // console.log("yoo");
    editPopular(data);
    setUpdateData(true);
  };

  const handleDeleteList = () => {
    let yoo = [];
    editPopular(yoo);
    setUpdateData(true);
  };

  const handleDeleteSong = async (id) => {
    console.log(id);
    let popularSongs = popular[0].popular;
    let filterSongs;
    filterSongs = popularSongs.filter((song) => {
      return song._id !== id;
    });
    console.log(filterSongs);
    // setpopular(filterSongs)
    await editPopular(filterSongs);
    setUpdateData(true);
  };
  useEffect(() => {
    const fetchPopular = async () => {
      let allPopular;
      allPopular = await getPopular();
      console.log(allPopular);
      setPopular(allPopular);
    };

    fetchPopular();
    setUpdateData(false);
  }, [updateData]);

  return (
    <div className="main">
      <div>
        <h2>Popular Songs</h2>
        <br />
      </div>
      <div className="container">
        <div className="row">
          <div className=" mb-4 col-12 col-md-2">
            <button
              style={{ width: "120px" }}
              className="btn btn-sm btn-danger"
              onClick={handleClickOpen}
            >
              New List <AddCircleIcon />
            </button>
            <br />
            <br />
            <button
              style={{ width: "120px" }}
              className="btn btn-sm btn-danger"
              onClick={handleDeleteList}
            >
              Delete List <DeleteIcon />
            </button>
            {open ? (
              <Addpopular
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleAddPopular={handleAddPopular}
              />
            ) : null}
          </div>
          <div className="col-12 col-md-8 ">
            <div className="row">
              <div className="col-0 col-md-2"></div>
              <div className="col-11 col-md-6">
                {popular ? (
                  <React.Fragment>
                    {popular[0].popular.length === 0 ? (
                      " Popular List is Empty"
                    ) : (
                      <div style={{ width: "100%" }}>
                        {popular ? (
                          <Trendingtable
                            data={popular[0].popular}
                            handleDeleteSong={handleDeleteSong}
                          />
                        ) : null}
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
              </div>
              <div className="col-1 col-md-2"></div>
            </div>
          </div>
          <div className="col-12 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Adminpopular;
