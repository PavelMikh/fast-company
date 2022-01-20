import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Search = ({ value, onChange }) => {
    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (value) {
            searchParams.append("search", value);
        } else {
            searchParams.delete("search");
        }

        history.push({ search: searchParams.toString() });
    }, [value]);

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
