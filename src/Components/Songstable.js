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
import Imageavatar from "./Imageavatar";
import Active from "../Components/Active";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

export default function Albumstable({
  data,
  handleDelete,
  handleEdit,
  handleActiveChange,
  handleView,
}) {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [artists, setArtists] = useState();
  const [artistName, setArtistName] = useState();

  const settingKeys = () => {
    let yoo = [];
    for (let key in data[0]) {
      // console.log(key);
      yoo.push(key);
    }
    setKeys(yoo);
  };

  useEffect(() => {
    const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      // console.log(allArtists);
      setArtists(allArtists);
    };

    fetchArtists();
    settingKeys();
  }, [data]);

  const hanldeDelete = (id) => {
    // console.log(id);
    handleDelete(id);
  };

  const handleEditButton = (data) => {
    // console.log(data);
    handleEdit(data);
  };

  const findArtistName = (id) => {
    let name;
    // console.log(artists);
    name = artists.filter((artist) => {
      return artist._id === id;
    });
    // return name;
  };

  const handleActive = (active, id) => {
    // console.log(active, id);
    // setActive(active)
    handleActiveChange(active, id);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* {console.log(data)} */}
              {/* {keys.map((key) => (
                <StyledTableCell>{key}</StyledTableCell>
              ))} */}

              <StyledTableCell>Song Image</StyledTableCell>
              <StyledTableCell>Song Name</StyledTableCell>
              <StyledTableCell>Artists</StyledTableCell>
              <StyledTableCell>Albums</StyledTableCell>
              <StyledTableCell>Poets</StyledTableCell>
              <StyledTableCell>Mix and Master</StyledTableCell>
              <StyledTableCell>Producer</StyledTableCell>
              <StyledTableCell>Label</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell> Deactivate</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <StyledTableRow key={row._id}>
                {/* {console.log(row)} */}
                <StyledTableCell align="left">
                  {" "}
                  <Imageavatar imageSrc={row.songimage} />
                </StyledTableCell>
                <StyledTableCell align="left">{row.songname}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.artists.length}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.albums.length}
                </StyledTableCell>
                <StyledTableCell align="left">{row.poet}</StyledTableCell>
                <StyledTableCell align="left">{row.mixmaster}</StyledTableCell>
                <StyledTableCell align="left">{row.producer}</StyledTableCell>
                <StyledTableCell align="left">{row.label}</StyledTableCell>
                <StyledTableCell align="left">{row.year}</StyledTableCell>

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
                    onClick={() => hanldeDelete(row._id)}
                    className="btn btn-sm btn-danger"
                  >
                    {" "}
                    <DeleteForeverIcon />
                  </button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    onClick={() =>
                      handleEditButton({
                        id: row._id,
                        songname: row.songname,
                        songimage: row.songimage,
                        noofplays: row.noofplays,
                        artists: row.artists,
                        genres: row.genres,
                        albums: row.albums,
                        category: row.category,
                        poet: row.poet,
                        mixmaster: row.mixmaster,
                        producer: row.producer,
                        label: row.label,
                        year: row.year,
                        summary: row.summary,
                        lyrics: row.lyrics,
                        relatedSongs: row.relatedSongs,
                      })
                    }
                    className="btn btn-sm btn-primary"
                  >
                    <EditIcon />
                  </button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    disabled
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      handleView({
                        id: row._id,
                        songname: row.songname,
                        songimage: row.songimage,
                        noofplays: row.noofplays,
                        artists: row.artists,
                        genres: row.genres,
                        poet: row.poet,
                        mixmaster: row.mixmaster,
                        producer: row.producer,
                        label: row.label,
                        year: row.year,
                        summary: row.summary,
                        lyrics: row.lyrics,
                        relatedSongs: row.relatedSongs,
                      });
                    }}
                  >
                    <VisibilityIcon />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
