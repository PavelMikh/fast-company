import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, bookmark, onRemove, onBookmarkClick }) => {
    const getQualities = (qualities) =>
        qualities.map((qualitie) => (
            <Qualitie key={qualitie._id} qualitie={qualitie} />
        ));

    return (
        <tr>
            <td>{user.name}</td>
            <td>{getQualities(user.qualities)}</td>
            <td key={user.profession._id}>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <Bookmark data={bookmark} onBookmarkClick={onBookmarkClick} />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                        onRemove(user._id);
                    }}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    bookmark: PropTypes.object.isRequired,
    onBookmarkClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default User;
