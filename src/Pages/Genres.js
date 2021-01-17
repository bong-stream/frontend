import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import Genrestable from "../Components/Genrestable";
import Addgenres from "../Components/Addgenres";
import Editgenres from "../Components/Editgenres";
import {
  getGenres,
  addGenres,
  editGenres,
  deleteGenres,
  activeGenres,
} from "../Pagesactions/genresactions";
import { getSongs } from "../Pagesactions/songsactions";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Viewartist from "../Components/Viewartist";
import "../Styles/adminpages.css";
import "../Styles/adminartist.css";
import Filters from "../Components/Filters";

const Genres = () => {
  const [genres, setGenres] = useState();
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
    const fetchGenres = async () => {
      let allGenres;
      let activeGenres;
      allGenres = await getGenres();
      console.log(allGenres);
      setGenres({ genres: allGenres, columnToSort: "", sortDirection: "" });
      activeGenres = allGenres.filter((user) => {
        return user.active === true;
      });
      // console.log(activeGenres);
      setTotalActiveGenres(activeGenres.length);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setSongs(allSongs);
    };

    fetchSongs();
    fetchGenres();

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

  const addGenre = async (data) => {
    // console.log(data);
    let res;
    res = await addGenres(data);
    setUpdateData(true);
  };

  const deleteGenre = async (id) => {
    // console.log(id);
    let res;
    res = await deleteGenres(id);
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
    res = await editGenres(data);
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
    yoo = genres.genres.filter((user) => {
      return user.genresname
        .toLowerCase()
        .includes(evt.target.value.toLowerCase());
    });
    // console.log(yoo);
    setSearch(yoo);
  };
  const handleSortType = (type, columnName) => {
    setGenres({
      ...genres,
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
  const handleActiveChange = async (active, id) => {
    // console.log(active, id);
    let res = await activeGenres(active, id);
    setUpdateData(true);
  };

  return (
    <div className="main artist">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-0"></div>
          <div className="col-10 col-md-11 ">
            <h3 className="text-white">Genres</h3>
            <br />
            <br />
            <div>
              <div className="row">
                <div className="col-12 col-md-8 d-flex justify-content-start">
                  {" "}
                  <div class="input-group ">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search by Genres Name"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <div class="input-group-append">
                      <button className="btn btn-danger">Search</button>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-end">
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
                </div>
              </div>
            </div>
            <br />
            {genres ? (
              <Genrestable
                // data={searchValue.length > 0 ? search : genres.genres}
                data={
                  searchValue.length > 0
                    ? orderBy(search, genres.columnToSort, genres.sortDirection)
                    : orderBy(
                        genres.genres,
                        genres.columnToSort,
                        genres.sortDirection
                      )
                }
                handleDelete={deleteGenre}
                handleEdit={editGenre}
                className="mb-4"
                handleView={handleView}
                handleActiveChange={handleActiveChange}
              />
            ) : null}
            {open ? (
              <Addgenres
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                addGenres={addGenre}
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

            {openView ? (
              <Viewartist
                open={openView}
                handleToggleView={handleToggleView}
                data={viewData}
                albums={albums}
                songs={songs}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-0 mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Genres;
