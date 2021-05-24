import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class Login extends React.Component {
  constructor() {
    super();
    let loggedIn = false;

    const token = localStorage.getItem("token");
    // if(token) {
    //     loggedIn = true
    // }
    this.state = {
      email: "",
      password: "",
      loggedIn,
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async formSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    try {
      const token = await Axios.post(
        "https://capstone-health.herokuapp.com/doctor/login",
        { email, password }
      );
      console.log(token.data);
      let drtoken = token.data.token;
      let drId = token.data._id;
      // console.log(token.data.token);
      localStorage.setItem("token", drtoken);
      localStorage.setItem("drId", drId);
      this.setState({
        loggedIn: true,
      });
      window.alert("Successfully Login");
    } catch (err) {
      // this.setState({
      //   error: err.message,
      // });
      window.alert("Invalid Email or Password");
    }
  }

  render() {
    // console.log(localStorage.getItem("token"));
    // console.log(localStorage.getItem("drId"));
    console.log(this.state.loggedIn);
    if (this.state.loggedIn) {
      return <Redirect to="/home" />;
    }

    const paperStyle = {
      padding: 20,
      height: "45vh",
      width: 280,
      margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };

    return (
      <form onSubmit={this.formSubmit}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>

            <TextField
              label="email"
              placeholder="Enter email"
              fullWidth
              required
              value={this.state.email}
              onChange={this.onChange}
              name="email"
            />
            <TextField
              label="password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              value={this.state.password}
              onChange={this.onChange}
              name="password"
            />

            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign in
            </Button>
            {this.state.error}

            <Typography>
              <Link href="#">Forgot password ?</Link>
            </Typography>
            <Typography>
              {" "}
              Do you have an account ?<Link href="/signup">Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </form>
    );
  }
}
