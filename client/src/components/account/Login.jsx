import React from "react";
import { useState, useContext } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../ui/button";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const signupinitialvalue = {
  name: "",
  username: "",
  password: "",
};

const logininitialvalue = {
  username: "",
  password: "",
};
const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, toggleAccount] = useState("login");
  const [signup, setsignup] = useState(signupinitialvalue);
  const [login, setlogin] = useState(logininitialvalue);
  const [error, seterror] = useState("");
  const [showLoginPassword, setshowLoginPassword] = useState(false);
  const [showSignupPassword, setshowSignupPassword] = useState(false);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onInputchange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValuechange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      seterror("");
      toggleAccount("login");
      setsignup(signupinitialvalue);
    } else {
      seterror("Something went wrong! Please try again");
    }
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      seterror("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      navigate("/");
      isUserAuthenticated(true);
    } else {
      seterror("Something went wrong! Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col shadow-2xl shadow-black  w-100 m-auto mt-20 p-10 gap-4 rounded-2xl">
      <img className="w-30 flex m-auto" src={imageURL} alt="Login" />
      {account === "login" ? (
        <div className="flex flex-col gap-5">
          <TextField
            onChange={(e) => onValuechange(e)}
            name="username"
            id="outlined-basic"
            label="Username"
            variant="standard"
          />
          <TextField
            onChange={(e) => onValuechange(e)}
            name="password"
            id="outlined-basic"
            label="Password"
            variant="standard"
            type={showLoginPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setshowLoginPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {error && (
            <Typography className="text-red-500 mt-2 font-bold text-xs">
              {error}
            </Typography>
          )}
          <Button
            onClick={() => loginUser()}
            className="bg-orange-400 hover:bg-orange-500 px-1"
          >
            Login
          </Button>
          <Typography className="text-blue-400 text-center" variant="body1">
            Don't have an account? Register
          </Typography>
          <Button
            onClick={() => toggleAccount("register")}
            className="bg-slate-100 text-black hover:bg-slate-200"
          >
            Register
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <TextField
            onChange={(e) => onInputchange(e)}
            name="name"
            id="outlined-basic"
            label="Enter Name"
            variant="standard"
          />
          <TextField
            onChange={(e) => onInputchange(e)}
            name="username"
            id="outlined-basic"
            label="Enter Username"
            variant="standard"
          />
          <TextField
            onChange={(e) => onInputchange(e)}
            name="password"
            id="outlined-basic"
            label="Enter Password"
            variant="standard"
            type={showSignupPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setshowSignupPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {error && (
            <Typography className="text-red-500 mt-2 font-bold text-xs">
              {error}
            </Typography>
          )}
          <Button
            onClick={() => signupUser()}
            className="bg-slate-100 text-black hover:bg-slate-200"
          >
            Register
          </Button>
          <Typography className="text-blue-400 text-center" variant="body1">
            Already have an account? Login
          </Typography>
          <Button
            onClick={() => toggleAccount("login")}
            className="bg-orange-400 hover:bg-orange-500 px-1"
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
