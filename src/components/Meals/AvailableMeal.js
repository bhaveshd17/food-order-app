import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeal.module.css";
import MealItem from "./MealItem/MealItem";

function AvailableMeal() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(()=>{
    const fetchMeal = async ()=>{
      const repsonse = await fetch('https://food-order-app-eca1b-default-rtdb.firebaseio.com/meals.json')
      if(!repsonse.ok){
        throw new Error('Something went wrong ...')
      }

      const responseData = await repsonse.json()

      let loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals)
      setIsLoading(false)

    };


    fetchMeal().then().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading){
    return <section className={classes.mealLoading}>
      <p>Loading ...</p>
    </section>
  }
  if(httpError){
    return <section className={classes.mealHttpError}>
      <p>{httpError}</p>
    </section>
  }
  const mealList = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeal;
