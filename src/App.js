import React, { useState, useEffect } from 'react';
import { getArtists } from './Pagesactions/artistsactions';
import { getSongs } from './Pagesactions/songsactions';
import { getUsers } from './Pagesactions/usersactions';
import { getAlbums } from './Pagesactions/albumactions';
import Sidedrawer from './Components/Sidedrawer';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHome from './Pages/AdminHome';
import User from './Pages/User';
import Artist from './Pages/Artist';
import Songs from './Pages/Songs';
import Albums from './Pages/Albums';
import Signin from './Pages/Signin';
import Admintrending from './Pages/Admintrending';
import Adminpopular from './Pages/Adminpopular';
import Admintopcharts from './Pages/Admintopcharts';
import './App.css';
import AdminRoute from './Components/AdminRoute';
import ClientRoute from './Components/ClientRoute';
import Trendingtable from './Components/Trendingtable';
import CreateAccount from './Pages/client/CreateAccount';
import ResetLogin from './Pages/client/ResetLogin';
import DetailSignUp from './Pages/client/DetailSignUp';
import BrowseMain from './Pages/client/screens/BrowseMain';
import HomeScreen from './Pages/client/screens/HomeScreen';
import { CloudCircle, DesktopWindowsSharp } from '@material-ui/icons';

import { AuthProvider, AuthContext } from './Contexts/AuthContext';
export const GlobalData = React.createContext();

function App(props) {
   const [artists, setArtists] = useState();
   const [songs, setSongs] = useState();
   const [albums, setAlbums] = useState();
   const [users, setUsers] = useState();
   const [topCharts, setTopCharts] = useState();
   const [bongplaylist, setbongplaylist] = useState();
   const [loggedUser, setLoggedUser] = useState(undefined);
   // const [token, setToken] = useState(
   //    JSON.parse(window.localStorage.getItem('boongToken'))
   // );
   const [data, setData] = useState({
      users: [],
      artists: [],
      songs: [],
      albums: [],
      topCharts: [],
      bongplaylist: [],
   });

   const { token, changeToken } = React.useContext(AuthContext);

   // useEffect(() => {
   //   const topchart = fetchTopCharts();
   //   if (topchart.length <= 0 || topchart === undefined) {
   //     console.log("emptyarray");
   //   } else {
   //     setTopCharts(topchart);
   //     setData({
   //       ...data,
   //       topCharts: topCharts,
   //     });
   //   }
   // }, [topCharts]);
   // useEffect(() => {
   //   const playlist = fetchbongplaylist();
   //   if (playlist.length <= 0 || playlist == undefined) {
   //     console.log("bongplaylist is empty");
   //   } else {
   //     setbongplaylist(bongplaylist);
   //     setData({
   //       ...data,
   //       bongplaylist: bongplaylist,
   //     });
   //   }
   // }, [bongplaylist]);

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

   // setLoggedUser(currentUser);
   // setToken(currentToken);
   // const changedToken = (token) => {
   //    setToken(token);
   // };

   let routes;
   // console.clear();
   console.log('token is ');
   console.log('token', token);
   if (!token || token === 'undefined' || token === []) {
      console.log('NOT TOKEN');
      routes = <Redirect to='/client/login' />;
   } else {
      console.log('TOKEN IS DEFINED');
      routes = (
         <Switch>
            <ClientRoute
               exact
               path={'/client/browse'}
               component={BrowseMain}
            />
            <ClientRoute
               exact
               path={'/client/Home'}
               component={HomeScreen}
            />
            <AdminRoute exact path='/admin' component={AdminHome} />
            <AdminRoute exact path='/admin/users' component={User} />
            <AdminRoute
               exact
               path='/admin/albums'
               component={Albums}
            />
            <AdminRoute
               exact
               path='/admin/artist'
               component={Artist}
            />
            <AdminRoute exact path='/admin/songs' component={Songs} />
            <AdminRoute
               exact
               path='/admin/trending'
               component={Admintrending}
            />
            <AdminRoute
               exact
               path='/admin/popular'
               component={Adminpopular}
            />
            <AdminRoute
               exact
               path='/admin/charts'
               component={Admintopcharts}
            />
         </Switch>
      );
   }

   return (
      <GlobalData.Provider
         value={{
            artists,
            songs,
            albums,
            users,
            bongplaylist,
            topCharts,
            loggedUser,
         }}
      >
         <div className='App'>
            <Router>
               {console.log('token ROUTE', token)}
               {token !== 'undefined' ? (
                  <Switch>
                     {console.log('Inside Login Redirect')}

                     <Redirect to='/client/home' />
                  </Switch>
               ) : (
                  <Switch>
                     {console.log('Inside Login Routes', token)}

                     <Route
                        exact
                        path={[
                           '/client/createAccount',
                           '/client/login',
                        ]}
                        component={CreateAccount}
                     />
                     <Route
                        exact
                        path={[
                           '/client/reset',
                           '/client/verification',
                        ]}
                        component={ResetLogin}
                     />
                     <Route
                        exact
                        path={'/client/detailSignup'}
                        component={DetailSignUp}
                     />
                  </Switch>
               )}

               {routes}
            </Router>
         </div>
      </GlobalData.Provider>
   );
}

export default App;
