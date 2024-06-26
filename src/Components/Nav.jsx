import React from 'react'
import { nav_items } from '.'
import { NavLink } from 'react-router-dom'
export const Nav = () => {
    return (
        <div className="navbar">
            {nav_items.map((value, key) => {
                return <NavLink className={`navitem`} key={key} to={value.navigate} > {value.name}</NavLink>
            })}
        </div >
    )
}
