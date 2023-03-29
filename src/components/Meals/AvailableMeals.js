import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setHttpError(null);
      const response = await fetch(
        "https://react-http-3a15e-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Bir şeyler ters gitti");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          description: data[key].description,
          name: data[key].name,
          price: data[key].price,
        });
      }
      setIsLoading(false);
      setMeals(loadedMeals);
    }; 
    fetchMeals().catch(error => {
      setHttpError(error.message);
      setIsLoading(false);
    })
   
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.loadingMessage}>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section>
        <p className={classes.errorMessage}>{httpError}</p>
      </section>
    );
  }

  

  const mealsList = meals.map((meal) => (
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
      </Card>
    </section>
  );
};

export default AvailableMeals;
