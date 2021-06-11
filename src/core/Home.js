import React, { useEffect, useState } from "react";
import Base from "./Base";
import "../styles.css";
import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";
import CardComponent from "./CardComponent";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    return getAllProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base>
      <Container>
        <HomeMain>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={4} md={3}>
                <CardComponent product={product} />
              </Grid>
            ))}
          </Grid>
        </HomeMain>
      </Container>
    </Base>
  );
};

export default Home;

const HomeMain = styled.div`
  margin: 70px 0px;
  padding: 20px;
`;
