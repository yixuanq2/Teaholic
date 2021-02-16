import React from "react";
import milktea from "../../milktea.svg";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {

        return (
            <div className="base-container" ref={this.props.containerRef}>
                {/* <div className="header">Login</div> */}
                <div className="content">
                    <div className="image">
                        <img alt="icon" src={milktea}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                   name="username"
                                   placeholder="username"
                                   value={this.props.username}
                                   onChange={this.props.handleLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   name="password"
                                   placeholder="password"
                                   onChange={this.handlePasswordChange}
                                   value={this.state.password}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn" onClick={e => this.props.handleLogin(e, {
                        username: this.props.username,
                        password: this.state.password
                    })}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
