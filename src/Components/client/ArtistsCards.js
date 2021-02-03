import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { genMediaQuery } from '../../Styles/constants';
import { Button } from 'react-bootstrap';

const isHomePage = window.location.href.includes('home')
   ? true
   : false;
const isBrowsePage = window.location.href.includes('browse')
   ? true
   : false;

const useStyles = makeStyles({
   root: {
      // maxWidth: 250,
      width:
         isHomePage || window.location.href.includes('browse')
            ? '100%'
            : 120,
      marginBottom: 20,
      [genMediaQuery('xs')]: {
         marginBottom: 30,
      },
   },
   media: {
      height: 130,
      width: 130,

      // [genMediaQuery('lg')]: {
      //    height: isBrowsePage && '201.86px !important',
      // },
      margin: 'auto',
      [genMediaQuery('md')]: {
         height: 130,
         width: 130,
      },
      [genMediaQuery('sm')]: {
         height: 170,
         width: 170,
      },
      [genMediaQuery('xs')]: {
         height: 300,
         width: 300,
      },

      borderRadius: (props) =>
         props.isArtist && props.isArtist === true && '50%',

      objectFit: 'contain',
      minHeight: isHomePage && '250px !important',
   },
   title: {
      color: '#fff',
      paddingLeft: 10,
      fontSize: '1em',
      [genMediaQuery('xs')]: {
         fontSize: '2.5em',
      },
      // [genMediaQuery('xs', 375)]: {
      //    // fontSize: '2.3em',
      // },
   },
   followBtn: {
      color: '#fff',
      backgroundColor: '#F44040',
      /* border-radius: 38'%', */
      width: 100,
      borderRadius: 20,
      [genMediaQuery('xs')]: {
         fontSize: '2em',
         width: '200px',
      },
   },
});

const ArtistsCard = (props) => {
   console.log('object', props.title, props.imgPath);
   const { isArtist } = props;
   const classes = useStyles();

   return (
      <>
         <Card
            className={classes.root}
            style={{
               boxShadow: isArtist && isArtist === true && 'none',
               borderRadius: isArtist && isArtist === true && '0',
               backgroundColor:
                  isArtist && isArtist === true && '#1b3863',
            }}
         >
            <CardActionArea
               style={{
                  backgroundColor: '#132d52',
               }}
            >
               <CardMedia
                  className={classes.media}
                  style={{
                     borderRadius:
                        isArtist && isArtist === true && '50%',
                  }}
                  image={props.imgPath}
               />
            </CardActionArea>
         </Card>
         <Typography
            gutterBottom
            variant='h6'
            className={classes.title}
            style={{ marginTop: 20 }}
         >
            {props.title}
         </Typography>
         {isArtist && isArtist === true && (
            <Button variant='contained' className={classes.followBtn}>
               Follow
            </Button>
         )}
      </>
   );
};

export default ArtistsCard;
