import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-contex";

export default function MealItem(props) {

  const ctx = useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`;


  const addCartHandler = amount => {
    ctx.addItem(
      {
        id: props.id,
        amount: amount,
        price: props.price,
        name: props.name
      }
    )
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddCart = {addCartHandler} id={props.id}></MealItemForm>
      </div>
    </li>
  );
}
