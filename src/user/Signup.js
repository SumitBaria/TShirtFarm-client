import React, { useState } from "react";
import Base from "../core/Base";
import styled from "styled-components";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../auth/helper";
import { Alert, AlertTitle } from "@material-ui/lab";

const Signup = () => {
  const [visibility, setVisibility] = useState(false);

  const [values, setValues] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    error: "",
    success: false,
  });

  // Destucturing of values
  const { name, last_name, email, password, confirm_password, error } = values;

  // Password Visibility Methods
  const handleVisibility = () => {
    return visibility ? setVisibility(false) : setVisibility(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if (password === confirm_password) {
      signup({
        name,
        lastname: last_name,
        email,
        password,
      })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            console.log(values);
            setValues({
              ...values,
              name: "",
              last_name: "",
              email: "",
              password: "",
              confirm_password: "",
              error: "",
              success: false,
            });
            <Redirect to="/signin" />;
          }
        })
        .catch((err) => console.log("Error in Signup"));
    } else {
      setValues({ ...values, error: "Password is Not same", success: false });
    }
  };

  const handleErrorMessage = () => {
    return (
      <div>
        <Alert severity="error" style={{ display: error ? "" : "none" }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </div>
    );
  };

  const SignupForm = () => {
    return (
      <>
        <FormTitle>Signup</FormTitle>
        <FormBody noValidate autoComplete="off">
          <FormControl>
            <InputLabel htmlFor="standard-FirstName">First Name</InputLabel>
            <Input
              id="standard-FirstName"
              onChange={handleChange("name")}
              value={name}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="standard-LastName">Last Name</InputLabel>
            <Input
              id="standard-LastName"
              onChange={handleChange("last_name")}
              value={last_name}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="standard-email">Email</InputLabel>
            <Input
              type="email"
              id="standard-email"
              onChange={handleChange("email")}
              value={email}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="standard-password">Password</InputLabel>
            <Input
              type={visibility === false ? "password" : "text"}
              id="standard-password"
              onChange={handleChange("password")}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleVisibility}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {visibility ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="standard-confirm-password">
              Confirm Password
            </InputLabel>
            <Input
              type={visibility === false ? "password" : "text"}
              id="standard-confirm-password"
              onChange={handleChange("confirm_password")}
              value={confirm_password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleVisibility}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {visibility ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <SubmitButtons>
            <Button color="primary" size="large" onClick={onSubmit}>
              Signup
            </Button>
            <Divider />
            <Already>You already have account?</Already>
            <Button color="primary" size="large">
              <Link to="/signin">Login</Link>
            </Button>
          </SubmitButtons>
        </FormBody>
      </>
    );
  };

  return (
    <Base>
      <Container>
        <ErrorMsg>{handleErrorMessage()}</ErrorMsg>
        <SignupMain>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <ImageFile src="./media/form/seven.jpg" alt="It's Tshirt Image" />
            </Grid>
            <Grid item xs={12} sm={6}>
              {SignupForm()}
            </Grid>
          </Grid>
        </SignupMain>
      </Container>
      {/* {JSON.stringify(values)} */}
    </Base>
  );
};

export default Signup;

const SignupMain = styled.div`
  margin: 70px 0px;
  height: 80vh;
  /* border: 1px solid rgba(36, 36, 36, 0.8); */
  border-radius: 6px;
  box-shadow: 2px 2px 9px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 990px) {
    margin: 20px 0px;
    height: 90vh;

    .MuiGrid-container {
      .MuiGrid-item:first-child {
        display: none;
      }
    }
  }
`;

const ErrorMsg = styled.div`
  margin: 15px 155px;
`;

const ImageFile = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
  border-radius: 6px 0px 0px 6px;
`;

const FormTitle = styled.div`
  text-align: center;
  margin: 30px 0px;
  font-size: 30px;

  @media (max-width: 612px) {
    margin: 10px 0px;
  }
`;

const FormBody = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .MuiFormControl-root {
    margin: 10px 100px;
  }

  @media (max-width: 612px) {
    .MuiFormControl-root {
      margin: 3px 10px;
    }
  }
`;

const Already = styled.div`
  text-align: center;
  margin-top: 3px;
`;

const SubmitButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  button {
    margin: 15px 115px;

    a {
      text-decoration: none;
    }
  }
`;
