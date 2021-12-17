import React from "react";

const Qualitie = (props) => {
    const {qualitie} = props;

    const getQualitieClasses = (color) => {
        let classes = 'badge m-2 ';
        return classes += 'bg-' + color;
    }

    return <>
        <span className={getQualitieClasses(qualitie.color)}>{qualitie.name}</span>
    </>
}

export default Qualitie;