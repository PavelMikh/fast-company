import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {
    const {user, bookmark} = props;

    const getQualities = (qualities) => (
        qualities.map(qualitie => (<Qualitie key={qualitie._id} qualitie={qualitie}/>))
    );

    return (
        <tr>
            <td>{user.name}</td>
            <td>{getQualities(user.qualities)}</td>
            <td key={user.profession._id}>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td><Bookmark data={bookmark} onBookmarkClick={props.onBookmarkClick} /></td>
            <td><button type="button" className="btn btn-danger" onClick={() => {props.onRemove(user._id)}}>delete</button></td>
        </tr>
    );
}

export default User;