import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import styled from "styled-components";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

const CardComponent = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "Default Tshirt";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "Default price";

  const addtoCart = () => {
    return addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCard) => {
    return (
      addToCard && (
        <Button size="small" color="primary" onClick={addtoCart}>
          Add to Cart
        </Button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <Button
          size="small"
          color="secondary"
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
        >
          Remove From Cart
        </Button>
      )
    );
  };

  return (
    <CardMain>
      <Card>
        <CardActionArea>
          <ImageHelper productId={product._id} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              <CardTitle>{cardTitle}</CardTitle>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {cardDescription}
            </Typography>
            <Typography variant="h6" color="textPrimary" component="p">
              <CardPrice>{cardPrice} Rs.</CardPrice>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </CardActions>
      </Card>
      {getARedirect(redirect)}
    </CardMain>
  );
};

export default CardComponent;

const CardMain = styled.div`
  border-radius: 6px;
  box-shadow: 2px 2px 9px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 1150px) {
    .MuiCard-root {
      .MuiButtonBase-root {
        .MuiCardContent-root {
          .MuiTypography-root {
            font-size: 10px;
          }
        }
      }
    }
  }
`;

const CardTitle = styled.span`
  text-transform: uppercase;
`;

const CardPrice = styled.div`
  margin-top: 15px;
`;
