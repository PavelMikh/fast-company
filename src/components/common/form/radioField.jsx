import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, label, onChange, value }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <div>
                <label className="form-label">{label}</label>
            </div>
            {options.map((option) => {
                return (
                    <div key={option.name + "_" + option.value} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + "_" + option.value}
                            value={option.value}
                            checked={value === option.value}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default RadioField;
