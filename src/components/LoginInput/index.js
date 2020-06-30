import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./styles.css";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
//   centre: {
//     position: "absolute",
//     left: "50%",
//     top: "50%",
//     transform: "translate(-50%, -50%)",
//   },
//   marginBottom: {
//     marginBottom: "20px",
//   },
//   loginButton: {
//     marginTop: "20px",
//   },
//   noLeftMargin: {
//     marginLeft: "0px",
//   },
// }));

export default class LoginInput extends React.Component {
  handleOnChange = (event) => {
    console.log(event.target.value);

    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  goToHome = () => {
    window.location.href = "/home";
  };

  checkCredentials = () => {
    if (this.state.username === "user" && this.state.password === "user") {
      this.goToHome();
    } else console.log("credentials incorrect");
  };

  render() {
    return (
      // <form className={classes.root} noValidate autoComplete="off">
      <Box>
        <div>
          <TextField
            className="marginBottom"
            label="Username"
            name="username"
            variant="outlined"
            onChange={this.handleOnChange}
          />
        </div>
        <div>
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            onChange={this.handleOnChange}
          />
          <Link className="link" to={"/registration"}>
            Need to register?
          </Link>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.checkCredentials()}
          >
            LOG IN
          </Button>
        </div>
      </Box>
      // </form>;
    );
  }
}
