import React, { useEffect, useCallback } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  let fetchedMeals = [];

  const fetchMeals = useCallback(async () => {
    const response = await fetch(
      "https://react-http-3a15e-default-rtdb.firebaseio.com/meals.json"
    );

    const data = await response.json();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchedMeals = data;
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  console.log(fetchedMeals);

  const mealsList = fetchedMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        <button onClick={fetchMeals}>FETCH</button>
      </Card>
    </section>
  );
};

export default AvailableMeals;
