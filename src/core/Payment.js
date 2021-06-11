import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import DropIn from "braintree-web-drop-in-react";
import { createOrder } from "./helper/orderHelper";
import { emptyCart } from "./helper/cartHelper";
import { Button } from "@material-ui/core";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const { clientToken, instance } = info;

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((data) => {
      // console.log("INFORMATION", info);
      if (data.error) {
        setInfo({ ...info, error: data.error });
      } else {
        const clientToken = data.clientToken;
        setInfo({ ...info, clientToken: clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: clientToken }}
              onInstance={(instance) =>
                setInfo({ ...info, instance: instance })
              }
            />
            <Button size="large" color="primary" onClick={onPurchase}>
              Buy
            </Button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  });

  // const onPurchase = () => {
  //   setInfo({ loading: true });
  //   let nonce;
  //   console.log(info.instance);
  //   console.log(info.clientToken);
  //   let getNonce = info.instance.requestPaymentMethod().then((data) => {
  //     nonce = data.nonce;
  //     const paymentData = {
  //       paymentMethoNonce: nonce,
  //       amount: getAmount(),
  //     };
  //     processPayment(userId, token, paymentData)
  //       .then((response) => {
  //         setInfo({ ...info, success: response.success, loading: false });
  //         console.log("PAYMENT SUCCESSFULL");
  //         const orderData = {
  //           products: products,
  //           transaction_id: response.transaction_id,
  //           amount: response.amount,
  //         };
  //         createOrder(userId, token, orderData);
  //         emptyCart(() => {
  //           console.log("Did we got a crash?");
  //         });

  //         setReload(!reload);
  //       })
  //       .catch((err) => {
  //         setInfo({ ...info, error: err, success: false });
  //       });
  //   });
  // };

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    console.log(instance);
    // console.log(info);
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          console.log(orderData);
          createOrder(userId, token, orderData);
          emptyCart(() => {
            console.log("Did we got a crash?");
          });

          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ ...info, loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Total Amount : {getAmount()} Rs.</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Payment;
