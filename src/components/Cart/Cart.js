import classes from "./Cart.module.css";
import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const Cartctx = useContext(CartContext);
  const totalAmount = `$${Cartctx.totalAmount.toFixed(2)}`;
  const hasItem = Cartctx.items.length === 0;
  const onAddHandler = (item)=>{
      Cartctx.addItem({...item, amount: 1})
  };
  const onRemoveHandler = (id)=>{
      Cartctx.removeItem(id)
  }
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
  return (
    <Modal onClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClick}>
          close
        </button>
        {!hasItem && <button className={classes.button}>order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
