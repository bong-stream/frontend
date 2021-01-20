/* eslint-disable no-extend-native */
import { Divider, Grid, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import '../../../assets/BrowseStyle.css';
import { genMediaQuery } from '../../../Styles/constants';
import { GlobalData } from '../../../App';
import { getTrending } from '../../../Pagesactions/songsactions';
import BrowseCarousel from './BrowseCarousel';

const useStyles = makeStyles((theme) => ({
   menuList: {
      fontSize: '1em',
      [genMediaQuery('xs')]: {
         fontSize: '2.5em',
      },
      color: '#AAB3C2',
      [genMediaQuery('xs', 375)]: {
         fontSize: '2.5em',
      },
      '&:hover': {
         color: '#b33458',
         backgroundColor: '#1b3870',
      },
   },
   menuList2: {
      fontSize: '1em',
      [genMediaQuery('xs')]: {
         fontSize: '2.5em',
      },
      [genMediaQuery('xs', 375)]: {
         fontSize: '2.5em',
      },
      color: '#fff',
      '&:hover': {
         //  // color: "#b33458",
         //  backgroundColor: '#b33458',
         //  borderRadius: 20,
         borderBottom: 2,
         borderColor: '#0984e3',
         borderBottomStyle: 'solid',
      },
   },
   Carousel: {
      '& .rec.rec-dot_active': {
         backgroundColor: '#fff',
         boxShadow: 'none',
      },
      '& .guuruq': {
         background: ' #617FAC',
      },
   },
   SecondNav: {
      display: 'flex',
      height: '5%',
      // flexWrap: 'wrap',
      // justifyContent: 'space-around',

      [genMediaQuery('lg', 2440)]: {
         paddingLeft: 'unset',
         overflowX: 'unset',
         maxWidth: 'unset',
         margin: '10px 0',
      },
      [genMediaQuery('xs')]: {
         margin: '20px 0',
         // paddingLeft: 700,
         overflowX: 'scroll',
         maxWidth: 800,
         marginBottom: 20,
         '& li': {
            minWidth: 'fit-content',
         },
      },
   },
}));

const list2 = ['All', 'Trending', 'Popular', 'Albums', 'Featured'];

const origin = window.location.origin;
const Lists = [
   { text: 'New Music', link: '' },
   { text: 'Videos', link: '' },
   { text: 'Podcasts', link: '' },
   { text: 'PlayLists', link: `${origin}/playlist` },
   { text: 'Genure', link: '' },
   { text: 'Category', link: '' },
   { text: 'Artists', link: '' },
   { text: 'Albums', link: '' },
];

// refresh page if experimenting and you already defined Array.prototype.chunk

const BrowseMain = (props) => {
   const data = React.useContext(GlobalData);
   const classes = useStyles();
   const theme = useTheme();
   const [slug, setSlug] = useState('New Music');
   const [list2Item, setList2Item] = useState('All');
   const [allChunks, setAllChunks] = useState([]);
   const [trending, setTrending] = useState();
   const [showArtists, setShowArtists] = useState(false);

   const [isFetching, setIsFetching] = useState(true);

   React.useEffect(() => {
      try {
         Object.defineProperty(Array.prototype, 'chunk', {
            value: function (chunkSize) {
               var R = [];
               for (var i = 0; i < this.length; i += chunkSize)
                  R.push(this.slice(i, i + chunkSize));
               return R;
            },
         });
      } catch (err) {
         console.log('err', err);
         // window.location.reload();
      }
   }, []);

   const [all, setAll] = useState([...data.popular]);

   React.useEffect(() => {
      if (trending && trending.length > 0) {
         console.clear();
         console.log('^^^^^^^^^');
         console.log('^^^^^^^^^');
         console.log('^^^^^^^^^');
         console.log('^^^^^^^^^');
         console.log('trending', trending);
         console.log('all  ', all);
         setAll([...all, ...trending]);
      }
   }, [trending]);

   const fetchTrending = async () => {
      let allSongs;
      allSongs = await getTrending();

      console.log('&&&&&&');
      console.log('&&&&&&');
      console.log('&&&&&&');
      console.log('&&&&&&');
      console.log('&&&&&&');
      console.log(allSongs[0].trending);
      setTrending(allSongs[0].trending);
   };

   React.useEffect(() => {
      fetchTrending();
   }, []);

   React.useEffect(() => {
      // console.clear();
      if (slug.toLowerCase() === 'trending') {
         console.log('data[slug]', data['trending']);
         setAllChunks(trending.chunk(18));
      } else if (slug.toLowerCase() === 'popular') {
         console.log('data[slug]', data['popular']);
         setAllChunks(data['popular'].chunk(18));
      } else if (slug.toLowerCase() === 'all') {
         if (trending && trending.length > 0) {
            setAll([...data['popular'], ...trending]);
         } else {
            setAll(...data['popular']);
         }
      } else if (slug.toLowerCase() === 'artists') {
         setShowArtists(true);
      }

      if (slug.toLowerCase() !== 'artists') {
         setShowArtists(false);
      }
      // console.log(data[slug].chunk(18));
   }, [slug]);

   React.useEffect(() => {
      console.log('<<<<<<<<<<<<');
      console.log('<<<<<<<<<<<<');
      console.log('<<<<<<<<<<<<');
      console.log('<<<<<<<<<<<<');
      console.log('<<<<<<<<<<<<');
      console.log('all', all);
      setAllChunks(all.chunk(18));
   }, [all]);

   React.useEffect(() => {
      if (allChunks && allChunks.length > 0) {
         setIsFetching(false);
      }
   }, [allChunks]);

   React.useEffect(() => {
      console.log('all', all);
      if (trending && trending.length > 0) {
         setAll([...data.popular, ...trending]);
      } else {
         setAll([...data.popular]);
      }
   }, [data.popular]);

   const handleSlug = (e, item) => {
      e.preventDefault();
      setSlug(item);
   };

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            margin: window.screen.width >= 768 ? 'auto' : 10,
            // width: window.screen.width >= 768 ? '85%' : '98%',
         }}
      >
         <Grid
            container
            direction='column'
            justify='center'
            alignItems='stretch'
            style={{
               marginTop: '1%',
               margin: '1% 10%',
               // margin: window.screen.width >= 768 ? "auto" : 0,

               // width: window.screen.width >= 768 ? "85%" : "100%",
            }}
         >
            <Grid item>
               <div className={classes.SecondNav}>
                  {Lists.map((list) => (
                     <MenuItem
                        value={slug}
                        onClick={(e) => handleSlug(e, list.text)}
                        className={classes.menuList}
                        style={{
                           color: slug === list.text && '#fff',
                           borderBottom:
                              slug === list.text &&
                              '1px solid #F44040',
                        }}
                     >
                        {list.text}
                     </MenuItem>
                  ))}
               </div>
               <Divider style={{ color: '#FFF' }} />
               <div
                  style={{
                     display: 'flex',
                     height: '5%',
                     paddingLeft: '2%',
                     paddingTop: '1%',
                     // flexWrap: 'wrap',
                     // justifyContent: 'space-around',
                  }}
               >
                  {list2.map((list) => (
                     <MenuItem
                        value={slug}
                        onClick={(e) => handleSlug(e, list)}
                        className={classes.menuList2}
                        style={{
                           backgroundColor:
                              list2Item === list && '#F44040',
                           borderRadius: list2Item === list && 20,
                        }}
                     >
                        {list}
                     </MenuItem>
                  ))}
               </div>
            </Grid>
            <Grid item style={{ paddingTop: theme.spacing(3) }}>
               <BrowseCarousel
                  isFetching={isFetching}
                  allChunks={allChunks}
                  classes={classes}
                  data={data}
               />
            </Grid>
            <Grid item justify='center'>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignitem: 'center',
                     paddingTop: 20,
                  }}
               ></div>
            </Grid>
         </Grid>
      </div>
   );
};

export default BrowseMain;
