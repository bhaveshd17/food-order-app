import React, {useReducer} from 'react'
import CartContext from './cart-context'


const defaultState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action)=>{
    if (action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartIndex = state.items.findIndex(
            (item)=> action.item.id === item.id
        )
        const existingCartItem = state.items[existingCartIndex];
        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }

        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE'){
        const existingCartIndex = state.items.findIndex(
            (item)=> action.id === item.id
        )
        const existingCartItem = state.items[existingCartIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter((item)=>item.id !== action.id)
        }
        else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount -1}
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }

    if(action.type === 'CLEAR'){
        return defaultState
    }

    return defaultState
}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState)
    const addItemToCartHandler = (item) =>{
        dispatchCartAction({type:'ADD', item:item})
    };
    const removeItemFromCartHandler = (id) =>{
        dispatchCartAction({type:'REMOVE', id:id})
    };

    const clearCartHandlert = ()=>{
        dispatchCartAction({type:'CLEAR'})
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandlert,

    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
