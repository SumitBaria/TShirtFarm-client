import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import Base from "../core/Base";
import styled from "styled-components";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  return (
    <Base>
      <Container>
        <AdminDashBoardMain>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Title>Admin Navigation</Title>
              <List component="nav">
                <ListItem button>
                  <Link to="/admin/create/category">
                    <ListItemText primary="Create Category" />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/admin/categories">
                    <ListItemText primary="Manage Categories" />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/admin/create/product">
                    <ListItemText primary="Create Product" />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/admin/products">
                    <ListItemText primary="Manage Products" />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/">
                    <ListItemText primary="Manage Orders" />
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Title>Admin Profile</Title>
              <Body>
                <Name>Name: {isAuthenticated().user.name}</Name>
                <Name>Email: {isAuthenticated().user.email}</Name>
                <Name>Admin Priviladges are given</Name>
              </Body>
            </Grid>
          </Grid>
        </AdminDashBoardMain>
      </Container>
    </Base>
  );
};

export default AdminDashBoard;

const AdminDashBoardMain = styled.div`
  margin: 70px 0px;
  text-align: center;
  border-radius: 6px;
  box-shadow: 2px 2px 9px 5px rgba(0, 0, 0, 0.2);

  .MuiGrid-container {
    .MuiGrid-item {
      padding: 15px;
      :first-child {
        border-right: 1px solid rgba(0, 0, 0, 0.2);
      }

      .MuiList-root {
        .MuiButtonBase-root {
          border-radius: 6px;
          margin: 5px 0px;
          text-transform: uppercase;

          a {
            text-decoration: none;
            color: black;
          }

          .MuiListItemText-root {
            .MuiTypography-root {
              font-size: 15px;
              letter-spacing: 1px;
            }
          }
        }
      }
    }
  }
`;

const Title = styled.div`
  font-weight: 600;

  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  float: left;
  margin: 15px;
`;

const Name = styled.span`
  margin: 15px;
  display: block;
  font-size: 20px;
  font-weight: 600;
`;
