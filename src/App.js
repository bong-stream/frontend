import React, { useState, useEffect } from "react";
import { getArtists } from "./Pagesactions/artistsactions";
import { getSongs } from "./Pagesactions/songsactions";
import { getUsers } from "./Pagesactions/usersactions";
import { getAlbums } from "./Pagesactions/albumactions";
import Sidedrawer from "./Components/Sidedrawer";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AdminHome from "./Pages/AdminHome";
import User from "./Pages/User";
import Artist from "./Pages/Artist";
import Songs from "./Pages/Songs";
import Albums from "./Pages/Albums";
import Signin from "./Pages/Signin";
import Admintrending from "./Pages/Admintrending";
import Adminpopular from "./Pages/Adminpopular";
import Admintopcharts from "./Pages/Admintopcharts";
import Managehomepage from "./Pages/Managehomepage";
import Bongplaylist from "./Pages/Bongplaylist";
import Topartists from "./Pages/Topartists";
import Topalbums from "./Pages/Topalbums";
import Recommended from "./Pages/Recommended";
import Genres from "./Pages/Genres";
import Category from "./Pages/Category";
import "./App.css";

export const GlobalData = React.createContext();

function App() {
  const [artists, setArtists] = useState();
  const [songs, setSongs] = useState();
  const [albums, setAlbums] = useState();
  const [users, setUsers] = useState();

  const [data, setData] = useState({
    users: [],
    artists: [],
    songs: [],
    albums: [],
  });

  // useEffect(() => {
  //   const fetchAlbums = async () => {
  //     let allAlbums;
  //     allAlbums = await getAlbums();
  //     console.log(allAlbums);
  //     setAlbums(allAlbums);
  //     setData({
  //       ...data,
  //       albums: allAlbums,
  //     });
  //   };

  //   const fetchSongs = async () => {
  //     let allSongs;
  //     allSongs = await getSongs();
  //     console.log(allSongs);
  //     setSongs(allSongs);
  //     setData({
  //       ...data,
  //       songs: allSongs,
  //     });
  //   };

  //   const fetchArtists = async () => {
  //     let allArtists;
  //     allArtists = await getArtists();
  //     console.log(allArtists);
  //     setArtists(allArtists);
  //     setData({
  //       ...data,
  //       artists: allArtists,
  //     });
  //   };

  //   const fetchUsers = async () => {
  //     let allUsers;
  //     allUsers = await getUsers();
  //     console.log(allUsers);
  //     setUsers(allUsers);
  //     setData({
  //       ...data,
  //       users: allUsers,
  //     });
  //   };

  //   fetchUsers();

  //   fetchArtists();
  //   fetchAlbums();
  //   fetchSongs();
  // }, []);
  return (
    <GlobalData.Provider value={(artists, songs, albums, users)}>
      <div className="App">
        {/* {console.log(users, artists, songs, albums)} */}

        <Router>
          <Sidedrawer />
          <Switch>
            <Route exact path="/" render={(routeProps) => <AdminHome />} />
            <Route exact path="/signin" render={(routeProps) => <Signin />} />

            <Route
              exact
              path="/admin/users"
              render={(routeProps) => <User />}
            />
            <Route
              exact
              path="/admin/albums"
              render={(routeProps) => <Albums />}
            />
            <Route
              exact
              path="/admin/artist"
              render={(routeProps) => <Artist />}
            />
            <Route
              exact
              path="/admin/songs"
              render={(routeProps) => <Songs />}
            />
            <Route
              exact
              path="/admin/trending"
              render={(routeProps) => <Admintrending />}
            />
            <Route
              exact
              path="/admin/popular"
              render={(routeProps) => <Adminpopular />}
            />
            <Route
              exact
              path="/admin/charts"
              render={(routeProps) => <Admintopcharts />}
            />
            <Route
              exact
              path="/admin/managehomepage"
              render={(routeProps) => <Managehomepage />}
            />
            <Route
              exact
              path="/admin/bongplaylist"
              render={(routeProps) => <Bongplaylist />}
            />
            <Route
              exact
              path="/admin/topalbums"
              render={(routeProps) => <Topalbums />}
            />
            <Route
              exact
              path="/admin/topartists"
              render={(routeProps) => <Topartists />}
            />
            <Route
              exact
              path="/admin/recommended"
              render={(routeProps) => <Recommended />}
            />
            <Route
              exact
              path="/admin/genres"
              render={(routeProps) => <Genres />}
            />
            <Route
              exact
              path="/admin/category"
              render={(routeProps) => <Category />}
            />
          </Switch>
        </Router>
      </div>
    </GlobalData.Provider>
  );
}

export default App;
