import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users, bookmarks, onRemove, onBookmarkClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => setSelectedProf();

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
                    onRemove={onRemove}
                    onBookmarkClick={onBookmarkClick}
                />
            ))}
        </tbody>
    );

    const getUsersTable = (number) => {
        return (
            <div className="d-flex justify-content-center">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <table className="table">
                            {getTableHead()}
                            {getTableBody()}
                        </table>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return getUsersTable(count);
};

export default Users;
