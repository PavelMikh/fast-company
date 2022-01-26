import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, value, onChange, name, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    className={getInputClasses()}
                />
                {
                    type === "password" &&
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
                    </button>
                }
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string
};

export default TextField;
