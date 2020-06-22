import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  centre: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  marginBottom: {
    marginBottom: "20px",
  },
  loginButton: {
    marginTop: "20px",
  },
  noLeftMargin: {
    marginLeft: "0px",
  },
}));

export default function LoginInput() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Box>
        <div>
          <TextField
            className={classes.marginBottom}
            label="Username"
            variant="outlined"
          />
        </div>
        <div>
          <TextField label="Password" variant="outlined" />
          <Link className="link" to={"/registration"}>
            Need to register?
          </Link>
        </div>
        <div>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
          >
            LOG IN
          </Button>
        </div>
      </Box>
    </form>
  );
}
