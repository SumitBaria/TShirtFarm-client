import React from "react";
import { Container, Grid } from "@material-ui/core";

import styled from "styled-components";
import { Link } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";

const Footer = () => {
  return (
    <FooterMain>
      <Container>
        <Brand>TShirtsFarm</Brand>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <FooterTitle>Customer Service</FooterTitle>
            <FooterBody>
              <Link>Contact Us</Link>
              <Link>Track Order</Link>
              <Link>Return Order</Link>
              <Link>Cancel Order</Link>
            </FooterBody>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FooterTitle>Company</FooterTitle>
            <FooterBody>
              <Link>About Us</Link>
              <Link>Terms & Condtions</Link>
              <Link>Privacy Policy</Link>
              <Link>Blog</Link>
            </FooterBody>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FooterTitle>Contact with us</FooterTitle>
            <FooterBodyIcons>
              <Link>
                <InstagramIcon />
              </Link>
              <Link>
                <FacebookIcon />
              </Link>
              <Link>
                <TwitterIcon />
              </Link>
              <Link>
                <PinterestIcon />
              </Link>
            </FooterBodyIcons>
          </Grid>
        </Grid>
        <FooterBottom>All Rights are Reseved</FooterBottom>
      </Container>
    </FooterMain>
  );
};

export default Footer;

const FooterMain = styled.div`
  background-color: #121858;
  color: #ffde33;
  padding: 70px 0px;

  .MuiContainer-root {
    .MuiGrid-container {
      /* font-family: montserrat, sans-serif; */
      font-family: "Nunito Sans", sans-serif;
      font-size: 15px;
      font-weight: 500;
      margin: 15px 0px;
      line-height: 20px;
    }
  }
`;

const Brand = styled.div`
  font-size: 25px;
  font-family: "Limelight", cursive;
  font-weight: 600;
  letter-spacing: 1px;
`;

const FooterTitle = styled.span`
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FooterBody = styled.div`
  margin: 25px 0px;

  a {
    text-decoration: none;
    display: block;
    color: #fffde7;
  }
`;

const FooterBodyIcons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-evenly;

  :hover {
    cursor: pointer;
  }

  a {
    color: #fffde7;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
