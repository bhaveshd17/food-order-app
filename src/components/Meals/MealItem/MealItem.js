import React from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
function MealItem(props) {
    const {name, description} = props.meal
    const price = `$${props.meal.price.toFixed(2)}`
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.meal.id}/>
            </div>
            
        </li>
    )
}

export default MealItem