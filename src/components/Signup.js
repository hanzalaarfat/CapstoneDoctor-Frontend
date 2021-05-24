import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";

import Axios from "axios";
// import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 290,
  },
}));

const Signup = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [len, setLen] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [drcategory, setDrcategory] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await Axios.get(
        "https://capstone-health.herokuapp.com/category/getcategory"
      );

      setDrcategory(req.data.categoryList);
      setLen(req.data.categoryList.length);
    }

    fetchData();
  }, []);
  console.log(typeof drcategory[0]);
  console.log(drcategory.length);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(value);
    console.log(name);

    setUser({ ...user, [name]: value }); //// will take the name from line 15
  };
  console.log(user);
  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, password, category } = user;

    await Axios.post("https://capstone-health.herokuapp.com/doctor/signup", {
      name,
      email,
      password,
      category,
    }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            name="name"
            value={user.name}
            onChange={handleInputs}
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={handleInputs}
          />

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            name="password"
            value={user.password}
            onChange={handleInputs}
          />
          <TextField
            fullWidth
            label="Category"
            placeholder="Enter your Category"
            name="category"
            value={user.category}
            onChange={handleInputs}
          />
          {/* <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Category
            </InputLabel>

            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {/* {drcategory.map((cate, index) => (
                <MenuItem value={index}>{drcategory[0]}</MenuItem>
              ))} */}
          {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem> 
              <MenuItem value={30}>Thirty</MenuItem> */}
          {/* </Select>
          </FormControl> */}
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={PostData}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
