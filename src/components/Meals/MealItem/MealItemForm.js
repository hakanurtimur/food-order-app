import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";
import React, {useRef, useState} from 'react';

export default function MealItemForm(props) {

  const [amountIsValid, setAmountIsValid] = useState(true)

  const amountRef = useRef()

const sumbitHandler = (event) => {
  event.preventDefault()
  const enteredAmount = amountRef.current.value;
  const enteredAmountNumber = +enteredAmount
  
  if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
    setAmountIsValid(false)
    return;
  }
  props.onAddCart(enteredAmountNumber)
}

  const inputObject = {
    
    id: "Amount " + props.id,
    min: "1",
    max: "5",
    step: "1",
    defaultValue: "1",
    type: "number",
  };

  return (
    <form className={classes.form} onSubmit={sumbitHandler}>
      <Input ref= {amountRef} input={inputObject} label="Amount"></Input>
      <button>Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
}
