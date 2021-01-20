import MusicCard from '../../../Components/client/MusicCard';
import Carousel from 'react-elastic-carousel';
import ArtistsCard from '../../../Components/client/ArtistsCards';
import { Grid } from '@material-ui/core';

const BrowseCarousel = (props) => {
   const {
      isFetching,
      classes,
      showArtists,
      data,
      allChunks,
   } = props;
   return (
      <>
         {isFetching ? (
            <div className='loader'></div>
         ) : (
            <Carousel
               itemsToShow={1}
               itemsToScroll={1}
               showArrows={false}
               className={classes.Carousel}
               // itemsToShow={window.screen.width >= 768 ? 6 : 2}
               // itemsToScroll={window.screen.width >= 768 ? 6 : 2}
            >
               {showArtists === true ? (
                  <Grid container justify='flex-start' spacing={2}>
                     {data.artists &&
                        data.artists.length > 0 &&
                        data.artists.map((artist) => (
                           <Grid
                              key={artist._id}
                              item
                              xs={6}
                              sm={3}
                              md={2}
                           >
                              <ArtistsCard
                                 imgPath={artist.artistimage}
                                 title={artist.artistname}
                                 label={artist.label}
                                 isArtist={true}
                              />
                           </Grid>
                        ))}
                  </Grid>
               ) : (
                  allChunks &&
                  allChunks.length > 0 &&
                  allChunks.map((item) => (
                     <div
                        style={{
                           display: 'block',
                           // paddingLeft: theme.spacing(3),
                           // flexWrap: "nowrap",
                           flexDirection: 'row',
                           zIndex: 1,
                           width: '100%',
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
                                    isArtist={false}
                                 />
                              </Grid>
                           ))}
                        </Grid>
                     </div>
                  ))
               )}
            </Carousel>
         )}
      </>
   );
};

export default BrowseCarousel;
