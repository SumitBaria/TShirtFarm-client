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
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import { Alert, AlertTitle } from "@material-ui/lab";

const Signin = () => {
  const [visibility, setVisibility] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleVisibility = () => {
    return visibility ? setVisibility(false) : setVisibility(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return setValues({
            ...values,
            error: data.error,
            loading: false,
            didRedirect: false,
          });
        } else {
          console.log(data);

          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log("Signin Request Failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div>
          <h1>Loading....</h1>
        </div>
      )
    );
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

  const SigninForm = () => {
    return (
      <>
        <FormTitle>Login</FormTitle>
        <FormBody noValidate autoComplete="off">
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
        </FormBody>
        <SubmitButtons>
          <Button color="primary" size="large" onClick={onSubmit}>
            Login
          </Button>
          <Divider />
          <Already>You don't have account?</Already>
          <Button color="primary" size="large">
            <Link to="/signup">Signup</Link>
          </Button>
        </SubmitButtons>
      </>
    );
  };

  return (
    <Base>
      <Container>
        {handleErrorMessage()}
        {loadingMessage()}
        {performRedirect()}
        <SigninMain>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <ImageFile src="./media/form/four.jpg" alt="It's Tshirt Image" />
            </Grid>
            <Grid item xs={12} sm={6}>
              {SigninForm()}
            </Grid>
          </Grid>
        </SigninMain>
      </Container>
      {/* {JSON.stringify(values)} */}
    </Base>
  );
};

export default Signin;

const SigninMain = styled.div`
  margin: 70px 0px;
  height: 80vh;
  /* border: 1px solid rgba(36, 36, 36, 0.8); */
  border-radius: 6px;
  box-shadow: 2px 2px 9px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 990px) {
    margin: 20px 0px;

    .MuiGrid-container {
      .MuiGrid-item:first-child {
        display: none;
      }
    }
  }
`;

const ImageFile = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
  border-radius: 6px 0px 0px 6px;

  @media (max-width: 612px) {
    opacity: 0;
  }
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
  /* vertical-align: middle; */
  margin: 90px 0px;
  .MuiFormControl-root {
    margin: 10px 100px;
  }

  @media (max-width: 612px) {
    margin: 50px 0px;

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
