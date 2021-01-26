import React, { useState, useEffect, useCallback } from "react";
import { getArtists, findArtist } from "../Pagesactions/artistsactions";
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
import Imageavatar from "../Components/Imageavatar.js";
import VisibilityIcon from "@material-ui/icons/Visibility";
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

export default function Albumstable({
  data,
  handleDelete,
  handleEdit,
  handleView,
  handleActiveChange,
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

  // const hanldeDelete = (id) => {
  //   // console.log(id);
  //   handleDelete(id);
  // };

  const handleDeleteButton = (id) => {
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
              <StyledTableCell>Albums Image</StyledTableCell>
              <StyledTableCell>Albums Name</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>
              <StyledTableCell>Tracks</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
              <StyledTableCell>Poets</StyledTableCell>
              <StyledTableCell>Mix and Master</StyledTableCell>
              <StyledTableCell>Producer</StyledTableCell>
              <StyledTableCell>Label</StyledTableCell>
              <StyledTableCell>Genres</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>

              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell> Deactivate</StyledTableCell>

              <StyledTableCell>Delete</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.root}>
            {data.map((row, idx) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>
                  <Imageavatar imageSrc={row.albumimage} />
                </StyledTableCell>
                <StyledTableCell align="right">{row.albumname}</StyledTableCell>
                {artists ? (
                  <>
                    {artists.map((artist) => {
                      return artist._id === row.artists ? (
                        <StyledTableCell align="right">
                          {artist.artistname}
                        </StyledTableCell>
                      ) : null;
                    })}
                  </>
                ) : null}

                <StyledTableCell>{row.songs.length}</StyledTableCell>
                <StyledTableCell>{row.duration}</StyledTableCell>
                <StyledTableCell>{row.poets}</StyledTableCell>
                <StyledTableCell>{row.mixmaster}</StyledTableCell>
                <StyledTableCell>{row.producer}</StyledTableCell>
                <StyledTableCell>{row.label}</StyledTableCell>
                <StyledTableCell>{row.genres}</StyledTableCell>
                <StyledTableCell>{row.year}</StyledTableCell>
                <StyledTableCell align="left">
                  {/* {console.log(row.active)} */}
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
                    onClick={() => handleDeleteButton(row._id)}
                    className="btn btn-sm btn-danger"
                  >
                    <DeleteForeverIcon />
                  </button>
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    onClick={() =>
                      handleEditButton({
                        id: row._id,
                        albumimage: row.albumimage,
                        albumname: row.albumname,
                        artists: row.artists,
                        songs: row.songs,
                        tracks: row.tracks,
                        genres: row.genres,
                        duration: row.duration,
                        poets: row.poets,
                        mixmaster: row.mixmaster,
                        producer: row.producer,
                        year: row.year,
                        label: row.label,
                        summary: row.summary,
                      })
                    }
                    className="btn btn-sm btn-primary"
                  >
                    <EditIcon />
                  </button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      handleView({
                        id: row._id,
                        albumimage: row.albumimage,
                        albumname: row.albumname,
                        artists: row.artists,
                        songs: row.songs,
                        tracks: row.tracks,
                        genres: row.genres,
                        duration: row.duration,
                        poets: row.poets,
                        mixmaster: row.mixmaster,
                        producer: row.producer,
                        year: row.year,
                        label: row.label,
                        summary: row.summary,
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
