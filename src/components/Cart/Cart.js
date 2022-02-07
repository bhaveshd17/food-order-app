import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const Cartctx = useContext(CartContext);
  const totalAmount = `$${Cartctx.totalAmount.toFixed(2)}`;
  const hasItem = Cartctx.items.length === 0;
  const onAddHandler = (item) => {
    Cartctx.addItem({ ...item, amount: 1 });
  };
  const onRemoveHandler = (id) => {
    Cartctx.removeItem(id);
  };
  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderaHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://food-order-app-eca1b-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: Cartctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    Cartctx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {Cartctx.items.map((item, id) => (
        <CartItem
          key={id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={onRemoveHandler.bind(null, item.id)}
          onAdd={onAddHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const cartBtnAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        close
      </button>
      {!hasItem && (
        <button className={classes.button} onClick={checkoutHandler}>
          order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClick} onConfirm={submitOrderaHandler} />
      )}
      {!isCheckout && cartBtnAction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClick}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onClick}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
