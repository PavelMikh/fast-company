import React from "react";
import PropTypes from "prop-types";

const Search = ({ value, onChange }) => {
    return (
        <form>
            <input
                type="text"
                className="mb-4 p-1 w-100"
                placeholder="Поиск по имени"
                value={value}
                onInput={({ target }) => onChange(target.value)}
                name="search"
            />
        </form>
    );
};

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Search;
