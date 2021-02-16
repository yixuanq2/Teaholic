import React from "react";
import Axios from 'axios';
import milktea from "../../milktea.svg";

const base_url = 'http://127.0.0.1:8000/'

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            isRegistered: false,
        }
    }

    changeHandler = (event) => {
        event.preventDefault()

        this.setState({
            [event.target.name]: event.target.value,
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

    clearForm = () => {
        this.setState({
            username: '',
            email: '',
            password: '',
            isRegistered: false,
        });
    }

    handleRequest1 = (username, email, password) => {
        Axios.post(base_url + 'login/users/create', {
            'user': {
                'username': username,
                'email': email,
                'password': password
            }
        })
            .then(response => {
                console.log(response);
                console.log(response.status + " " + response.statusText);
                this.setState({
                    isRegistered: true
                });
            })
            .catch(error => {
                console.log(error);
            })
        this.clearForm();
    }

    handleRequest2 = (username) => {
        Axios.post(base_url + 'profile/add', {
            'username': username,
        })
            .then(response => {
                console.log(response);
                console.log(response.status + " " + response.statusText);

            })
            .catch(error => {
                console.log(error)
            })
    }

    sendRegistration = e => {
        e.preventDefault()
        const {username, email, password} = this.state
        if (this.isValid()) {
            this.handleRequest1(username, email, password);
            this.handleRequest2(username);
        }

    }

    render() {
        const isRegistered = this.state.isRegistered;
        return (
            <div className="base-container" ref={this.props.containerRef}>
                {/* <div className="header">Register</div> */}
                <div className="content">
                    <div className="image">
                        <img alt="icon" src={milktea}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={this.state.username} placeholder="username"
                                   onChange={this.changeHandler}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={this.state.email} placeholder="email"
                                   onChange={this.changeHandler}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={this.state.password} placeholder="password"
                                   onChange={this.changeHandler}/>
                        </div>
                        {isRegistered && (
                            <div className="text">
                                <h3>Congratulations! You have successfully registered!</h3>
                            </div>
                        )}

                    </div>
                </div>
                <div>
                    <button type="submit" className="btn" onClick={this.sendRegistration}>
                        Register
                    </button>
                </div>
            </div>
        );
    }
}
