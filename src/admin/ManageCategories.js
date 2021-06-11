import {
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import styled from "styled-components";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { DeleteCategory, GetCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Alert, AlertTitle } from "@material-ui/lab";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const preload = () => {
    GetCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
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

  const deleteCategory = (categoryId) => {
    DeleteCategory(categoryId, user._id, token).then((data) => {
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
      <>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <TableHD>Name</TableHD>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>

                  <TableCell align="right">
                    <TableIcon>
                      <div
                        onClick={() => {
                          deleteCategory(category._id);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                      <div>
                        <Link to={`/admin/product/update/${category._id}`}>
                          <EditIcon />
                        </Link>
                      </div>
                    </TableIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
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

          <Title>Manage Categories</Title>
          {ManageProductsTable()}
        </ManageProductMain>
      </Container>
    </Base>
  );
};

export default ManageCategories;

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

const TableHD = styled.span`
  font-size: 15px;
  font-weight: 600;
`;
