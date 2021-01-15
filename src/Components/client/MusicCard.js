import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { genMediaQuery } from '../../Styles/constants';

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
   },
   media: {
      height: isHomePage ? 190 : 110,

      [genMediaQuery('lg')]: {
         height: isBrowsePage && '201.86px !important',
      },
      [genMediaQuery('md')]: {
         height: isBrowsePage && '133.91px !important',
      },
      [genMediaQuery('sm')]: {
         height: isBrowsePage && '146.16px !important',
      },
      [genMediaQuery('xs')]: {
         height: isBrowsePage && '302.69px !important',
      },

      objectFit: 'contain',
      minHeight: isHomePage && '250px !important',
   },
   title: {
      color: '#fff',
      fontSize: '0.8rem',
      paddingLeft: 10,
   },
});

const MusicCard = (props) => {
   console.log('object', props.title, props.imgPath);
   const classes = useStyles();

   return (
      <>
         <Card className={classes.root}>
            <CardActionArea>
               <CardMedia
                  className={classes.media}
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
         <Typography
            variant='body2'
            className={classes.title}
            component='p'
            style={{
               color: '#AAB3C2',
            }}
         >
            {props.label}
         </Typography>
      </>
   );
};

export default MusicCard;
