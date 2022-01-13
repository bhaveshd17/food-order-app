import React, {useContext} from 'react'
import CartContext from '../../../store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
function MealItem(props) {
    const {name, description} = props.meal
    const price = `$${props.meal.price.toFixed(2)}`
    const Cartctx = useContext(CartContext)
    const onAddAmountHandler = (amount) =>{
        Cartctx.addItem({
            id: props.meal.id,
            name:name,
            price: props.meal.price,
            amount: amount,
        })
    }
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.meal.id} onAddAmount={onAddAmountHandler}/>
            </div>
            
        </li>
    )
}

export default MealItem
