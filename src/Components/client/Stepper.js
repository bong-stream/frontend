import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
const useStyles = makeStyles({
  root: {
    width: 200,
    color: "#fff",
    backgroundColor: "#1b3863",
  },
});

const Stepper = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep >= 2) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep <= 0) {
      setActiveStep(2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <NavigateNextIcon
          size="small"
          variant={"outlined"}
          onClick={handleNext}
          disabled={activeStep === 5}
          style={{ color: "#fff" }}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft style={{ color: "#fff" }} />
          ) : (
            <KeyboardArrowRight style={{ color: "#fff" }} />
          )}
        </NavigateNextIcon>
      }
      backButton={
        <NavigateBeforeIcon
          size="small"
          onClick={handleBack}
          style={{ color: "#fff" }}
          disabled={activeStep === 0}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight style={{ color: "#fff" }} />
          ) : (
            <KeyboardArrowLeft style={{ color: "#fff" }} />
          )}
          Back
        </NavigateBeforeIcon>
      }
    />
  );
};
export default Stepper;
