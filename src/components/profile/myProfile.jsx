import React from "react";
import {Link} from "react-router-dom";
import UserProfile from 'react-user-profile';
import {Button} from "react-bootstrap";

function MyProfile(props) {
    return (
        <div>
            <UserProfile photo={props.photo} userName={props.userName} location={props.location} initialLikesCount={100}
                         initialFollowingCount={200} initialFollowersCount={200}/>
            <div style={{margin: "20px 20px 10px 20px"}}>
                age: {props.birthday}
            </div>
            <div style={{margin: "20px 20px 10px 20px"}}>
                gender: {props.gender}
            </div>
            <div style={{margin: "10px 20px"}}>
                height: {props.height}
            </div>
            <div style={{margin: "10px 20px"}}>
                weight: {props.weight} lbs
            </div>
            <div style={{margin: "10px 20px"}}>
                dieting status: {props.dieting_status}
            </div>
            <div>
                <Link to="/edit">
                    <Button variant="primary">Edit</Button>
                </Link>
            </div>
            <div>
                <Button variant="primary" onClick={props.handleDeletion}>CLose this account</Button>
            </div>
        </div>
    )
}

export default MyProfile;