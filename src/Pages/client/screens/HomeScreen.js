import {
   Button,
   Divider,
   Grid,
   Link,
   makeStyles,
   Typography,
   useTheme,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';

import song from '../../../assets/song.jpg';
import MusicCard from '../../../Components/client/MusicCard';
import SimpleStripCard from '../../../Components/client/SimpleStripCard';
import Carousel from 'react-elastic-carousel';
import '../../../assets/CrouselStyle.css';
import appstore from '../../../assets/appstore.png';

import playstore from '../../../assets/goo.png';
import { GlobalData } from '../../../App';

const breakPoints = [
   { width: 346, itemsToShow: 2, itemsToScroll: 2 },
   { width: 532, itemsToShow: 4, itemsToScroll: 4 },
   { width: 750, itemsToShow: 5, itemToScroll: 5 },
   { width: 1200, itemsToShow: 8, itemToScroll: 8 },
   // { width: 1200, itemsToShow: 4 },
];

const useStyles = makeStyles((theme) => ({
   rootGrid: {
      backgroundColor: '#ffffff',
      padding: theme.spacing(2),
      width: '100%',
   },
   footerImg: {
      width: 150,
      height: 40,
      paddingLeft: 3,
      paddingTop: 6,
      objectFit: 'conatin',
   },
}));
function HomeScreen() {
   const classes = useStyles();
   const theme = useTheme();
   const data = useContext(GlobalData);

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
            }}
         >
            <Grid item style={{ paddingTop: theme.spacing(2) }}>
               <Grid container justify='center' spacing={2}>
                  {[0, 1].map((value) => (
                     <Grid
                        key={value}
                        item
                        style={{
                           width: '50%',
                           textAlign: 'left',
                        }}
                     >
                        <MusicCard
                           title='Pakistani Song'
                           label='newSong'
                           imgPath={song}
                        />
                     </Grid>
                  ))}
               </Grid>
            </Grid>
            {/* {data.bongplaylist && data.bongplaylist.active === true && (
               <Grid item>
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'space-Between',
                     }}
                  >
                     <Typography
                        style={{
                           color: '#fff',
                           paddingLeft:
                              window.screen.width >= 768
                                 ? theme.spacing(12)
                                 : theme.spacing(8),
                           paddingBottom: theme.spacing(2),
                           paddingTop: theme.spacing(1),
                        }}
                     >
                        Recent Play
                     </Typography>
                     <Button
                        style={{
                           marginBottom: theme.spacing(2),
                           color: '#fff',
                           marginLeft: 3,

                           width: 104,
                           height: 40,
                           backgroundColor: '#1B3863',
                           borderRadius: 38,
                        }}
                     >
                        View All
                     </Button>
                  </div>
                  <div className={classes.crousel}>
                     <Carousel
                        breakPoints={breakPoints}
                        // itemsToShow={5}
                        // itemsToScroll={5}
                     >
                        {data.bongplaylist.bongplaylist &&
                           data.bongplaylist.bongplaylist.length >
                              0 &&
                           data.bongplaylist.bongplaylist.map(
                              (item) => (
                                 <div
                                    style={{
                                       display: 'block',
                                       paddingLeft: theme.spacing(3),
                                       flexDirection: 'row',
                                       zIndex: 1,
                                    }}
                                 >
                                    <SimpleStripCard
                                       key={item._id}
                                       imgPath={item.songimage}
                                       title={item.songname}
                                       // label={item.label}
                                       // name={item.name}
                                    />
                                 </div>
                              )
                           )}
                     </Carousel>
                  </div>
               </Grid>
            )} */}
            {data.topCharts && data.topCharts.active === true && (
               <Grid item>
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: theme.spacing(3),
                     }}
                  >
                     <Typography
                        style={{
                           color: '#fff',
                           paddingLeft:
                              window.screen.width >= 768
                                 ? theme.spacing(12)
                                 : theme.spacing(8),
                           paddingBottom: theme.spacing(1),
                           paddingTop: theme.spacing(1),
                        }}
                     >
                        Top Chart
                     </Typography>
                     <Button
                        variant='outlined'
                        style={{
                           marginBottom: theme.spacing(2),
                           color: '#fff',
                           width: 104,
                           height: 40,
                           backgroundColor: '#1B3863',
                           borderRadius: 38,
                           marginLeft: 3,
                        }}
                     >
                        View All
                     </Button>
                  </div>
                  <div className={classes.crousel}>
                     <Carousel
                        breakPoints={breakPoints}
                        // itemsToShow={5}
                        // itemsToScroll={5}
                     >
                        {data.topCharts &&
                           data.topCharts.length > 0 &&
                           data.topCharts.map((item) => (
                              <div
                                 style={{
                                    display: 'block',
                                    paddingLeft: theme.spacing(3),
                                    // flexWrap: "nowrap",
                                    flexDirection: 'row',
                                    zIndex: 1,
                                 }}
                              >
                                 <SimpleStripCard
                                    key={item._id}
                                    imgPath={item.songimage}
                                    title={item.songname}
                                    // label={item.label}
                                 />
                              </div>
                           ))}
                     </Carousel>
                  </div>
               </Grid>
            )}
            <Grid item>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     paddingTop: theme.spacing(3),
                  }}
               >
                  <Typography
                     style={{
                        color: '#fff',
                        paddingLeft:
                           window.screen.width >= 768
                              ? theme.spacing(12)
                              : theme.spacing(8),
                        paddingBottom: theme.spacing(1),
                        paddingTop: theme.spacing(1),
                     }}
                  >
                     Recommended
                  </Typography>
                  <Button
                     variant='outlined'
                     style={{
                        marginBottom: theme.spacing(2),
                        color: '#fff',
                        width: 104,
                        height: 40,
                        backgroundColor: '#1B3863',
                        borderRadius: 38,
                        marginLeft: 3,
                     }}
                  >
                     View All
                  </Button>
               </div>
               <div className={classes.crousel}>
                  <Carousel
                     breakPoints={breakPoints}
                     // itemsToShow={5}
                     // itemsToScroll={5}
                  >
                     {data.recommended &&
                        data.recommended.active === true &&
                        data.recommended.recommended.map((item) => (
                           <div
                              style={{
                                 display: 'block',
                                 paddingLeft: theme.spacing(3),
                                 // flexWrap: "nowrap",
                                 flexDirection: 'row',
                                 zIndex: 1,
                              }}
                           >
                              <SimpleStripCard
                                 key={item._id}
                                 imgPath={item.songimage}
                                 title={item.songname}
                                 // label={item.label}
                              />
                           </div>
                        ))}
                  </Carousel>
               </div>
            </Grid>
            <Grid item>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     paddingTop: theme.spacing(3),
                  }}
               >
                  <Typography
                     style={{
                        color: '#fff',
                        paddingLeft:
                           window.screen.width >= 768
                              ? theme.spacing(12)
                              : theme.spacing(8),
                        paddingBottom: theme.spacing(1),
                        paddingTop: theme.spacing(1),
                     }}
                  >
                     Popular Songs
                  </Typography>
                  <Button
                     variant='outlined'
                     style={{
                        marginBottom: theme.spacing(2),
                        color: '#fff',
                        width: 104,
                        height: 40,
                        backgroundColor: '#1B3863',
                        borderRadius: 38,
                        marginLeft: 3,
                     }}
                  >
                     View All
                  </Button>
               </div>
               <div className={classes.crousel}>
                  <Carousel
                     breakPoints={breakPoints}
                     // itemsToShow={5}
                     // itemsToScroll={5}
                  >
                     {data.popular &&
                        data.popular.map((item) => (
                           <div
                              style={{
                                 display: 'block',
                                 paddingLeft: theme.spacing(3),
                                 // flexWrap: "nowrap",
                                 flexDirection: 'row',
                                 zIndex: 1,
                              }}
                           >
                              <SimpleStripCard
                                 key={item._id}
                                 imgPath={item.songimage}
                                 title={item.songname}
                                 // label={item.label}
                              />
                           </div>
                        ))}
                  </Carousel>
               </div>
            </Grid>
            <Grid item>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     paddingTop: theme.spacing(3),
                  }}
               >
                  <Typography
                     style={{
                        color: '#fff',
                        paddingLeft:
                           window.screen.width >= 768
                              ? theme.spacing(12)
                              : theme.spacing(8),
                        paddingBottom: theme.spacing(1),
                        paddingTop: theme.spacing(1),
                     }}
                  >
                     Songs
                  </Typography>
                  <Button
                     variant='outlined'
                     style={{
                        marginBottom: theme.spacing(2),
                        color: '#fff',
                        width: 104,
                        height: 40,
                        backgroundColor: '#1B3863',
                        borderRadius: 38,
                        marginLeft: 3,
                     }}
                  >
                     View All
                  </Button>
               </div>
               <div className={classes.crousel}>
                  <Carousel
                     breakPoints={breakPoints}
                     // itemsToShow={5}
                     // itemsToScroll={5}
                  >
                     {data.songs &&
                        data.songs.map((item) => (
                           <div
                              style={{
                                 display: 'block',
                                 paddingLeft: theme.spacing(3),
                                 // flexWrap: "nowrap",
                                 flexDirection: 'row',
                                 zIndex: 1,
                              }}
                           >
                              <SimpleStripCard
                                 key={item._id}
                                 imgPath={item.songimage}
                                 title={item.songname}
                                 // label={item.label}
                              />
                           </div>
                        ))}
                  </Carousel>
               </div>
            </Grid>

            <Grid item>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     paddingTop: theme.spacing(3),
                  }}
               >
                  <Typography
                     style={{
                        color: '#fff',
                        paddingLeft:
                           window.screen.width >= 768
                              ? theme.spacing(12)
                              : theme.spacing(8),
                        paddingBottom: theme.spacing(1),
                        paddingTop: theme.spacing(1),
                     }}
                  >
                     Albums
                  </Typography>
                  <Button
                     variant='outlined'
                     style={{
                        marginBottom: theme.spacing(2),
                        color: '#fff',
                        width: 104,
                        height: 40,
                        backgroundColor: '#1B3863',
                        borderRadius: 38,
                        marginLeft: 3,
                     }}
                  >
                     View All
                  </Button>
               </div>
               <div className={classes.crousel}>
                  <Carousel
                     breakPoints={breakPoints}
                     // itemsToShow={5}
                     // itemsToScroll={5}
                  >
                     {data.albums &&
                        data.albums.map((item) => (
                           <div
                              style={{
                                 display: 'block',
                                 paddingLeft: theme.spacing(3),
                                 // flexWrap: "nowrap",
                                 flexDirection: 'row',
                                 zIndex: 1,
                              }}
                           >
                              <SimpleStripCard
                                 key={item._id}
                                 imgPath={item.albumimage}
                                 title={item.albumname}
                                 // label={item.label}
                              />
                           </div>
                        ))}
                  </Carousel>
               </div>
            </Grid>
            <Grid item>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     paddingTop: theme.spacing(3),
                  }}
               >
                  <Typography
                     style={{
                        color: '#fff',
                        paddingLeft:
                           window.screen.width >= 768
                              ? theme.spacing(12)
                              : theme.spacing(8),
                        paddingBottom: theme.spacing(1),
                        paddingTop: theme.spacing(1),
                     }}
                  >
                     Bong Playlist
                  </Typography>
                  <Button
                     variant='outlined'
                     style={{
                        marginBottom: theme.spacing(2),
                        color: '#fff',
                        width: 104,
                        height: 40,
                        backgroundColor: '#1B3863',
                        borderRadius: 38,
                        marginLeft: 3,
                     }}
                  >
                     View All
                  </Button>
               </div>
               <div className={classes.crousel}>
                  <Carousel
                     breakPoints={breakPoints}
                     // itemsToShow={5}
                     // itemsToScroll={5}
                  >
                     {data.bongplaylist.active === true &&
                        data.bongplaylist.bongplaylist &&
                        data.bongplaylist.bongplaylist.map((item) => (
                           <div
                              style={{
                                 display: 'block',
                                 paddingLeft: theme.spacing(3),
                                 // flexWrap: "nowrap",
                                 flexDirection: 'row',
                                 zIndex: 1,
                              }}
                           >
                              <SimpleStripCard
                                 key={item._id}
                                 imgPath={item.songimage}
                                 title={item.songname}
                                 // label={item.label}
                              />
                           </div>
                        ))}
                  </Carousel>
               </div>
            </Grid>
            <Grid item>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     paddingTop: theme.spacing(3),
                  }}
               >
                  <Typography
                     style={{
                        color: '#fff',
                        paddingLeft:
                           window.screen.width >= 768
                              ? theme.spacing(12)
                              : theme.spacing(8),
                        paddingBottom: theme.spacing(1),
                        paddingTop: theme.spacing(1),
                     }}
                  >
                     Artists
                  </Typography>
                  <Button
                     variant='outlined'
                     style={{
                        marginBottom: theme.spacing(2),
                        color: '#fff',
                        width: 104,
                        height: 40,
                        backgroundColor: '#1B3863',
                        borderRadius: 38,
                        marginLeft: 3,
                     }}
                  >
                     View All
                  </Button>
               </div>
               <div className={classes.crousel}>
                  <Carousel
                     breakPoints={breakPoints}
                     // itemsToShow={5}
                     // itemsToScroll={5}
                  >
                     {data.artists &&
                        data.artists.map((item) => (
                           <div
                              style={{
                                 display: 'block',
                                 paddingLeft: theme.spacing(3),
                                 // flexWrap: "nowrap",
                                 flexDirection: 'row',
                                 zIndex: 1,
                              }}
                           >
                              <SimpleStripCard
                                 key={item._id}
                                 imgPath={item.artistimage}
                                 title={item.artistname}
                                 // label={item.label}
                              />
                           </div>
                        ))}
                  </Carousel>
               </div>
            </Grid>
            <Divider
               style={{
                  color: '#7e93cf',
                  // paddingTop: theme.spacing(1),
                  marginTop: theme.spacing(3),
                  width: '96%',
               }}
            />
            <Grid item style={{ paddingTop: theme.spacing(6) }}>
               <Grid container direction='row' justify='space-evenly'>
                  <Grid item>
                     <Grid
                        container
                        direction='column'
                        justify='center'
                     >
                        <Grid item sm={4} md={4} xs={12} lg={4}>
                           <Link
                              href='#'
                              onClick={(e) => e.preventDefault()}
                           >
                              <Typography
                                 variant='body1'
                                 style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    paddingTop: 10,
                                 }}
                              >
                                 {' '}
                                 Company
                              </Typography>
                           </Link>
                        </Grid>
                        <Grid item sm={4} md={4} xs={12} lg={4}>
                           <Link
                              href='#'
                              onClick={(e) => e.preventDefault()}
                           >
                              <Typography
                                 variant='body1'
                                 style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    paddingTop: 10,
                                 }}
                              >
                                 {' '}
                                 About
                              </Typography>
                           </Link>
                        </Grid>
                        <Grid item sm={4} md={4} xs={12} lg={4}>
                           <Link
                              href='#'
                              onClick={(e) => e.preventDefault()}
                           >
                              <Typography
                                 variant='body1'
                                 style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    paddingTop: 10,
                                 }}
                              >
                                 {' '}
                                 Job
                              </Typography>
                           </Link>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item>
                     <Grid container direction='column'>
                        <Grid item xs={12}>
                           <Link
                              href='#'
                              onClick={(e) => e.preventDefault()}
                           >
                              <Typography
                                 variant='body1'
                                 style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    paddingTop: 10,
                                 }}
                              >
                                 {' '}
                                 Useful Links
                              </Typography>
                           </Link>
                        </Grid>
                        <Grid item xs={12}>
                           <Link
                              href='#'
                              onClick={(e) => e.preventDefault()}
                           >
                              <Typography
                                 variant='body1'
                                 style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    paddingTop: 10,
                                 }}
                              >
                                 {' '}
                                 Support
                              </Typography>
                           </Link>
                        </Grid>
                        <Grid item xs={12}>
                           <Link
                              href='#'
                              onClick={(e) => e.preventDefault()}
                           >
                              <Typography
                                 variant='body1'
                                 style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    paddingTop: 10,
                                 }}
                              >
                                 {' '}
                                 Terms & Conditions
                              </Typography>
                           </Link>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item>
                     <Grid
                        container
                        direction='column'
                        justify='space-around'
                     >
                        <Grid item xs={12}>
                           <Link
                              href='#'
                              onClick={(e) => e.preventDefault()}
                           >
                              <Typography
                                 variant='body1'
                                 style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    paddingTop: 10,
                                    fontSize: '1.4rem',
                                 }}
                              >
                                 {' '}
                                 Download the BONG App!
                              </Typography>
                           </Link>
                        </Grid>
                        <Grid item sm={4} md={4} xs={12} lg={4}>
                           <div style={{ display: 'flex' }}>
                              <img
                                 src={playstore}
                                 alt='google play store'
                                 className={classes.footerImg}
                              />

                              <img
                                 src={appstore}
                                 alt='google play store'
                                 className={classes.footerImg}
                              />
                           </div>
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
            <Divider
               style={{
                  color: '#7e93cf',
                  // paddingTop: theme.spacing(1),
                  marginTop: theme.spacing(6),
                  width: '96%',
               }}
            />
            <Grid item>
               <Typography
                  style={{
                     color: 'white',
                     fontSize: '0.6rem',
                     textDecoration: 'none',
                     padding: theme.spacing(3),
                  }}
               >
                  2020 | All Rights Reserved || developed by Team Bong
               </Typography>
            </Grid>
         </Grid>
      </div>
   );
}

export default HomeScreen;
