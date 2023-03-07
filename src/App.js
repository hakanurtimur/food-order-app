import React, { useState } from "react";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";



function App() {
const [cartIsShown, setCartIsShown] = useState(false)

const showCartHandler = () => {
  setCartIsShown(true)
}
const hideCartHandler = () => {
  setCartIsShown(false)
}

  return (
    <React.Fragment>
    {cartIsShown && <Cart onHideCart={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </React.Fragment>
  );
}

export default App;
