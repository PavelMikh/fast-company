import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ data, onBookmarkClick }) => {
    return (
        <button
            className="btn btn-outline-secondary"
            onClick={() => onBookmarkClick(data.id)}
        >
            <i className={data.type}></i>
        </button>
    );
};

Bookmark.propTypes = {
    data: PropTypes.object.isRequired,
    onBookmarkClick: PropTypes.func.isRequired
};

export default Bookmark;
