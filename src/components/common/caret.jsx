import React from "react";
import PropTypes from "prop-types";

const Caret = ({ status }) => {
    return (
        <i className={"bi bi-caret-" + (status ? "down" : "up") + "-fill"}></i>
    );
};

Caret.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Caret;
