import React from "react";
import "./Login.scss";
import {Login, Register} from "./login/index";
import Navbar from "./navbar";
import {Alert} from "react-bootstrap";
import reactCSS from "reactcss";

const base_url = 'http://127.0.0.1:8000/'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: true,
            isInactiveUser: false,
            isUserLoggedin: localStorage.getItem('token') ? true : false,
            username: '',
        };
    }

    componentDidMount() {
        this.rightSide.classList.add("right");
        if (this.state.isUserLoggedin) {
            fetch(base_url + 'login/current_user/', {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(resp => {
                    this.setState({username: resp.username});
                })
                .catch(err => console.log(err));
        }
    }

    handleRemoveToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        this.setState({isUserLoggedin: false, isInactiveUser: false, username: ''});
    }

    componentWillUnmount() {
        this.handleRemoveToken();
    }

    handleLoginChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleLogout = () => {
        this.handleRemoveToken();
    }

    handleLogin = (e, data) => {
        // console.log(data['username'], data['password'])
        e.preventDefault();
        console.log()
        fetch(base_url + 'token-auth/', {
            crossDomain: true,
            withCredentials: true,
            async: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // "cache-control": "no-cache",
                // "Postman-Token": "923479a3-a392-4bcf-a920-b5060bf38820"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                localStorage.setItem('token', json.token);
                localStorage.setItem('user_id', json.user.id);
                localStorage.setItem('username', json.user.username);
                console.log(localStorage);
                this.setState({
                    isUserLoggedin: true,
                    username: json.user.username
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isInactiveUser: true
                })
            })
    }

    handelAlertOnClose = () => {
        this.setState({
            isInactiveUser: false
        });
        localStorage.removeItem('token');
    }

    changeState() {
        const isLogginActive = this.state.isLogginActive;
        if (isLogginActive) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }
        this.setState(prevState => ({isLogginActive: !prevState.isLogginActive}));
    }

    render() {
        const {isLogginActive, isInactiveUser, isUserLoggedin, username} = this.state;
        const current = isLogginActive ? "Register" : "Login";
        const currentActive = isLogginActive ? "login" : "register";
        const styles = reactCSS({
            'default': {
                login_form: {
                    padding: "30px"
                }
            },
        })
        return (
            <div>
                <Navbar name="login"/>
                <div>
                    {isInactiveUser && (
                        <Alert variant="danger" onClose={() => this.handelAlertOnClose()} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                User does not exist
                            </p>
                        </Alert>
                    )}
                </div>

                <div className="App" style={styles.login_form}>
                    <div className="login">
                        <div className="container" ref={ref => (this.container = ref)}>
                            <div>
                                {isLogginActive && !isUserLoggedin && (
                                    <Login
                                        containerRef={ref => (this.current = ref)}
                                        isUserLoggedin={isUserLoggedin}
                                        handleLogin={this.handleLogin}
                                        handleLoginChange={this.handleLoginChange}
                                        handleLogout={this.handleLogout}
                                        username={username}
                                    />
                                )}
                                {!isLogginActive && !isUserLoggedin && (
                                    <Register containerRef={ref => (this.current = ref)}/>
                                )}
                                {isUserLoggedin && [
                                    <h2 key="greeting" className="font">Hello {this.state.username}</h2>,
                                    <div key="logout">
                                        <button className="btn" onClick={this.handleLogout}>Logout</button>
                                    </div>
                                ]}
                            </div>
                        </div>
                        <RightSide
                            current={current}
                            currentActive={currentActive}
                            containerRef={ref => (this.rightSide = ref)}
                            onClick={this.changeState.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const RightSide = props => {
    return (
        <div
            className="right-side"
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};

export default App;
