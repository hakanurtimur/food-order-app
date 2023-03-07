import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-contex";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"


const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext);

    const { items } = ctx
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false)
    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true)

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false)
        }, 300)

        return (() => {clearTimeout(timer)})
    }, [items])


    
    const numberOfItems = ctx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${buttonIsHighlighted && classes.bump}`

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfItems}
            </span>
        </button>
    )

}

export default HeaderCartButton;