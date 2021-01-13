import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MusicCard from "./MusicCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Grid } from "@material-ui/core";

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(4),
  },
  img: {
    height: 110,
    overflow: "hidden",
    display: "block",
    objectFit: "contain",
  },
}));

const MusicStepper = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <div square elevation={0} className={classes.header}>
        <Typography style={{ color: "#fff", paddingBottom: 10 }}>
          Recent Play
        </Typography>
      </div>

      <Grid
        container
        justify="center"
        direction="row"
        alignItems="stretch"
        style={{ width: "100%" }}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <Grid key={value} item spacing={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: theme.spacing(3),
              }}
            >
              {[tutorialSteps].map((val) => (
                <img
                  className={classes.img}
                  src={tutorialSteps[activeStep].imgPath}
                  alt={tutorialSteps[activeStep].label}
                />
                // <MusicCard />
              ))}
            </div>
          </Grid>
        ))}
      </Grid>
      <MobileStepper
        steps={maxSteps}
        position="static"
        // variant="text"
        activeStep={activeStep}
        nextButton={
          <NavigateNextIcon
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </NavigateNextIcon>
        }
        backButton={
          <NavigateBeforeIcon
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </NavigateBeforeIcon>
        }
      />
    </div>
  );
};
export default MusicStepper;
