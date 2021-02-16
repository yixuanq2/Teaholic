import React, {Component} from "react";
import "./Calculator.css";
import {Form, Meal} from "./calculator/index";

class Calculator extends Component {
    state = {
        meals: [],
    };

    addMeal = (meal) => {
        this.setState({
            meals: [meal, ...this.state.meals],
        });
    };

    onDelete = (id) => {
        this.setState({
            meals: this.state.meals.filter((meal) => meal.id !== id),
        });
    };

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h2>Calorie Counter</h2>
                    <hr/>
                    <Form onsubmit={this.addMeal}/>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Ingredients</th>
                            <th>Calories</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.meals.map((meal) => (
                            <Meal
                                key={meal.text}
                                meal={meal}
                                onDelete={() => this.onDelete(meal.id)}
                                showTab={true}
                            />
                        ))}
                        <tr>
                            <td>Total:</td>
                            <td>
                                <span role="img" aria-label="apple">🍎</span>
                                {this.state.meals.reduce(
                                    (totalCalories, meal) => totalCalories + meal.calorie,
                                    0
                                )}
                            </td>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Calculator;
