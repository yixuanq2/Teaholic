import React, {Component} from "react";
import "./Menu.css";
import Axios from 'axios';
import {Meal} from "../calculator/index";
import Navbar from "../navbar";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {CircularProgressbar} from 'react-circular-progressbar';
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import 'react-circular-progressbar/dist/styles.css';
import reactCSS from "reactcss";

const base_url = 'http://127.0.0.1:8000/';

class Menu extends Component {
    state = {
        meals: [{text: 'Milk', calorie: 100}, {text: 'Sugar', calorie: 300}, {text: 'Bubble', calorie: 40}],
        limitedMeals: [],
        selectedMeals: [],
        favMeals: [],
        favMealsCal: [],
        favMenuCal: [],
        countSelected: 0,
        consumedCal: 0,
        isInvalidCal: false,
        calLimite: 0,
        calLimiteAll: 0,
        calLimiteFav: 0
    };

    constructor(props) {
        super(props);
        this.handleFavClick = this.handleFavClick.bind(this);
        this.handleIngClick = this.handleIngClick.bind(this);
        this.state.isFav = false;
    }

    handleRequest1 = () => {
        Axios.get(base_url + 'ingredient/get')
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                response.data[0].forEach(element => {
                    this.setState({
                        meals: [
                            {text: element.name, calorie: element.calorie},
                            ...this.state.meals
                        ],
                    })
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRequest2 = () => {
        Axios.post(base_url + 'ingredient/fav', {
            'username': `${localStorage.getItem('username')}`,
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                response.data[0].forEach(element => {
                    this.setState({
                        favMeals: [
                            {text: element.name, calorie: element.calorie},
                            ...this.state.favMeals
                        ],
                    })
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRequest3 = (consumedCal) => {
        Axios.post(base_url + 'ingredient/check', {
            'username': `${localStorage.getItem('username')}`,
            'consumedCal': consumedCal
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                if (response.data[0]) {
                    this.setState({
                        consumedCal: response.data[0]
                    });
                } else {
                    this.setState({
                        isInvalidCal: true
                    })
                    console.log(response.data);
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRequest4 = (meal) => {
        Axios.post(base_url + 'user/like', {
            'username': `${localStorage.getItem('username')}`,
            'ingredient': meal.text
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRequest5 = (calorie) => {
        Axios.post(base_url + 'get_ingredient_with_calorie', {
            "calorie": calorie,
            "username": `${localStorage.getItem('username')}`
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                response.data[0].forEach(element => {
                    this.setState({
                        favMealsCal: [
                            {text: element.name, calorie: element.calorie},
                            ...this.state.favMealsCal
                        ],
                    })
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRequest6 = (calorie) => {
        Axios.post(base_url + 'list_ingredient', {
            "target": calorie,
            "range": 10
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                this.setState({
                    limitedMeals: response.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRequest7 = (calorie) => {
        Axios.post(base_url + 'list_ingredient_username', {
            "target": calorie,
            "range": 10,
            "username": `${localStorage.getItem('username')}`
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                this.setState({
                    favMenuCal: response.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.handleRequest1();
        this.handleRequest3(0);
    }

    handleFavClick() {
        if (this.state.isFav) {
            this.setState({
                isFav: false,
                favMeals: []
            });
        } else {
            this.setState({isFav: true});
            this.handleRequest2();
        }
    }

    handleIngClick() {
        this.setState({isFav: false});
    }

    handleOnMenuAdd(selectedMeal) {
        const newCount = this.state.countSelected + 1;
        this.setState({
            selectedMeals: [...this.state.selectedMeals,
                {
                    id: newCount,
                    text: selectedMeal.text,
                    calorie: selectedMeal.calorie
                }],
            countSelected: newCount,
        });
    }

    handleOnMenuDelete(id) {
        const newCount = this.state.countSelected - 1;
        this.setState({
            selectedMeals: this.state.selectedMeals.filter((meal) => meal.id !== id),
            countSelected: newCount
        });
    }

    handleOnSubmit() {
        const reducer = this.state.selectedMeals.reduce(
            (totalCalories, meal) => totalCalories + meal.calorie,
            0
        )
        this.setState({
            selectedMeals: []
        })
        this.handleRequest3(reducer);
    }

    handleOnSet() {
        this.setState({
            favMealsCal: []
        });
        this.handleRequest5(this.state.calLimite);
    }

    handleOnSetAll() {
        this.setState({
            limitedMeals: []
        });
        this.handleRequest6(this.state.calLimiteAll);
    }

    handleOnSetFav() {
        this.setState({
            favMenuCal: []
        });
        this.handleRequest7(this.state.calLimiteFav);
    }

    handelAlertOnClose = () => {
        this.setState({
            isInvalidCal: false
        });
    }

    handleSetCal = (e) => {
        this.setState({
            calLimite: e.target.value
        })
    }

    handleSetCalAll = (e) => {
        this.setState({
            calLimiteAll: e.target.value
        })
    }

    handleSetCalFav = (e) => {
        this.setState({
            calLimiteFav: e.target.value
        })
    }

    render() {
        const styles = reactCSS({
            'default': {
                button: {
                    marginTop: "16px"
                },
                page_container: {
                    backgroundColor: '#e9ecef',
                    marginTop: '20px',
                    padding: '50px',
                    borderRadius: '0.3rem'
                }
            },
        })
        const eaten = this.state.consumedCal;
        const {
            isInvalidCal,
            meals,
            calLimite,
            favMenuCal,
            calLimiteAll,
            calLimiteFav,
            favMeals,
            favMealsCal,
            limitedMeals,
            selectedMeals
        } = this.state
        const total = 1500;
        let x;
        let y;
        if (!this.state.isFav) {
            x =
                <tbody>
                {meals.map((meal, i) => (
                    <Meal
                        key={i}
                        meal={meal}
                        showMenuAddTab={true}
                        showLikeTab={true}
                        onMenuAdd={() => this.handleOnMenuAdd(meal)}
                        onAddLike={() => this.handleRequest4(meal)}
                    />
                ))}
                </tbody>
            y =

                <div className="form-group">
                    <label>You will get recommended recipes lower than entered calories</label>
                    <input
                        name="text"
                        value={calLimiteAll}
                        onChange={this.handleSetCalAll}
                        className="form-control"
                        id="calorie"
                    />
                    <Button onClick={() => this.handleOnSetAll()} style={styles.button}>
                        Set
                    </Button>

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Ingredients</th>
                        </tr>
                        </thead>

                        <tbody>
                        <React.Fragment>
                            {limitedMeals.map((ingredients, i) => (
                                <tr key={i}>{ingredients.map((ingredient, j) => (
                                    <td key={j}>{ingredient}</td>
                                ))}</tr>
                            ))}
                        </React.Fragment>
                        </tbody>
                    </table>

                </div>

        } else {
            x = <tbody>
            {favMeals.map((meal, i) => (
                <Meal
                    key={i}
                    meal={meal}
                    showMenuAddTab={true}
                    onMenuAdd={() => this.handleOnMenuAdd(meal)}
                />
            ))}
            </tbody>
            y =
                <div>
                    <div className="form-group">
                        <label>You can choose Ingredients lower than entered calories from your favourites</label>
                        <input
                            name="text"
                            value={calLimite}
                            onChange={this.handleSetCal}
                            className="form-control"
                            id="calorie"
                        />
                        <Button onClick={() => this.handleOnSet()}>
                            Set
                        </Button>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Ingredients</th>
                                <th>Calories</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {favMealsCal.map((meal, i) => (
                                <Meal
                                    key={i}
                                    meal={meal}
                                    showMenuAddTab={true}
                                    onMenuAdd={() => this.handleOnMenuAdd(meal)}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <hr/>

                    <div className="form-group">
                        <label>You will get recommended recipes lower than entered calories includeing your favourite
                            ingredients</label>
                        <input
                            name="text"
                            value={calLimiteFav}
                            onChange={this.handleSetCalFav}
                            className="form-control"
                            id="calorie"
                        />
                        <Button onClick={() => this.handleOnSetFav()} style={styles.button}>
                            Set
                        </Button>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Ingredients</th>
                            </tr>
                            </thead>

                            <tbody>
                            <React.Fragment>
                                {favMenuCal.map((ingredients, i) => (
                                    <tr key={i}>{ingredients.map((ingredient, j) => (
                                        <td key={j}>{ingredient}</td>
                                    ))}</tr>
                                ))}
                            </React.Fragment>
                            </tbody>
                        </table>

                    </div>
                </div>
        }
        return (
            <div>
                <Navbar name="menu"/>
                <div>
                    {isInvalidCal && (
                        <Alert variant="danger" onClose={() => this.handelAlertOnClose()} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Stop drinking any more milk tea!
                            </p>
                        </Alert>
                    )}
                </div>

                <div className="container" style={styles.page_container}>
                    <Container fluid="md">
                        <div>
                            <Row>
                                <Col className="align-items-end">
                                    <h2 style={{textAlign: "right"}} className="py-5">Ingredients</h2>

                                </Col>
                                <Col>
                                    <div className="graph">
                                        <div className="container">
                                            <CircularProgressbar value={eaten / total * 100}
                                                                 text={`${total - eaten} cal`}/>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                            <hr/>

                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Ingredients</th>
                                    <th>Calories</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedMeals.map((meal, i) => (
                                    <Meal
                                        key={i}
                                        meal={meal}
                                        showMenuDeleteTab={true}
                                        onMenuDelete={() => this.handleOnMenuDelete(meal.id)}
                                    />
                                ))}
                                <tr>
                                    <td>Total:</td>
                                    <td>
                                        <span role="img" aria-label="apple">🍎 </span>
                                        {selectedMeals.reduce(
                                            (totalCalories, meal) => totalCalories + meal.calorie,
                                            0
                                        )}
                                        <i><span> cal</span></i>
                                    </td>
                                    <td/>
                                </tr>
                                </tbody>
                            </table>

                            <Button onClick={() => this.handleOnSubmit()}>
                                Submit
                            </Button>

                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch checked={this.state.isFav} onChange={this.handleFavClick}/>}
                                    label="Favorite"
                                />
                            </FormGroup>

                            <hr/>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Ingredients</th>
                                    <th>Calories</th>
                                    <th/>
                                </tr>
                                </thead>
                                {x}
                            </table>

                            {/*<hr/>*/}
                            {/*{y}*/}

                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Menu;
