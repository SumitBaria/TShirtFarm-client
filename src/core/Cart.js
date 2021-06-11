import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Base from "./Base";
import CardComponent from "./CardComponent";
import { loadCart } from "./helper/cartHelper";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { Link } from "react-router-dom";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base>
      <Container>
        <CartMain>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6}>
              <BackIcon>
                <Link to="/">
                  <KeyboardBackspaceOutlinedIcon fontSize="large" />
                </Link>
              </BackIcon>
              <Grid container spacing={3}>
                {products.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <CardComponent
                      product={item}
                      addToCart={false}
                      removeFromCart={true}
                      setReload={setReload}
                      reload={reload}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Payment
                products={products}
                setReload={setReload}
                reload={reload}
              />
            </Grid>
          </Grid>
        </CartMain>
      </Container>
    </Base>
  );
};

export default Cart;

const CartMain = styled.div`
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
