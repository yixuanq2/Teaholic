import React, {Component} from 'react';
import Axios from 'axios';
import pic from '../../milktea.svg';
import Navbar from "../navbar";
import {Alert, Col, Container, Image, Row} from "react-bootstrap";
import {Table} from "@material-ui/core";
import {ReactCSS} from "reactcss";

const base_url = 'http://127.0.0.1:8000/';
// const {isUserLoggedin, userName, birthday, gender, height, weight, dieting_status} = this.state;


const demoAccount = {
    userName: 'John',
    birthday: '2000-03-01',
    gender: 'Male',
    height: '175',
    weight: '80 kg',
    dieting_status: 's'

}

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isUserLoggedin: localStorage.getItem('user_id') ? true : false,
            birthday: '',
            userName: '',
            gender: '',
            height: '',
            weight: '',
            dieting_status: '',
        }
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('username')});
        if (this.state.isUserLoggedin) {
            Axios.post(base_url + 'profile', {
                'username': `${localStorage.getItem('username')}`,
            })
                .then(response => {
                    console.log(response)
                    console.log(response.status + " " + response.statusText)
                    const res = response.data[0];
                    this.setState({
                        birthday: res.age,
                        gender: res.gender,
                        height: res.height,
                        weight: res.weight,
                        dieting_status: res.dieting_status,
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    handleRequest1 = () => {
        Axios.post(base_url + 'profile/delete', {
            'username': `${localStorage.getItem('username')}`,
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRequest2 = () => {
        Axios.post(base_url + 'user/delete', {
            'username': `${localStorage.getItem('username')}`,
        })
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDeletion = () => {
        this.handleRequest1();
        this.handleRequest2();
        localStorage.removeItem('username');
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
    }


    render() {
        const photo = pic;
        const location = 'Illinois, USA';

        let {isUserLoggedin, userName, birthday, gender, height, weight, dieting_status} = this.state;
        if (!isUserLoggedin) {
            userName = demoAccount.userName
            birthday = demoAccount.birthday
            gender = demoAccount.gender
            height = demoAccount.height
            weight = demoAccount.weight
            dieting_status = demoAccount.dieting_status
        }
        const styles = ReactCSS(
            {
                'default': {
                    container: {
                        backgroundColor: '#e9ecef',
                        marginTop: '20px',
                        padding: '50px',
                        borderRadius: '0.3rem'
                    },
                    label: {
                        width: '50%',
                        paddingLeft: '15px',
                    },
                    header: {
                        marginBottom: "10px"
                    },
                    account_text:{
                        padding:'15px',
                        width: '100%'
                    }

                }
            }
        )
        return (
            <div>
                <Navbar name="profile"/>
                <Container style={styles.container} >
                    <div style={styles.header}>
                        <Row>
                            <Col >
                                <Image
                                    src="https://image.flaticon.com/icons/png/128/848/848043.png"
                                    roundedCircle/>
                            </Col>
                            <Col>
                                <h3>John Doe</h3>
                                <h5>john@milktea.com</h5>
                                <Alert  variant={'info'}>
                                    This is a demo account.
                                </Alert>
                            </Col>
                        </Row>
                    </div>

                    <Row>

                        <h3 style={styles.account_text}>Account</h3>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style={styles.label} className={'lead'}>Username</td>
                                <td style={styles.label}>{userName}</td>
                            </tr>
                            <tr>
                                <td style={styles.label} className={'lead'}>Gender</td>
                                <td style={styles.label}>{gender}</td>
                            </tr>
                            <tr>
                                <td style={styles.label} className={'lead'}>Birthday</td>
                                <td style={styles.label}>{birthday}</td>
                            </tr>
                            <tr>
                                <td style={styles.label} className={'lead'}>Height</td>
                                <td style={styles.label}>{height}</td>
                            </tr>
                            <tr>
                                <td style={styles.label} className={'lead'}>Weight</td>
                                <td style={styles.label}>{weight}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Profile;
