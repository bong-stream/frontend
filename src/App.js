import React, { useState, useEffect } from 'react';
import { getArtists } from './Pagesactions/artistsactions';
import {
   getSongs,
   getBongPlaylist,
   fetchTopCharts,
   getTrending,
   getPopular,
   getTopcharts,
} from './Pagesactions/songsactions';

import { getUsers } from './Pagesactions/usersactions';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHome from './Pages/AdminHome';
import User from './Pages/User';
import Artist from './Pages/Artist';
import Songs from './Pages/Songs';
import Albums from './Pages/Albums';
import Admintrending from './Pages/Admintrending';
import Adminpopular from './Pages/Adminpopular';
import Admintopcharts from './Pages/Admintopcharts';
import './App.css';
import AdminRoute from './Components/AdminRoute';
import ClientRoute from './Components/ClientRoute';
import CreateAccount from './Pages/client/CreateAccount';
import ResetLogin from './Pages/client/ResetLogin';
import DetailSignUp from './Pages/client/DetailSignUp';
import BrowseMain from './Pages/client/screens/BrowseMain';
import HomeScreen from './Pages/client/screens/HomeScreen';

import { AuthContext } from './Contexts/AuthContext';
import { getAlbums } from './Pagesactions/albumactions';
import {
   getRecentPlay,
   getRecomended,
} from './Pagesactions/HomeActions';
import Playlist from './Pages/client/screens/Playlist';
export const GlobalData = React.createContext();

