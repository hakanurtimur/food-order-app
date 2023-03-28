import classes from "./Checkout.module.css";

export default function Checkout() {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Your street</label>
        <input type="text" id="street"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal-code">Your Postal Code</label>
        <input type="text" id="postal-code"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">Your City</label>
        <input type="text" id="city"></input>
      </div>
      <button>Confirm</button>
    </form>
  );
}
