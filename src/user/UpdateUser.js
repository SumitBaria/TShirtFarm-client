import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import styled from "styled-components";
// import { GetACategory, UpdateThisCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Alert, AlertTitle } from "@material-ui/lab";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { Link, useHistory } from "react-router-dom";
import { UpdateThisUser, GetAUser } from "./helper/userapicalls";

const UpdateUser = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [firstName, setFirstName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const history = useHistory();

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

  const handleSuccessMessage = () => {
    if (success) {
      setTimeout(() => {
        history.push("/admin/categories");
      }, 1000);
    }
    return (
      <div>
        <Alert severity="success" style={{ display: success ? "" : "none" }}>
          <AlertTitle>Success</AlertTitle>
          Category Added SuccessFully
        </Alert>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    UpdateThisUser(user._id, token, {
      name: firstName,
      lastname: lastName,
      email,
    })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setFirstName("");
          setLastName("");
          setEmail("");
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => setError(err));
  };

  const AddCategoryForm = () => {
    return (
      <FormBody noValidate autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="standard-category-name">First Name</InputLabel>
          <Input
            id="standard-category-name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-category-name">Last Name</InputLabel>
          <Input
            id="standard-category-name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-category-name">Email</InputLabel>
          <Input
            id="standard-category-name"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
          />
        </FormControl>

        <Button variant="contained" color="primary" onClick={onSubmit}>
          Update
        </Button>
      </FormBody>
    );
  };

  return (
    <Base>
      <Container maxWidth="sm">
        <AddCategoryMain>
          <BackIcon>
            <Link to="/admin/categories">
              <KeyboardBackspaceOutlinedIcon fontSize="large" />
            </Link>
          </BackIcon>
          {handleErrorMessage()}
          {handleSuccessMessage()}
          <Title>Add Category</Title>
          {AddCategoryForm()}
        </AddCategoryMain>
      </Container>
    </Base>
  );
};

export default UpdateUser;

const AddCategoryMain = styled.div`
  margin: 70px 0px;
  padding: 20px 90px;
  border-radius: 6px;
  box-shadow: 2px 2px 9px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  text-align: center;
  margin: 10px 0px;
  font-size: 30px;

  @media (max-width: 612px) {
    margin: 10px 0px;
  }
`;
const FormBody = styled.form`
  display: flex;
  flex-direction: column;

  .MuiFormControl-root {
    margin: 15px 0px;
  }
`;

const BackIcon = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    border-radius: 20px;
    width: 10%;
    height: fit-content;
    transition: 0.5s all ease-in-out;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
