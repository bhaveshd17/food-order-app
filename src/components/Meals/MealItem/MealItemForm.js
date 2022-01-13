import React, {useRef, useState} from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
function MealItemForm(props) {
  const [isFormValid, setIsFormValid] = useState(true)
  const amountRef = useRef()
  const submitHandler = (e)=>{
    e.preventDefault()
    const enteredAmountValue = amountRef.current.value;
    const enterAmountNumber = +enteredAmountValue
    if(enteredAmountValue.trim().length === 0 || enterAmountNumber < 1 || enterAmountNumber > 5){
      setIsFormValid(false)
      return;
    }
    props.onAddAmount(enterAmountNumber)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
      ref = {amountRef}
      label="Amount" 
      input={{ id: "amount"+props.id, type: "number", min:'1', max:'5', step:'1', defaultValue:'1' }} />
      <button>Add</button>
      {!isFormValid && <p>please enter amount between (0 - 5).</p>}
    </form>
  );
}

export default MealItemForm;
