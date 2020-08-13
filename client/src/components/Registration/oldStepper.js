import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegBasicInfo from "../RegBasicInfo";
import RegAccountInfo from "../RegAccountInfo";
import RegBio from "../RegBio";

const log = console.log;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

class RegStepper extends React.Component {
  // classes = this.useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);

  getSteps = () => {
    return ["Basic info", "Account info", "Account bio"];
  };

  activeStep = 0;
  steps = this.getSteps();

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <RegBasicInfo />;
      case 1:
        return <RegAccountInfo />;
      case 2:
        return <RegBio />;
      default:
        return "Unknown stepIndex";
    }
  };

  setActiveStep = (step) => {
    this.activeStep = step;
  };

  handleNext = () => {
    this.setActiveStep(this.activeStep + 1);
    log(this.activeStep);
  };

  handleBack = () => {
    this.setActiveStep(this.activeStep - 1);
  };

  goToLogin = () => {
    window.location.href = "/login";
  };

  render() {
    return (
      <div
      // className={this.classes.root}
      >
        <Stepper activeStep={this.activeStep} alternativeLabel>
          {this.steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.activeStep === this.steps.length ? (
            <div>
              <Typography
                className={this.classes.instructions}
                component={"div"}
              >
                Registration complete!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={this.goToLogin}
              >
                Log in
              </Button>
            </div>
          ) : (
            <div>
              <Typography
                // className={this.classes.instructions}
                component={"div"}
              >
                {this.getStepContent(this.activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={this.activeStep === 0}
                  onClick={this.handleBack}
                  // className={this.classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {this.activeStep === this.steps.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RegStepper;
