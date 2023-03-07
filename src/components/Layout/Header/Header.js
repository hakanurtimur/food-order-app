import React from "react";

import mealsImage from "../../../assets/meals.jpeg"
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
return(
    <React.Fragment>
        <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='table full of delicius food'/> 
        </div>
    </React.Fragment>
)
}