import React, { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deleteUsers } from "../Pagesactions/usersactions";
import Imageavatar from "./Imageavatar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Active from "../Components/Active";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#F44040",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Userstable({
  data,
  handleUpdateData,
  handleView,
  handleEdit,
  handleActiveChange,
}) {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [active, setActive] = useState();

  const settingKeys = () => {
    let yoo = [];
    for (let key in data[0]) {
      // console.log(key);
      yoo.push(key);
    }
    setKeys(yoo);
  };

  const handleDelete = async (id) => {
    // console.log(id);
    let res;
    res = await deleteUsers(id);
    handleUpdateData();
  };

  const handleEditButton = (data) => {
    // console.log(data);
    handleEdit(data);
  };

  const handleActive = (active, id) => {
    // console.log(active, id);
    // setActive(active)
    handleActiveChange(active, id);
  };

  useEffect(() => {
    settingKeys();
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> User Image</StyledTableCell>
            <StyledTableCell> User Name</StyledTableCell>
            <StyledTableCell> Age</StyledTableCell>
            <StyledTableCell> Gender</StyledTableCell>
            <StyledTableCell> Phone Number</StyledTableCell>
            <StyledTableCell> Email</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell> Deactivate Account</StyledTableCell>
            <StyledTableCell> Delete</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell> View</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>
                <Imageavatar imageSrc={row.userimage} />
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.age}</StyledTableCell>
              <StyledTableCell align="left">{row.gender}</StyledTableCell>
              <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">
                {row.active ? (
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        backgroundColor: "#32EC5D",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        position: "absolute",
                        right: "-1%",
                        top: "-5px",
                      }}
                    ></div>
                    Active
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        backgroundColor: "#F91541",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        position: "absolute",
                        right: "-1%",
                        top: "-5px",
                      }}
                    ></div>
                    Deactivated
                  </div>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Active
                  label={row._id}
                  handleChange={handleActive}
                  active={row.active}
                />
              </StyledTableCell>

              <StyledTableCell align="left">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(row._id)}
                >
                  <DeleteForeverIcon />
                </button>
              </StyledTableCell>
              <StyledTableCell align="left">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    handleEditButton({
                      id: row._id,
                      userimage: row.userimage,
                      name: row.name,
                      gender: row.gender,
                      age: row.age,
                      email: row.email,
                      phoneNumber: row.phoneNumber,
                    })
                  }
                >
                  <EditIcon />
                </button>
              </StyledTableCell>
              <StyledTableCell align="left">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() =>
                    handleView({
                      _id: row._id,
                      name: row.name,
                      gender: row.gender,
                      age: row.age,
                      email: row.email,
                      phoneNumber: row.phoneNumber,
                      image: row.userimage,
                    })
                  }
                >
                  <VisibilityIcon />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
