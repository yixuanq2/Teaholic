import React from "react";
import Axios from 'axios';
import {Button, Container, Form} from "react-bootstrap";

const base_url = 'http://127.0.0.1:8000/';

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: '',
            calorie: '',
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = () => {
        const {ingredient, calorie} = this.state;
        Axios.post(base_url + 'ingredient/add', {
            'name': ingredient,
            'calorie': calorie
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const {ingredient, calorie} = this.state;
        return (
            <div className="container-fluid mt-4">
                <Container fluid="md" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '60rem'}}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Ingredient</Form.Label>
                            <Form.Control type="text" name="ingredient" placeholder="Enter ingredient name"
                                          value={ingredient} onChange={this.changeHandler}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Calorie</Form.Label>
                            <Form.Control type="text" name="calorie" placeholder="Enter calorie" value={calorie}
                                          onChange={this.changeHandler}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Ingredient;