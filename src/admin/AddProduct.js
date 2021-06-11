import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { CreateProduct, GetCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Alert, AlertTitle } from "@material-ui/lab";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    feature: false,
    offer: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    feature,
    offer,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const history = useHistory();

  const { user, token } = isAuthenticated();

  const preload = () => {
    GetCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
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

  const handleSuccessMessage = () => {
    if (createdProduct) {
      setTimeout(() => {
        history.push("/admin/dashboard");
      }, 5000);
    }
    return (
      <div>
        <Alert
          severity="success"
          style={{ display: createdProduct ? "" : "none" }}
        >
          <AlertTitle>Success</AlertTitle>
          Product Added SuccessFully
        </Alert>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    CreateProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          category: "",
          feature: false,
          offer: "",
          error: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const AddProductForm = () => {
    return (
      <FormBody noValidate autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="standard-category-name" shrink>
            Photo Upload
          </InputLabel>
          <Input
            type="file"
            id="standard-category-name"
            onChange={handleChange("photo")}
            fullWidth
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-category-name">Product Name</InputLabel>
          <Input
            id="standard-category-name"
            onChange={handleChange("name")}
            value={name}
            fullWidth
          />
        </FormControl>
        <FormControl>
          <TextField
            id="filled-multiline-flexible"
            label="Description"
            multiline
            rowsMax={4}
            value={description}
            onChange={handleChange("description")}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-category-name">Price</InputLabel>
          <Input
            type="number"
            id="standard-category-name"
            onChange={handleChange("price")}
            value={price}
            fullWidth
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-category-name">Stock</InputLabel>
          <Input
            type="number"
            id="standard-category-name"
            onChange={handleChange("stock")}
            value={stock}
            fullWidth
          />
        </FormControl>
        <FormControl>
          <InputLabel id="demo-customized-select-label">Category</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            onChange={handleChange("category")}
            value={category}
          >
            <MenuItem value="">
              <em>Category</em>
            </MenuItem>
            {categories &&
              categories.map((category, index) => (
                <MenuItem value={category._id} key={index}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Feature</FormLabel>
          <RadioGroup
            aria-label="feature"
            name="feature1"
            onChange={handleChange("feature")}
            value={feature}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="false" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="standard-category-name">Offer</InputLabel>
          <Input
            id="standard-category-name"
            onChange={handleChange("offer")}
            value={offer}
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
        <AddProductMain>
          <BackIcon>
            <Link to="/admin/dashboard">
              <KeyboardBackspaceOutlinedIcon fontSize="large" />
            </Link>
          </BackIcon>
          {handleErrorMessage()}
          {handleSuccessMessage()}
          <Title>Add Product</Title>
          {AddProductForm()}
        </AddProductMain>
      </Container>
      {/* {JSON.stringify(values)} */}
    </Base>
  );
};

export default AddProduct;

const AddProductMain = styled.div`
  margin: 70px 0px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 9px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  text-align: center;
  margin: 10px 0px;
  font-size: 30px;
`;

const BackIcon = styled.div`
  display: flex;
  align-items: center;
  transition: 0.5s all ease-in-out;
  a {
    text-decoration: none;
    border-radius: 20px;
    width: 8%;
    height: fit-content;
    transition: 0.5s all ease-in-out;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px 55px;
  .MuiFormControl-root {
    margin: 15px 0px;
  }

  @media (max-width: 660px) {
    margin: 5px 15px;
  }
`;
