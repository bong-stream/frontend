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
import EditIcon from "@material-ui/icons/Edit";
import Editartist from "../Components/Editartist";

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

export default function Artiststable({
  data,
  handleDelete,
  handleEdit,
  openEdit,
}) {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = React.useState(false);

  const settingKeys = () => {
    let yoo = [];
    for (let key in data[0]) {
      console.log(key);
      yoo.push(key);
    }
    setKeys(yoo);
  };

  useEffect(() => {
    settingKeys();
  }, [data]);

  const hanldeDelete = (id) => {
    console.log(id);
    handleDelete(id);
  };

  const handleEditButton = (data) => {
    console.log(data);
    handleEdit(data);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {console.log(keys)}
              {keys.map((key) => (
                <StyledTableCell>{key}</StyledTableCell>
              ))}
              <StyledTableCell>Actions</StyledTableCell>
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
                <StyledTableCell align="left">
                  {row.albums.length}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.songs.length}
                </StyledTableCell>
                <StyledTableCell>{row._id}</StyledTableCell>
                <StyledTableCell align="left">{row.artistname}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.artistimage}
                </StyledTableCell>

                <StyledTableCell align="left">
                  <DeleteForeverIcon onClick={() => hanldeDelete(row._id)} />
                  <EditIcon
                    onClick={() =>
                      handleEditButton({
                        id: row._id,
                        artistimage: row.artistimage,
                        artistname: row.artistname,
                        albums: row.albums,
                        songs: row.songs,
                      })
                    }
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