export const App = () => {
   const [artists, setArtists] = useState();
   const [songs, setSongs] = useState();
   const [albums, setAlbums] = useState();
   const [users, setUsers] = useState();
   const [trending, setTrending] = useState();
   const [topCharts, setTopCharts] = useState();
   const [bongplaylist, setbongplaylist] = useState();
   const [popular, setPopular] = useState();
   const [recentPlay, setRecentPlay] = useState();
   const [recommended, setRecommended] = useState();
   const [loggedUser] = useState(undefined);
   const [playlist, setPlaylist] = useState([]);

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

      trending: [],
      recommended: [],
      playlist: [],
      popular: [],
   });

   const { token } = React.useContext(AuthContext);

   // ~ Sync Songs,Albums,Top Charts .... with data
   // ~ 1 Songs
   useEffect(() => {
      setData({
         ...data,
         songs: songs,
      });
   }, [songs]);

   // ~ 2 Albums
   useEffect(() => {
      setData({
         ...data,
         albums: albums,
      });
   }, [albums]);

   // ~ 3 Top Charts
   useEffect(() => {
      setData({
         ...data,
         topCharts: topCharts,
      });
   }, [topCharts]);

   // ~ 4 BongPlaylist
   useEffect(() => {
      setData({
         ...data,
         bongplaylist: bongplaylist,
      });
   }, [bongplaylist]);

   // ~ 5 Artists
   useEffect(() => {
      setData({
         ...data,
         artists: artists,
      });
   }, [artists]);

   // ~ 6 Trending
   useEffect(() => {
      // console.clear();

      setData({
         ...data,
         trending: trending,
      });

      console.log('data.trending', data.trending);
   }, [trending]);

   // ~ 7 Recommended
   useEffect(() => {
      setData({
         ...data,
         recommended: recommended,
      });
   }, [recommended]);

   // ~ 8 Recent Play / Playlist
   useEffect(() => {
      setData({
         ...data,
         playlist: playlist,
      });
   }, [trending]);

   useEffect(() => {
      // console.clear();
      console.log('********');
      console.log('********');
      console.log('********');
      console.log('********');
      console.log('trending', trending);
      console.log('data.trending', data.trending);
   }, [data]);

   // ~ 9 Popular
   useEffect(() => {
      setData({
         ...data,
         popular: popular,
      });
   }, [popular]);

   // ~ 10 Users
   useEffect(() => {
      setData({
         ...data,
         users: users,
      });
   }, [users]);

   // ~ 10 Users
   useEffect(() => {
      // console.clear();
      console.log('data', data);
   }, [data]);

   // // ~ 6 Trending
   // useEffect(() => {
   //    setData({
   //       ...data,
   //       trending: trending,
   //    });
   // }, [trending]);

   // * 1 Fetch Top Charts
   useEffect(() => {
      const topchart = getTopcharts();
      if (topchart.length <= 0 || topchart === undefined) {
         console.log('emptyarray');
      } else {
         setTopCharts(topchart);
      }
   }, []);

   // * 2 Fetch BongPlaylist
   useEffect(() => {
      fetchbongplaylist();
   }, []);

   // * 3 Fetch Songs
   useEffect(() => {
      fetchSongs();
   }, []);

   // * 4 Fetch Artists
   useEffect(() => {
      fetchArtists();
   }, []);

   // * 5 Fetch Users
   useEffect(() => {
      fetchUsers();
   }, []);

   // * 6 Fetch Albums
   useEffect(() => {
      fetchAlbums();
   }, []);

   // * 7 Fetch Trending
   useEffect(() => {
      fetchTrending();
   }, []);

   // * 8 Fetch Recommended
   useEffect(() => {
      fetchRecommended();
   }, []);

   // * 9 Fetch Popular
   useEffect(() => {
      fetchPopular();
   }, []);

   // * 10 Fetch Recent Play
   useEffect(() => {
      fetchRecentPlay();
   }, []);

   const fetchRecentPlay = async () => {
      let recentPlay;
      recentPlay = await getRecentPlay();
      console.log(recentPlay);
      if (recentPlay.length > 0) {
         console.log('recent');
         setPlaylist(recentPlay[0].bongplaylist);
      }
   };

   const fetchTrending = async () => {
      let allSongs;
      allSongs = await getTrending();

      console.log(allSongs);
      setTrending(allSongs[0].trending);
   };

   const fetchPopular = async () => {
      let popular;
      popular = await getPopular();
      // console.log(popular);
      console.log('PAPULAR', popular[0].popular);
      setPopular(popular[0].popular);
      console.log('PAPLAR', popular);
   };

   const fetchRecommended = async () => {
      let allSongs;
      allSongs = await getRecomended();
      console.log(allSongs);
      setRecommended(allSongs);
   };

   const fetchbongplaylist = async () => {
      let allSongs;
      allSongs = await getBongPlaylist();
      console.log(allSongs);
      setbongplaylist(allSongs);
   };

   const fetchSongs = async () => {
      let allSongs;
      allSongs = await getSongs();
      console.log('allSongs', allSongs);
      console.log('data.songs', data.songs);

      setSongs(allSongs);

      console.log('data.songs', data.songs);
   };

   const fetchAlbums = async () => {
      let allSongs;
      allSongs = await getAlbums();
      console.log(allSongs);
      setAlbums(allSongs);
   };

   const fetchArtists = async () => {
      let allArtists;
      allArtists = await getArtists();
      console.log(allArtists);
      setArtists(allArtists);
   };

   const fetchUsers = async () => {
      let allUsers;
      allUsers = await getUsers();
      console.log(allUsers);
      setUsers(allUsers);
   };

   // fetchUsers();

   // fetchArtists();
   // // fetchAlbums();
   // fetchSongs();

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
               path={'/client/playist'}
               component={Playlist}
            />
            <ClientRoute
               exact
               path={'/client/Home'}
               component={HomeScreen}
            />
            <AdminRoute exact path='/=' component={AdminHome} />
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
      <GlobalData.Provider value={data}>
         <div className='App'>
            <Router>
               {console.log('token ROUTE', token)}
               {token !== 'undefined' ? (
                  <Switch>
                     {console.log('Inside Login Redirect')}

                     {routes}
                     {/* <Redirect to='/client/home' /> */}
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

                     <Route component={CreateAccount} />
                  </Switch>
               )}

               {/* {routes} */}
            </Router>
         </div>
      </GlobalData.Provider>
   );
};
