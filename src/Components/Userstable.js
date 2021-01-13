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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Userstable({ data, handleUpdateData }) {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);

  const settingKeys = () => {
    let yoo = [];
    for (let key in data[0]) {
      console.log(key);
      yoo.push(key);
    }
    setKeys(yoo);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteUsers(id);
    handleUpdateData();
  };

  useEffect(() => {
    settingKeys();
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {console.log(keys)}
            {keys.map((key) => (
              <StyledTableCell>{key}</StyledTableCell>
            ))}
            <StyledTableCell> Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <StyledTableRow key={row._id}>
              {/* {console.log(idx)}
              {Object.values(row).map((value, idx) => {
                console.log(value, idx);
                <StyledTableCell>{value}</StyledTableCell>;
              })} */}
              <StyledTableCell>{row._id}</StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.age}</StyledTableCell>
              <StyledTableCell align="left">{row.gender}</StyledTableCell>
              <StyledTableCell align="left">
                <DeleteForeverIcon onClick={() => handleDelete(row._id)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
