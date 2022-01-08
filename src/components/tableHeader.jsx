import React from "react";
import PropTypes from "prop-types";
import Caret from "./caret";

const TableHeader = ({ onSort, caret, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => {
                    return (
                        <th
                            key={column}
                            onClick={
                                columns[column].path
                                    ? () => handleSort(columns[column].path)
                                    : undefined
                            }
                            scope="col"
                            {...{ role: columns[column].path && "button" }}
                        >
                            {columns[column].name}
                            {caret.selectedPath === columns[column].path && (
                                <Caret {...{ status: caret.status }} />
                            )}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    caret: PropTypes.object.isRequired
};

export default TableHeader;
