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
import { GetACategory, UpdateThisCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Alert, AlertTitle } from "@material-ui/lab";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { Link, useHistory } from "react-router-dom";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const history = useHistory();

  const preload = (categoryId) => {
    GetACategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

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
    console.log(name);
    UpdateThisCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setName("");
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
          <InputLabel htmlFor="standard-category-name">
            Category Name
          </InputLabel>
          <Input
            id="standard-category-name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Add
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

export default UpdateCategory;

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
