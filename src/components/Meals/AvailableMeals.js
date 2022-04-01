import {useEffect, useState} from 'react';

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from './AvailableMeals.module.css';




const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() =>  {
    const fetchMeals = async () => {
      const respone = await fetch('https://order-app-2ed46-default-rtdb.firebaseio.com/meals.json');
      
      if(!respone.ok){
        throw new Error('Something is wrong!');
      }
      
      const responseData =  await respone.json()

      const loadedMeals = [];
      for (const key in responseData){
        loadedMeals.push({
          id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      };
      setMeals(loadedMeals)
      setIsLoading(false)
    };
    
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
  }, []);

  if(isLoading){
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  };

  if (httpError){
    return(
      <section className={classes.MealsLoading}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) =>
  <MealItem 
    id={meal.id}
    key={meal.id} 
    name={meal.name} 
    description= {meal.description} 
    price={meal.price}
  />); 

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );

};

export default AvailableMeals;