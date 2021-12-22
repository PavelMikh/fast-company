import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ qualitie }) => {
    const getQualitieClasses = (color) => {
        let classes = "badge m-2 ";
        return (classes += "bg-" + color);
    };

    return (
        <span className={getQualitieClasses(qualitie.color)}>
            {qualitie.name}
        </span>
    );
};

Qualitie.propTypes = {
    qualitie: PropTypes.object.isRequired
};

export default Qualitie;
