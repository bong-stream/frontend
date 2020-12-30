import React, { useState, useEffect } from "react";
import Artiststable from "../Components/Artiststable";
import Addartist from "../Components/Addartist";
import Editartist from "../Components/Editartist";
import {
  getArtists,
  addArtists,
  deleteArtists,
  editArtists,
} from "../Pagesactions/artistsactions";
import Icon from "@material-ui/core/Icon";
import FaceIcon from "@material-ui/icons/Face";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import NavigationIcon from "@material-ui/icons/Navigation";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import "../Styles/adminpages.css";
import "../Styles/adminartist.css";

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editArtistData, setEditArtistData] = useState();
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      console.log(allArtists);
      setArtists(allArtists);
    };

    fetchArtists();
    setUpdateData(false);
  }, [updateData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditArtistData();
    console.log(editArtistData);
  };

  const addArtist = async (data, albums, songs) => {
    console.log(data, albums, songs);
    let res;
    res = await addArtists(data, albums, songs);
    setUpdateData(true);
  };

  const deleteArtist = async (id) => {
    console.log(id);
    let res;
    res = await deleteArtists(id);
    setUpdateData(true);
  };

  const editArtist = async (data) => {
    console.log(data);
    await setEditArtistData(data);
    setOpenEdit(true);
  };

  const handleEditArtist = async (data) => {
    let res;
    res = await editArtists(data);
    console.log(res);
    setUpdateData(true);
  };

  return (
    <div className="main artist">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-2"></div>
          <div className="col-10 col-md-8">
            <Row>
              <Col className="mb-4" xl={6} md={6}>
                {artists ? (
                  <Card>
                    <Card.Body>
                      <Row className="align-items-center m-l-0">
                        <Col sm="auto">
                          {/* <i className="icon feather icon-book f-30 text-c-purple" /> */}
                          <FaceIcon style={{ color: "#f44040" }} />
                        </Col>
                        <Col>
                          <h6 className="text-muted m-b-10">Total Artists</h6>
                          <h2 className="m-b-0">{artists.length}</h2>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ) : null}
              </Col>
              <Col className="mb-4" xl={6} md={6}>
                <Card>
                  <Card.Body>
                    <Row className="align-items-center m-l-0">
                      <Col sm="auto">
                        <FavoriteIcon style={{ color: "#f44040" }} />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">
                          Total artists likes
                        </h6>
                        <h2 className="m-b-0">0</h2>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4" xl={6} md={6}>
                <Card>
                  <Card.Body>
                    <Row className="align-items-center m-l-0">
                      <Col sm="auto">
                        {/* <i className="icon feather icon-users f-30 text-c-red" /> */}
                        <NavigationIcon style={{ color: "#f44040" }} />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">New Artists</h6>
                        <h2 className="m-b-0">0</h2>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4" xl={6} md={6}>
                <Card>
                  <Card.Body>
                    <Row className="align-items-center m-l-0">
                      <Col sm="auto">
                        <i className="icon feather icon-award f-30 text-c-blue" />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">Unique Innovation</h6>
                        <h2 className="m-b-0">325</h2>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {artists ? (
              <Artiststable
                data={artists}
                handleDelete={deleteArtist}
                handleEdit={editArtist}
                className="mb-4"
              />
            ) : null}
            {open ? (
              <Addartist
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                addArtist={addArtist}
              />
            ) : null}

            {editArtistData ? (
              <Editartist
                data={editArtistData}
                open={openEdit}
                handleClickOpen={handleClickOpenEdit}
                handleCloseEdit={handleCloseEdit}
                handleEditArtist={handleEditArtist}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-2 mb-4">
            <h3 style={{ color: "white" }}> New Artist </h3>
            <Icon style={{ marginTop: "500px" }}>
              <AddCircleIcon
                style={{ color: "#F44040", fontSize: 50, marginTop: "10px" }}
                onClick={handleClickOpen}
              />
            </Icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
