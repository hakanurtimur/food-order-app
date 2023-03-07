import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

export default function MealItemForm(props) {
  const inputObject = {
    id: "Amount " + props.id,
    min: "1",
    max: "5",
    step: "1",
    defaultValue: "1",
    type: "number",
  };

  console.log(inputObject.id)
  return (
    <form className={classes.form}>
      <Input input={inputObject} label="Amount"></Input>
      <button>Add</button>
    </form>
  );
}
