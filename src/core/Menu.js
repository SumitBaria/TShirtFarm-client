import { Button, List, SwipeableDrawer } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { isAuthenticated, signout } from "../auth/helper";

const Menu = () => {
  const [drawer, setDrawer] = useState(false);

  const history = useHistory();

  const handleOpen = () => {
    return setDrawer(true);
  };

  const handleClose = () => {
    return setDrawer(false);
  };

  const list = () => {
    return (
      <>
        <Link to="/">
          <Button color="primary" size="large">
            Home
          </Button>
        </Link>
        <Link to="/cart">
          <Button color="primary" size="large">
            Cart
          </Button>
        </Link>
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Link to="/admin/dashboard">
            <Button color="primary" size="large">
              Admin Dashboard
            </Button>
          </Link>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Link to="/user/dashboard">
            <Button color="primary" size="large">
              User Dashboard
            </Button>
          </Link>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <Link to="/signup">
              <Button color="primary" size="large">
                Signup
              </Button>
            </Link>
            <Link to="/signin">
              <Button color="primary" size="large">
                Login
              </Button>
            </Link>
          </Fragment>
        )}

        {isAuthenticated() && (
          <Link>
            <Button
              color="secondary"
              size="large"
              onClick={() => {
                signout(() => {
                  return history.push("/");
                });
              }}
            >
              LogOut
            </Button>
          </Link>
        )}
      </>
    );
  };

  return (
    <MenuMain>
      <Container>
        <Brand>
          <Link to="/">
            <Img
              alt="Brand Logo"
              src="./Shopping Bag Letter Initial Logo (6).svg"
            />
          </Link>
        </Brand>
        <MenuLinkButton>{list()}</MenuLinkButton>
        <MenuLinkButtonsMobile>
          <div onClick={handleOpen}>
            <MenuIcon />
          </div>
          <SwipeableDrawer
            anchor="right"
            open={drawer}
            onClose={handleClose}
            onOpen={handleOpen}
          >
            {list()}
          </SwipeableDrawer>
        </MenuLinkButtonsMobile>
      </Container>
    </MenuMain>
  );
};

export default Menu;

const MenuMain = styled.div`
  display: flex;
  font-family: "Limelight", cursive !important;
  background-color: rgba(0, 0, 0, 0);
  object-fit: contain;
  overflow-x: hidden;

  .MuiContainer-root {
    display: flex;
  }
`;

const Brand = styled.div`
  /* font-size: 30px;
  font-family: "Limelight", cursive;
  font-weight: 600;
  letter-spacing: 1px; */

  a {
    text-decoration: none;
    color: #3f51b5;
  }
`;

const MenuLinkButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  float: right;
  width: 100vw;
  a {
    text-decoration: none;
  }

  .MuiButtonBase-root {
    /* font-family: "Limelight", cursive !important; */
    font-family: montserrat, sans-serif;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-self: center;
  }

  @media (max-width: 990px) {
    opacity: 0;
  }
`;

const MenuLinkButtonsMobile = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  position: absolute;
  right: 10px;
  top: 10px;

  :hover {
    cursor: pointer;
  }

  @media (min-width: 990px) {
    opacity: 0;
  }
`;

const Img = styled.img`
  width: 150px;
  height: 70px;
`;
