import React, {Component} from "react";

const shortid = require("shortid");

export class RecipeForm extends Component {
    state = {
        showform: false,
        text: "",
        calorie: ""
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

    handleSubmit = event => {
        event.preventDefault();
        this.props.onsubmit({
            id: shortid.generate(),
            text: this.state.text,
            calorie: parseInt(this.state.calorie)
        });
        this.setState({
            text: "",
            calorie: ""
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
                        <div className="form-group">
                            <label>Quantity (gram)</label>
                            <input
                                name="calorie"
                                value={this.state.calorie}
                                onChange={this.handleChange}
                                type="number"
                                className="form-control"
                                id="pwd"
                            />
                        </div>
                        <button onSubmit={this.handleSubmit} className="btn btn-info mr-2">
                            Add
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
