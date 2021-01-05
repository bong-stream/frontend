import React, { useState, useEffect, useCallback } from "react";
import { getArtists } from "../Pagesactions/artistsactions";
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

export default function Albumstable({ data, handleDelete, handleEdit }) {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [artists, setArtists] = useState();
  const [artistName, setArtistName] = useState();

  const settingKeys = () => {
    let yoo = [];
    for (let key in data[0]) {
      console.log(key);
      yoo.push(key);
    }
    setKeys(yoo);
  };

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      console.log(allArtists);
      setArtists(allArtists);
    };

    fetchArtists();
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

  const findArtistName = (id) => {
    let name;
    console.log(artists);
    name = artists.filter((artist) => {
      return artist._id === id;
    });
    // return name;
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {console.log(data)}
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
                {console.log(row)}
                <StyledTableCell align="left">
                  {row.artists.length}
                </StyledTableCell>
                <StyledTableCell align="left">{row._id}</StyledTableCell>

                <StyledTableCell align="left">{row.songname}</StyledTableCell>

                {/* <StyledTableCell align="left">{row.songimage}</StyledTableCell> */}
                <StyledTableCell align="left">{row.noofplays}</StyledTableCell>
                {/* <StyledTableCell align="right">
                  {artists ? findArtistName(row.artists) : null}
                </StyledTableCell> */}
                {/* <StyledTableCell align="right">
                {row.album.length}
              </StyledTableCell> */}
                <StyledTableCell align="left">
                  <DeleteForeverIcon onClick={() => hanldeDelete(row._id)} />
                  <EditIcon
                    onClick={() =>
                      handleEditButton({
                        id: row._id,
                        songname: row.songname,
                        songimage: row.songimage,
                        noofplays: row.noofplays,
                        artists: row.artists,
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
