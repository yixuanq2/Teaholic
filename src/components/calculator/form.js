import React, {Component} from "react";
import Axios from 'axios';

const shortid = require("shortid");

const base_url = 'http://127.0.0.1:8000/';

export class Form extends Component {
    state = {
        showform: false,
        text: "",
    };

    toggleChange = () => {
        this.setState({
            showform: !this.state.showform
        });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleRequest = () => {
        Axios.post(base_url + 'calculator', {
            'ingredient': this.state.text,
        })
            .then(response => {
                console.log(response);
                console.log(response.status + " " + response.statusText);
                this.props.onsubmit({
                    id: shortid.generate(),
                    text: this.state.text,
                    calorie: parseInt(response.data[0].calorie)
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.handleRequest();
        this.setState({
            text: "",
        });
    };

    render() {
        if (this.state.showform === false) {
            return (
                <React.Fragment>
                    <form onClick={this.toggleChange}>
                        <button type="button" className="btn btn-success">
                            Add Ingredient
                        </button>
                    </form>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Ingredient:</label>
                            <input
                                name="text"
                                value={this.state.text}
                                onChange={this.handleChange}
                                className="form-control"
                                id="email"
                            />
                        </div>
                        {/* <div className="form-group">
              <label>Calories:</label>
              <input
                name="calorie"
                value={this.state.calorie}
                onChange={this.handleChange}
                type="number"
                className="form-control"
                id="pwd"
              />
            </div> */}
                        <button onSubmit={this.handleSubmit} className="btn btn-info mr-2">
                            Save
                        </button>
                        <button onClick={this.toggleChange} className="btn btn-danger">
                            Cancel
                        </button>
                    </form>
                </React.Fragment>
            );
        }
    }
}
