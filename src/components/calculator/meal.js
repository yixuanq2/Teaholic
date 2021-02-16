import React from "react";
import './meal.css';
import {FaEdit, FaTrash} from "react-icons/fa";
import {GiClick} from "react-icons/gi";
import {FcLike} from "react-icons/fc";

export function Meal(props) {
    return (
        <React.Fragment>
            <tr>
                <td>{props.meal.text}</td>
                <td>{props.meal.calorie}</td>
                {props.showTab &&
                <td>
                    <FaTrash onClick={props.onDelete} className="mr-4"/>
                    <FaEdit/>
                </td>
                }
                {props.showMenuAddTab &&
                <td>
                    <GiClick onClick={props.onMenuAdd} className="mr-4 button"/>
                </td>}
                {props.showMenuDeleteTab &&
                <td>
                    <FaTrash onClick={props.onMenuDelete} className="mr-4 button"/>
                </td>}
                {props.showLikeTab &&
                <td>
                    <FcLike onClick={props.onAddLike} className="mr-4 button"/>
                </td>}
            </tr>
        </React.Fragment>
    );
}
