import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, name, value, onChange, error, options, defaultOption }) => {
    const optionsArray = (!Array.isArray(options) && typeof options === "object")
        ? Object.keys(options).map((optionName) => {
            return { _id: options[optionName]._id, name: options[optionName].name };
        })
        : options;

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                error={error}
            >
                <option disabled value="">{defaultOption}</option>
                {
                    optionsArray &&
                        optionsArray.map((option) => {
                            return (
                                <option
                                    value={option._id}
                                    key={option._id}
                                >
                                    {option.name}
                                </option>
                            );
                        })
                }
            </select>
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    defaultOption: PropTypes.string
};

export default SelectField;
