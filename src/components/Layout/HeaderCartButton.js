import React, {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

function HeaderCartButton(props) {
    const cartctx = useContext(CartContext)
    const {items} = cartctx
    const [isBtnHighlighted, setisBtnHighlighted] = useState(false)
    const numberOfItemsInCart = items.reduce((currentNumber, item)=>{
        return currentNumber + item.amount
    }, 0)
    const btnClass = `${classes.button} ${isBtnHighlighted?classes.bump:''}`

    useEffect(() => {
        if(items.length === 0) return;
        setisBtnHighlighted(true)
        const timer = setTimeout(()=>{
            setisBtnHighlighted(false)
        }, 300)

        return ()=>{
            clearTimeout(timer)
        }
    }, [items])
    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItemsInCart}</span>
        </button>
    )
}

export default HeaderCartButton
