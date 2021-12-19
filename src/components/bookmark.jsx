import React from "react";

const Bookmark = (props) => {
    const {data} = props;

    return (
        <button className="btn btn-outline-secondary" onClick={() => props.onBookmarkClick(data.id)}>
            <i className={data.type}></i>
        </button>
    );
        
}

export default Bookmark;