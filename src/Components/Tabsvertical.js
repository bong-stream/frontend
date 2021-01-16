import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Trendingtable from "../Components/Trendingtable";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tabsvertical = ({ data, handleDeleteSong, handleNewSort, handleId }) => {
  const classes = useStyles();
  const [active, setActive] = useState("active");
  const [id, setId] = useState();
  const [color, setColor] = useState(false);

  const handleClick = (id) => {
    // console.log(id);
    setId(id);
    handleId(id);
    setColor(true);
    // setActive("active");
  };
  return (
    <div>
      {/* {console.log(data)} */}
      <div class="row">
        <div className="col-2"></div>
        <div class="col-3">
          <h5>Charts</h5>
          <div
            class="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {data.map((value) => {
              return (
                <div>
                  <a
                    class={`nav-link btn btn-${
                      value.id === id ? "primary" : "danger"
                    } btn-sm`}
                    id={value.id}
                    data-toggle="pill"
                    href={`#${value.id}`}
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                    onClick={() => handleClick(value.id)}
                  >
                    {value.name}
                  </a>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
        <div class="col-7">
          <div className="row">
            <div className="col-1 col-md-0"></div>
            <div className="col-10 col-md-12">
              {active ? (
                <div class="tab-content" id="v-pills-tabContent">
                  {/* {console.log(data.length)} */}
                  {data.map((value) => (
                    <div
                      class={`tab-pane fade show  ${
                        value.id === id ? active : ""
                      }`}
                      id={`${value.id}`}
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      {value.topchart.length === 0 ? (
                        "List is Empty"
                      ) : (
                        <div>
                          <List className={classes.root}>
                            <ListItem key={value} button>
                              <ListItemAvatar>
                                <Avatar
                                  alt={`Avatar n°${value + 1}`}
                                  src={value.image}
                                />
                              </ListItemAvatar>
                              <h4 style={{ color: "black" }}>{value.name}</h4>
                              {/* <ListItemText
                              // id={labelId}
                              primary={value.name}
                            /> */}
                            </ListItem>
                            <Divider />
                          </List>
                          <Trendingtable
                            data={value.topchart}
                            handleDeleteSong={handleDeleteSong}
                            handleNewSort={handleNewSort}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="col-1 col-md-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabsvertical;
