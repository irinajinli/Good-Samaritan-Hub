import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  marginRight: {
    marginRight: "4px",
  },
  marginLeft: {
    marginLeft: "4px",
  },
  marginTop: {
    marginTop: "30px",
  },
  long: {
    width: "431.2px",
  },
  // tall: {
  //   height: "200px",
  // },
}));

export default function RegBio() {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          multiline
          rows={6}
          className={`${classes.long} ${classes.tall}`}
          label="Bio (optional)"
          variant="outlined"
        />
      </div>
    </form>
  );
}
