import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import Infotable from "../Components/Infotable";
import Addsocialmedia from "../Components/Addsocialmedia";
import Editgenres from "../Components/Editgenres";
import {
  getSocialmedia,
  addSocialmedia,
  editSocialmedia,
  deleteSocialmedia,
} from "../Pagesactions/socialmediaactions";
import { getSongs } from "../Pagesactions/songsactions";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Viewartist from "../Components/Viewartist";
import "../Styles/adminpages.css";
import "../Styles/adminartist.css";
import Filters from "../Components/Filters";
import AddIcon from "@material-ui/icons/Add";
import SimpleBreadcrumbs from "../Components/Breadcrumbs";

const Socialmedia = () => {
  const [tags, setTags] = useState();
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [editGenreData, setEditGenreData] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [viewData, setViewData] = useState();
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [totalActiveGenres, setTotalActiveGenres] = useState();

  useEffect(() => {
    const fetchTags = async () => {
      let allTags;
      let activeTags;
      allTags = await getSocialmedia();
      console.log(allTags);
      setTags({ tags: allTags, columnToSort: "", sortDirection: "" });
      //   activeTags = allTags.filter((user) => {
      //     return user.active === true;
      //   });
      // console.log(activeTags);
      //   setTotalActiveTags(activeTags.length);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setSongs(allSongs);
    };

    fetchSongs();
    fetchTags();

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
    setEditGenreData();
    // console.log(editGenreData);
  };

  const addTag = async (data) => {
    console.log(data);
    let res;
    res = await addSocialmedia(data);
    setUpdateData(true);
  };

  const deleteGenre = async (id) => {
    // console.log(id);
    let res;
    res = await deleteSocialmedia(id);
    setUpdateData(true);
  };

  const editGenre = async (data) => {
    // console.log(data);
    await setEditGenreData(data);
    setOpenEdit(true);
  };

  const handleEditGenre = async (data) => {
    console.log(data);
    let res;
    res = await editSocialmedia(data);
    // console.log(res);
    setUpdateData(true);
  };

  const handleToggleView = () => {
    setOpenView(!openView);
  };

  const handleView = (data) => {
    // console.log(data);
    setViewData(data);
    handleToggleView();
  };

  const handleSearchChange = (evt) => {
    let yoo;
    setSearchValue(evt.target.value);
    // console.log(evt.target.value);
    yoo = tags.tags.filter((user) => {
      return user.name.toLowerCase().includes(evt.target.value.toLowerCase());
    });
    // console.log(yoo);
    setSearch(yoo);
  };
  const handleSortType = (type, columnName) => {
    setTags({
      ...tags,
      columnToSort: columnName,
      sortDirection: type,
    });
    // this.setState((state) => ({
    //   columnToSort: columnName,
    //   sortDirection:
    //     state.columnToSort === columnName
    //       ? invertDirection[state.sortDirection]
    //       : "asc",
    // }));
  };
  //   const handleActiveChange = async (active, id) => {
  //     // console.log(active, id);
  //     let res = await activeTags(active, id);
  //     setUpdateData(true);
  //   };

  return (
    <div className="main artist">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-0"></div>
          <div className="col-10 col-md-11 ">
            {/* <h3 className="text-white">Genres</h3>
            <br />
            <br /> */}
            <div
              className="mb-1"
              style={{ height: "184px", backgroundColor: "#2F5184" }}
            >
              <div className="row">
                <div className="col-12 col-md-8 d-flex justify-content-start">
                  {" "}
                  <div class="input-group mt-2 ml-2 ">
                    <input
                      type="text"
                      class="form-control"
                      placeholder=" &#xF002;  Search"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={searchValue}
                      onChange={handleSearchChange}
                      style={{
                        height: "55px",
                        fontFamily: "FontAwesome",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4 col-md-12 d-flex justify-content-end"></div>
                {/* <div className="col-4 d-flex justify-content-end">
                  <Filters
                    handleSortType={handleSortType}
                    filterName={{
                      name1: "Genres name A-Z",
                      name2: "Genres name Z-A",
                      date1: "Date up",
                      date2: "Date down",
                    }}
                    columnName={{
                      name1: "genresname",
                      name2: "date",
                    }}
                    type={{
                      asc: "asc",
                      desc: "desc",
                    }}
                  />
                  <button
                    className="btn  btn-sm btn-danger m-0"
                    onClick={handleClickOpen}
                  >
                    Add{" "}
                    <AddCircleIcon
                      style={{
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </button>
                </div> */}
              </div>
              <br />

              <div className="row m-2 text-white">
                <div className="col-12 col-md-8 d-flex justify-content-start">
                  {" "}
                  <div class="input-group ">
                    <h2>Social Media</h2>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <Filters
                    handleSortType={handleSortType}
                    filterName={{
                      name1: "Social Media name A-Z",
                      name2: "Social Media name Z-A",
                      date1: "Date up",
                      date2: "Date down",
                    }}
                    columnName={{
                      name1: "name",
                      name2: "date",
                    }}
                    type={{
                      asc: "asc",
                      desc: "desc",
                    }}
                  />
                  <div>
                    <button
                      className="btn  btn-danger m-0"
                      onClick={handleClickOpen}
                      style={{ width: "120px", height: "40px" }}
                    >
                      <AddIcon
                        style={{
                          margin: 0,
                          padding: 0,
                        }}
                      />{" "}
                      Add
                    </button>
                  </div>
                </div>
                <div className=" m-2 text-white">
                  <SimpleBreadcrumbs
                    data={[
                      {
                        link: "/",
                        name: "Home",
                      },
                      {
                        link: "/admin/socialmedia",
                        name: "Social Media",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <br />
            {tags ? (
              <Infotable
                // data={searchValue.length > 0 ? search : genres.genres}
                data={
                  searchValue.length > 0
                    ? orderBy(search, tags.columnToSort, tags.sortDirection)
                    : orderBy(tags.tags, tags.columnToSort, tags.sortDirection)
                }
                handleDelete={deleteGenre}
                handleEdit={editGenre}
                className="mb-4"
                handleView={handleView}
              />
            ) : null}
            {open ? (
              <Addsocialmedia
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                addTags={addTag}
              />
            ) : null}

            {editGenreData ? (
              <Editgenres
                data={editGenreData}
                open={openEdit}
                handleClickOpen={handleClickOpenEdit}
                handleCloseEdit={handleCloseEdit}
                handleEditGenre={handleEditGenre}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-0 mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Socialmedia;
