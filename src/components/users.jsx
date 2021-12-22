import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = (props) => {
    const { users, bookmarks } = props;
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const userCrop = paginate(users, currentPage, pageSize);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const getTableHead = () => (
        <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
            </tr>
        </thead>
    );

    const getBookmarkById = (id) => {
        return bookmarks.filter((bookmark) => bookmark.id === id)[0];
    };

    const getTableBody = () => (
        <tbody>
            {userCrop.map((user) => (
                <User
                    key={user._id}
                    user={user}
                    bookmark={getBookmarkById(user._id)}
                    onRemove={props.onRemove}
                    onBookmarkClick={props.onBookmarkClick}
                />
            ))}
        </tbody>
    );

    const getUsersTable = (number) => {
        return (
            <>
                <table className="table">
                    {getTableHead()}
                    {getTableBody()}
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    };

    return getUsersTable(count);
};

export default Users;
