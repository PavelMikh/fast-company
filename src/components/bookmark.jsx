import React from "react";

const Bookmark = (props) => {
    return <>
        <button className="btn btn-outline-secondary" onClick={props.onToggle}>
            <i className={props.type}></i>
        </button>
    </>
}

export default Bookmark;