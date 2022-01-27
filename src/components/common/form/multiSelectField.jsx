import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, options, onChange, name, defaultValue, placeholder }) => {
    const optionsArray = (!Array.isArray(options) && typeof options === "object")
        ? Object.keys(options).map((optionName) => {
            return { value: options[optionName]._id, label: options[optionName].name };
        })
        : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label>{ label }</label>
            <Select
                options={optionsArray}
                onChange={handleChange}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                placeholder={placeholder}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    defaultValue: PropTypes.array,
    placeholder: PropTypes.string
};

export default MultiSelectField;
