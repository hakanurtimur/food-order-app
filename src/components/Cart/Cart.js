import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-contex";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import React from "react";

export default function Cart(props) {
  const [orderIsShown, setOrderIsShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);

  const showOrderHandler = () => {
    setOrderIsShown(true);
  };

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const submitInputHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-3a15e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
        headers: { "content-type": "application-json" },
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearItem()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const buttons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button onClick={showOrderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderIsShown && (
        <Checkout
          onConfirm={submitInputHandler}
          onCancel={props.onHideCart}
        ></Checkout>
      )}
      {!orderIsShown && buttons}
    </React.Fragment>
  );

  const submittingModalContent = <p>Your order sending...</p>;
  const didSubmitModalContent = 
    <React.Fragment>
      <p>Your order sent!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onHideCart}>
        Close
      </button>
      </div>
    </React.Fragment>
  ;

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}
