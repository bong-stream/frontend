import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import Userstable from "../Components/Userstable";
import {
  getUsers,
  addUsers,
  editUsers,
  activeUsers,
  deleteUsers,
} from "../Pagesactions/usersactions";
import Chart from "react-apexcharts";
import { Row, Col, Card } from "react-bootstrap";
import amountSpent from "../Components/charts/analytics-amount-spent";
import amountProcessed from "../Components/charts/analytics-amount-processed";
import profitProcessed from "../Components/charts/analytics-profit-processed";
import SimpleBreadcrumbs from "../Components/Breadcrumbs";
import View from "../Components/Userview";
import "../Styles/adminpages.css";
import "../Styles/adminuser.css";
import Icon from "@material-ui/core/Icon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Adduser from "../Components/Adduser";
import Edituser from "../Components/Edituser";
import Filters from "../Components/Filters";
import AddIcon from "@material-ui/icons/Add";
import Deletealert from "../Components/Deletealert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important",
    },
  },
}));

const invertDirection = {
  asc: "desc",
  desc: "asc",
};

const User = () => {
  const classes = useStyles();
  const [openAddUser, setOpenAddUser] = React.useState(false);
  const [users, setUsers] = useState();
  const [open, setOpen] = React.useState(false);
  const [viewData, setViewData] = useState();
  const [editData, setEditData] = useState();
  const [deleteId, setDeleteId] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [totalActiveUsers, setTotalActiveUsers] = useState();
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState();
  const [sortColumn, setSortColumn] = useState();

  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      let allUsers;
      let activeUsers;
      allUsers = await getUsers();
      // console.log(allUsers);
      setUsers({ users: allUsers, columnToSort: "", sortDirection: "" });

      activeUsers = allUsers.filter((user) => {
        return user.active === true;
      });
      // console.log(activeUsers);
      setTotalActiveUsers(activeUsers.length);
    };

    fetchUsers();
    setUpdateData(false);
  }, [updateData]);

  const handleUpdateData = () => {
    // console.log("i am yoooo");
    setUpdateData(true);
  };

  const handleToggleAddUser = () => {
    setOpenAddUser(!openAddUser);
  };
  const handleToggleEditUser = () => {
    setOpenEdit(!openEdit);
  };
  const handleToggleDeleteUser = () => {
    setOpenDelete(!openDelete);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (data) => {
    setViewData(data);
    handleClickOpen();
  };

  const handleAddUser = async (data) => {
    // console.log(data);
    let res = await addUsers(data);
    setUpdateData(true);
  };

  const handleEditData = (data) => {
    // console.log(data);
    setEditData(data);
    handleToggleEditUser();
  };

  const handleEdit = async (data) => {
    // console.log(data);
    let res;
    res = await editUsers(data);
    // console.log(res);
    setUpdateData(true);
  };

  const handleDeleteData = (id) => {
    // console.log(data);
    setDeleteId(id);
    handleToggleDeleteUser();
  };

  const handleDelete = async (id) => {
    console.log(id);
    let res;
    res = await deleteUsers(id);
    handleToggleDeleteUser();
    handleUpdateData();
  };

  const handleActiveChange = async (active, id) => {
    // console.log(active, id);
    let res = await activeUsers(active, id);
    setUpdateData(true);
  };

  const handleSearchChange = (evt) => {
    let yoo;
    setSearchValue(evt.target.value);
    // console.log(evt.target.value);
    yoo = users.users.filter((user) => user.name.includes(evt.target.value));
    // console.log(yoo);
    setSearch(yoo);
  };

  const handleSortType = (type, columnName) => {
    setUsers({
      ...users,
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

  return (
    <div className="main user">
      {/* {console.log(users)} */}
      <div>
        <div className="row">
          <div className="col-1 col-md-0"></div>
          <div className="col-10 col-md-11 ">
            {/* <Row>
              {users ? (
                <Col className="mb-4" md={4} xl={4}>
                  <Card className="amount-card overflow-hidden">
                    <Card.Body>
                      <h2 className="f-w-400">{users.users.length}</h2>
                      <p className="text-muted f-w-600 f-16">
                        <span className="text-c-blue">Registered</span> Users
                      </p>
                    </Card.Body>
                    <Chart {...amountProcessed} />
                  </Card>
                </Col>
              ) : null}

              <Col className="mb-4" md={4} xl={4}>
                <Card className="amount-card overflow-hidden">
                  <Card.Body>
                    <h2 className="f-w-400">{totalActiveUsers}</h2>
                    <p className="text-muted f-w-600 f-16">
                      <span className="text-c-green">Active</span> Users
                    </p>
                  </Card.Body>
                  <Chart {...amountSpent} />
                </Card>
              </Col>
              <Col className="mb-4" md={4} xl={4}>
                <Card className="amount-card overflow-hidden">
                  <Card.Body>
                    <h2 className="f-w-400">31</h2>
                    <p className="text-muted f-w-600 f-16">
                      <span className="text-c-yellow"></span> Processed till now
                    </p>
                  </Card.Body>
                  <Chart {...profitProcessed} />
                </Card>
              </Col>
            </Row> */}
            <div
              className="mb-1"
              style={{ height: "184px", backgroundColor: "#2F5184" }}
            >
              <div className="row">
                <div className="col-12 col-md-8 d-flex justify-content-start">
                  {" "}
                  <div class="input-group mt-2 ml-2">
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
                <div className="col-4 d-flex justify-content-end"></div>
              </div>
              <br />
              <div className="row m-2 text-white">
                <div className="col-12 col-md-8 d-flex justify-content-start">
                  {" "}
                  <div class="input-group ">
                    <h2>Users</h2>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <Filters
                    handleSortType={handleSortType}
                    filterName={{
                      name1: "Username A-Z",
                      name2: "Username Z-A",
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
                      className="btn  btn-danger"
                      onClick={handleToggleAddUser}
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
                        link: "/admin/users",
                        name: "Users",
                      },
                    ]}
                  />
                </div>

                {/* <div className ="row m-2 text-white" >
                  <div></div>

                </div> */}
              </div>
            </div>
            {/* {console.log("i am users", search)} */}
            {users ? (
              <Userstable
                className="mb-4"
                data={
                  searchValue.length > 0
                    ? orderBy(search, users.columnToSort, users.sortDirection)
                    : orderBy(
                        users.users,
                        users.columnToSort,
                        users.sortDirection
                      )
                }
                handleUpdateData={handleUpdateData}
                handleView={handleView}
                handleEdit={handleEditData}
                handleDelete={handleDeleteData}
                handleActiveChange={handleActiveChange}
              />
            ) : null}
            {open ? (
              <View open={open} handleClose={handleClose} data={viewData} />
            ) : null}
            {openAddUser ? (
              <Adduser
                open={openAddUser}
                handleToggle={handleToggleAddUser}
                handleAddUser={handleAddUser}
              />
            ) : null}
            {openEdit ? (
              <Edituser
                open={openEdit}
                handleEdit={handleEdit}
                handleToggle={handleToggleEditUser}
                data={editData}
              />
            ) : null}
            {openDelete ? (
              <Deletealert
                open={openDelete}
                handleClose={handleToggleDeleteUser}
                id={deleteId}
                handleDelete={handleDelete}
              />
            ) : null}
          </div>
          <div className="col-1 col-md-0 mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default User;
