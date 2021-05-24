import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function Drstatus() {
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = async (event) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.checked });

    console.log(state.checkedB);
    let mytoken = localStorage.getItem("token");
    let bol = state.checkedB;
    let id = localStorage.getItem("drId");
    console.log(id);
    console.log(bol);
    // setBol({ ...state, [event.target.name]: event.target.checked });

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mytoken}`,
    };

    await Axios.post(
      "https://capstone-health.herokuapp.com/doctor/status",
      {
        id,
        bol,
      },
      { headers }
    ).then((res) => {
      console.log(res);
      window.alert("Successfull Update Status");
      // setState({ ...state, [event.target.name]: event.target.checked });
      // console.log(res.data);
    });
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     await Axios.post("https://capstone-health.herokuapp.com/doctor/status", {
  //       id,
  //       bol,
  //     }).then((res) => {
  //       console.log(res);
  //       // setState({ ...state, [event.target.name]: event.target.checked });
  //       // console.log(res.data);
  //     });
  //   }

  //   fetchData();
  // }, []);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
          />
        }
        label="Dr's Status"
      />
    </FormGroup>
  );
}
