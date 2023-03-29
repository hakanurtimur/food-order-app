import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const Checkout = (props) => {


   const [formValidity, setFormValidity] = useState(
    {
        name: true,
        street: true,
        postalCode: true,
        city: true
    }
   ) 

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();



  const confirmHandler = (event) => {
    

    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid

    if(!formIsValid) {
        return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredCity,
        postalCode: enteredPostalCode,
        city: enteredCity
    })
    

    
  };

  const formValidityName = `${classes.control} ${!formValidity.name && classes.invalid}`;
  const formValidityStreet = `${classes.control} ${!formValidity.street && classes.invalid}`;
  const formValidityPostalCode = `${classes.control} ${!formValidity.postalCode && classes.invalid}`;
  const formValidityCity = `${classes.control} ${!formValidity.city && classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={formValidityName}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={formValidityStreet}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={formValidityPostalCode}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInputRef} type="text" id="postal" />
        {!formValidity.postalCode && <p>Please enter a valid postal code(5 characters long.)!</p>}
      </div>
      <div className={formValidityCity}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
