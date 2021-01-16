/* eslint-disable no-extend-native */
import { Divider, Grid, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MusicCard from '../../../Components/client/MusicCard';
import Carousel from 'react-elastic-carousel';
import '../../../assets/BrowseStyle.css';
import { genMediaQuery } from '../../../Styles/constants';
import { GlobalData } from '../../../App';
import { getTrending } from '../../../Pagesactions/songsactions';

const tutorialSteps = [
   {
      title: 'hamara parcham',
      label: 'San Francisco ',
      imgPath:
         'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'a jaaa pardesi',
      label: 'Bird',
      imgPath:
         'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'hamara parcham',
      label: 'Bali, Indonesia',
      imgPath:
         'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
   },
   {
      title: 'a jaaa pardesi',
      label: 'NeONBRAND ',
      imgPath:
         'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'a jaaa pardesi',
      label: 'Goč, Serbia',
      imgPath:
         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'a jaaa pardesi',
      label: 'Goč, Serbia',
      imgPath:
         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'a jaaa pardesi',
      label: 'Goč, Serbia',
      imgPath:
         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'a jaaa pardesi',
      label: 'Goč, Serbia',
      imgPath:
         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'a jaaa pardesi',
      label: 'Goč, Serbia',
      imgPath:
         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
   },
   {
      title: 'a jaaa pardesi',
      label: 'Goč, Serbia',
      imgPath:
         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
   },
];

const useStyles = makeStyles((theme) => ({
   menuList: {
      fontSize: '1.2em',
      [genMediaQuery('xs')]: {
         fontSize: '2.5em',
      },
      color: '#fff',
      [genMediaQuery('xs', 375)]: {
         fontSize: '2.5em',
      },
      '&:hover': {
         color: '#b33458',
         backgroundColor: '#1b3870',
         borderRadius: 20,
      },
   },
   menuList2: {
      fontSize: '1.2em',
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
   SecondNav: {
      display: 'flex',
      height: '5%',
      // flexWrap: 'wrap',
      justifyContent: 'space-around',

      [genMediaQuery('lg', 2440)]: {
         paddingLeft: 'unset',
         overflowX: 'unset',
         maxWidth: 'unset',
      },
      [genMediaQuery('xs')]: {
         paddingLeft: 700,
         overflowX: 'scroll',
         maxWidth: 800,
         '& li': {
            minWidth: 'fit-content',
         },
      },
   },
}));
const card = [1, 2, 3, 4, 5, 6, 7];
const list2 = ['All', 'Trending', 'Popular', 'Albums', 'Featured'];
const Lists = [
   'New Music',
   'Videos',
   'Podcasts',
   'PlayLists',
   'Genure',
   'Category',
   'Artists',
   'Albums',
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
         console.log('data[slug]', data['popular']);
         setAllChunks(data['popular'].chunk(18));
         let trendingChunks = [];
         if (trending && trending.length > 0) {
            trendingChunks = trending.chunk(18);
         }
         const allChunksNew = all.chunk(18);
         setAllChunks([...allChunksNew, ...trendingChunks]);
      } else if (slug.toLowerCase() === 'albums') {
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
      setAll([...data.popular]);
      if (trending && trending.length > 0) {
         setAll([...all, ...trending]);
      }
   }, [data]);

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
            width: window.screen.width >= 768 ? '85%' : '98%',
         }}
      >
         <Grid
            container
            direction='column'
            justify='center'
            alignItems='stretch'
            style={{
               marginTop: '1%',
               // margin: window.screen.width >= 768 ? "auto" : 0,

               // width: window.screen.width >= 768 ? "85%" : "100%",
            }}
         >
            <Grid item>
               <div className={classes.SecondNav}>
                  {Lists.map((list) => (
                     <MenuItem
                        value={slug}
                        onClick={(e) => handleSlug(e, list)}
                        className={classes.menuList}
                     >
                        {list}
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
                     justifyContent: 'space-around',
                  }}
               >
                  {list2.map((list) => (
                     <MenuItem
                        value={slug}
                        onClick={(e) => handleSlug(e, list)}
                        className={classes.menuList2}
                        style={{
                           backgroundColor:
                              list2Item === list && '#b33458',
                           borderRadius: list2Item === list && 20,
                        }}
                     >
                        {list}
                     </MenuItem>
                  ))}
               </div>
            </Grid>
            <Grid item style={{ paddingTop: theme.spacing(3) }}>
               {isFetching ? (
                  <div className='loader'></div>
               ) : (
                  <Carousel
                     itemsToShow={1}
                     itemsToScroll={1}
                     showArrows={false}
                     // itemsToShow={window.screen.width >= 768 ? 6 : 2}
                     // itemsToScroll={window.screen.width >= 768 ? 6 : 2}
                  >
                     {allChunks &&
                        allChunks.length > 0 &&
                        allChunks.map((item) => (
                           <div
                              style={{
                                 display: 'block',
                                 // paddingLeft: theme.spacing(3),
                                 // flexWrap: "nowrap",
                                 flexDirection: 'row',
                                 zIndex: 1,
                              }}
                           >
                              <Grid
                                 container
                                 justify='flex-start'
                                 spacing={2}
                              >
                                 {item.map((value) => (
                                    <Grid
                                       key={value}
                                       item
                                       xs={6}
                                       sm={3}
                                       md={2}
                                    >
                                       <MusicCard
                                          imgPath={value.songimage}
                                          title={value.songname}
                                          label={value.label}
                                       />
                                    </Grid>
                                 ))}
                              </Grid>
                           </div>
                        ))}
                  </Carousel>
               )}
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
