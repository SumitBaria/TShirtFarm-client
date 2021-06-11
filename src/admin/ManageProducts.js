import { Container, Divider, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import styled from "styled-components";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { DeleteProduct, GetProducts } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Alert, AlertTitle } from "@material-ui/lab";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();

  const preload = () => {
    GetProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
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

  const deleteProduct = (productId) => {
    DeleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log("Deleted SuccessFully");
        preload();
      }
    });
  };

  const ManageProductsTable = () => {
    return (
      <ManageTable>
        <TableTitle>
          <Grid container>
            <Grid item xs={6} sm={4} md={2}>
              Name
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              Description
            </Grid>
            <Grid item xs={6} sm={4} md={1}>
              Category
            </Grid>
            <Grid item xs={6} sm={4} md={1}>
              Price
            </Grid>
            <Grid item xs={6} sm={4} md={1}>
              Stock
            </Grid>
            <Grid item xs={6} sm={4} md={1}>
              Sold
            </Grid>
            <Grid item xs={6} sm={4} md={1}>
              Feature
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              Offer
            </Grid>
            <Grid item xs={6} sm={4} md={1}></Grid>
          </Grid>
          <Divider />
        </TableTitle>
        <TableBody>
          {products.map((product, index) => {
            return (
              <>
                <Grid container key={index}>
                  <Grid item xs={6} sm={4} md={2}>
                    {product.name}
                  </Grid>
                  <Grid item xs={6} sm={4} md={2}>
                    {product.description}
                  </Grid>
                  <Grid item xs={6} sm={4} md={1}>
                    {product.category.name}
                  </Grid>
                  <Grid item xs={6} sm={4} md={1}>
                    {product.price}
                  </Grid>
                  <Grid item xs={6} sm={4} md={1}>
                    {product.stock}
                  </Grid>
                  <Grid item xs={6} sm={4} md={1}>
                    {product.sold}
                  </Grid>
                  <Grid item xs={6} sm={4} md={1}>
                    {JSON.stringify(product.feature)}
                  </Grid>
                  <Grid item xs={6} sm={4} md={2}>
                    {product.offer}
                  </Grid>
                  <Grid item xs={6} sm={4} md={1}>
                    <TableIcon>
                      <div
                        onClick={() => {
                          deleteProduct(product._id);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                      <div>
                        <Link to={`/admin/product/update/${product._id}`}>
                          <EditIcon />
                        </Link>
                      </div>
                    </TableIcon>
                  </Grid>
                </Grid>
                <Divider />
              </>
            );
          })}
        </TableBody>
      </ManageTable>
    );
  };

  return (
    <Base>
      <Container maxWidth="lg">
        <ManageProductMain>
          <BackIcon>
            <Link to="/admin/dashboard">
              <KeyboardBackspaceOutlinedIcon fontSize="large" />
            </Link>
          </BackIcon>
          {handleErrorMessage()}
          <Title>Manage Products</Title>
          {ManageProductsTable()}
        </ManageProductMain>
      </Container>
    </Base>
  );
};

export default ManageProducts;

const ManageProductMain = styled.div`
  margin: 70px 0px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 9px 5px rgba(0, 0, 0, 0.2);
`;

const BackIcon = styled.div`
  display: flex;
  text-align: center;
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

const Title = styled.div`
  text-align: center;
  margin: 10px 0px;
  font-size: 30px;
`;

const ManageTable = styled.div`
  margin: 35px 0px;
`;

const TableTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  .MuiGrid-container {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
`;

const TableBody = styled.div`
  margin: 25px 0px;

  .MuiGrid-container {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
`;

const TableIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .MuiSvgIcon-root {
    border-radius: 20px;
    display: flex;
    text-align: center;
    align-items: center;
    transition: 0.3s all ease-in-out;
    padding: 3px;
    color: black;
    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
