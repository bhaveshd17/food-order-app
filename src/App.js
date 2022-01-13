import React, { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setshowCart] = useState(false)
  //for hide n show cart prop drill is good so that it will make modal reusable
  const showCartHandler = ()=>{
    setshowCart(true)
  }
  const hideCartHandler = ()=>{
    setshowCart(false)
  }

  return (
    <CartProvider>
      {showCart && <Cart onClick={hideCartHandler}/>}
      <Header onShow={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
