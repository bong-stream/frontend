import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import Categorytable from "../Components/Categorytable";
import Addcategory from "../Components/Addcategory";
import EditCategory from "../Components/EditCategory";
import {
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  activeCategory,
} from "../Pagesactions/categoryactions";
import { getSongs } from "../Pagesactions/songsactions";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Viewartist from "../Components/Viewartist";
import "../Styles/adminpages.css";
import "../Styles/adminartist.css";
import Filters from "../Components/Filters";

const Category = () => {
  const [category, setCategory] = useState();
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [editCategoryData, setEditCategoryData] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [viewData, setViewData] = useState();
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [totalActiveCategory, setTotalActiveCategory] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      let allCategory;
      let activeCategory;
      allCategory = await getCategory();
      console.log(allCategory);
      setCategory({
        category: allCategory,
        columnToSort: "",
        sortDirection: "",
      });
      activeCategory = allCategory.filter((user) => {
        return user.active === true;
      });
      // console.log(activeCategory);
      setTotalActiveCategory(activeCategory.length);
    };

    const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      // console.log(allSongs);
      setSongs(allSongs);
    };

    fetchSongs();
    fetchCategory();

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
    setEditCategoryData();
    // console.log(editCategoryData);
  };

  const addGenre = async (data) => {
    console.log(data);
    let res;
    res = await addCategory(data);
    setUpdateData(true);
  };

  const deleteGenre = async (id) => {
    // console.log(id);
    let res;
    res = await deleteCategory(id);
    setUpdateData(true);
  };

  const editGenre = async (data) => {
    // console.log(data);
    await setEditCategoryData(data);
    setOpenEdit(true);
  };

  const handleEditGenre = async (data) => {
    console.log(data);
    let res;
    res = await editCategory(data);
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
    yoo = category.category.filter((user) => {
      return user.categoryname
        .toLowerCase()
        .includes(evt.target.value.toLowerCase());
    });
    // console.log(yoo);
    setSearch(yoo);
  };
  const handleSortType = (type, columnName) => {
    setCategory({
      ...category,
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
    let res = await activeCategory(active, id);
    setUpdateData(true);
  };

  return (
    <div className="main artist">
      <div className="conatiner">
        <div className="row">
          <div className="col-1 col-md-0"></div>
          <div className="col-10 col-md-11 ">
            <h3 className="text-white">Categories</h3>
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
                      placeholder="Search by Category Name"
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
                      name1: "Category name A-Z",
                      name2: "Category name Z-A",
                      date1: "Date up",
                      date2: "Date down",
                    }}
                    columnName={{
                      name1: "categoryname",
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
            {category ? (
              <Categorytable
                // data={searchValue.length > 0 ? search : category.category}
                data={
                  searchValue.length > 0
                    ? orderBy(
                        search,
                        category.columnToSort,
                        category.sortDirection
                      )
                    : orderBy(
                        category.category,
                        category.columnToSort,
                        category.sortDirection
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
              <Addcategory
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                addGenres={addGenre}
              />
            ) : null}

            {editCategoryData ? (
              <EditCategory
                data={editCategoryData}
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

export default Category;
