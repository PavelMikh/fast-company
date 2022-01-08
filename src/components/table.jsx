import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, caret, selectedSort, columns, users, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader
                        {...{ onSort, caret, selectedSort, columns }}
                    />
                    <TableBody {...{ data: users, columns }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func.isRequired,
    caret: PropTypes.object.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    children: PropTypes.array
};

export default Table;
