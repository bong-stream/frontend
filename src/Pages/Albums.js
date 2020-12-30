import React, { useState, useEffect } from "react";
import Albumstable from "../Components/Albumstable";
import Editalbum from "../Components/Editalbum";
import {
  getAlbums,
  addAlbums,
  deleteAlbums,
  editAlbums,
} from "../Pagesactions/albumactions";
import Icon from "@material-ui/core/Icon";
import FaceIcon from "@material-ui/icons/Face";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import NavigationIcon from "@material-ui/icons/Navigation";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Addalbum from "../Components/Addalbum";
import AlbumIcon from "@material-ui/icons/Album";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import "../Styles/adminpages.css";
import "../Styles/adminalbum.css";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editAlbumData, setEditAlbumData] = useState();

  useEffect(() => {
    const fetchAlbums = async () => {
      let allAlbums;
      allAlbums = await getAlbums();
      console.log(allAlbums);
      setAlbums(allAlbums);
    };

    fetchAlbums();
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
    setEditAlbumData();
    console.log(editAlbumData);
  };

  const addAlbum = async (data) => {
    console.log(data);

    let res = await addAlbums(data);
    setUpdateData(true);
  };

  const deleteAlbum = async (id) => {
    console.log(id);
    let res;
    res = await deleteAlbums(id);
    setUpdateData(true);
  };

  const editAlbum = async (data) => {
    console.log(data);

    await setEditAlbumData(data);
    setOpenEdit(true);
  };

  const handleEditAlbum = async (data) => {
    console.log(data);
    let res;
    res = await editAlbums(data);
    setUpdateData(true);
  };

  return (
    <div className="main album">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-2"></div>
          <div className="col-10 col-md-8">
            <Row>
              <Col className="mb-4" xl={6} md={6}>
                {albums ? (
                  <Card>
                    <Card.Body>
                      <Row className="align-items-center m-l-0">
                        <Col sm="auto">
                          {/* <i className="icon feather icon-book f-30 text-c-purple" /> */}
                          <AlbumIcon style={{ color: "#f44040" }} />
                        </Col>
                        <Col>
                          <h6 className="text-muted m-b-10">Total Albums</h6>
                          <h2 className="m-b-0">{albums.length}</h2>
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
                          Total Albums likes
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
                        {/* <i className="icon feather icon-award f-30 text-c-blue" /> */}
                        <PlayArrowIcon style={{ color: "#f44040" }} />
                      </Col>
                      <Col>
                        <h6 className="text-muted m-b-10">Albums Played</h6>
                        <h2 className="m-b-0">0</h2>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {albums ? (
              <Albumstable
                data={albums}
                handleDelete={deleteAlbum}
                handleEdit={editAlbum}
              />
            ) : null}
            <Addalbum
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              addAlbum={addAlbum}
            />
            {editAlbumData ? (
              <Editalbum
                data={editAlbumData}
                open={openEdit}
                handleClickOpen={handleClickOpenEdit}
                handleCloseEdit={handleCloseEdit}
                handleEditAlbum={handleEditAlbum}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-2 mb-4">
            <h3 style={{ color: "white" }}>New Album</h3>
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

export default Albums;
