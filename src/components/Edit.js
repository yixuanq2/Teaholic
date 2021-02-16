import React, {Component} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Axios from 'axios';
import Navbar from "./navbar";

const base_url = 'http://127.0.0.1:8000/';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isUserLoggedin: localStorage.getItem('username') ? true : false,
            birthdate: '',
            gender: '',
            height: '',
            weight: '',
            dieting_status: '',
        }
    }

    componentDidMount() {
        if (this.state.isUserLoggedin) {
            Axios.post(base_url + 'profile', {
                'username': `${localStorage.getItem('username')}`,
            })
                .then(response => {
                    console.log(response)
                    console.log(response.status + " " + response.statusText)
                    const res = response.data[0];
                    this.handleSetState(res);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    handleSetState = (data) => {
        Object.keys(data).forEach((key) => {
            if (data[key] === null) {
                this.setState({
                    [key]: '',
                })
            } else {
                this.setState({
                    [key]: data[key],
                })
            }
        })
    }

    isValid = () => {
        let valid = true;
        Object.values(this.state).forEach((val) => {
            if (val === true) {
                valid = false
                return valid
            }
        })
        return valid;
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleCheckGender = (event) => {
        console.log(event);
        this.setState({
            gender: event.target.name,
        })
    }

    handleEdition = () => {
        const {birthdate, gender, height, weight, dieting_status} = this.state;
        if (this.isValid) {
            Axios.post(base_url + 'profile/edit', {
                'username': `${localStorage.getItem('username')}`,
                'age': birthdate,
                'gender': gender,
                'height': height,
                'weight': weight,
                'dieting_status': dieting_status,
            })
                .then(response => {
                    console.log(response)
                    console.log(response.status + " " + response.statusText)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        console.log(this.state);
        const {birthdate, height, weight, dieting_status} = this.state;
        return (
            <div>
                <Navbar name="profile"/>

                <div className="container-fluid mt-4">
                    <Container fluid="md" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '60rem'}}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="text" name="birthdate" placeholder="Enter age" value={birthdate}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <div key={`inline-checkbox`} className="mb-3">
                                <Form.Check inline label="Male" name="male" type="checkbox" id={`inline-checkbox-1`}
                                            onChange={this.handleCheckGender.bind(this)}/>
                                <Form.Check inline label="Female" name="female" type="checkbox" id={`inline-checkbox-2`}
                                            onChange={this.handleCheckGender.bind(this)}/>
                            </div>

                            <Form.Group>
                                <Form.Label>Height</Form.Label>
                                <Form.Control type="text" name="height" placeholder="Height" value={height}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="text" name="weight" placeholder="Weight" value={weight}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Dieting Status</Form.Label>
                                <Form.Control type="text" name="dieting_status" placeholder="Dieting Status"
                                              value={dieting_status} onChange={this.changeHandler}/>
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={this.handleEdition.bind(this)}>
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }

}

export default Edit;