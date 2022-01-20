import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import api from "../api";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UsersTable from "../components/usersTable";
import _ from "lodash";
import { useParams, useHistory, useLocation } from "react-router-dom";
import UserPage from "../components/userPage";
import Search from "../components/search";

const Users = () => {
    const pageSize = 8;
    const params = useParams();
    const { userId } = params;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [caret, setCaret] = useState();
    const [users, setUsers] = useState();
    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery().get("search");
    console.log("query params: ", query);

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (searchValue) {
            searchParams.append("search", searchValue);
        } else {
            searchParams.delete("search");
        }

        history.push({ search: searchParams.toString() });
    }, [searchValue, history]);

    useEffect(() => {
        setCaret({ selectedPath: sortBy.path, status: sortBy.order === "asc" });
    }, [sortBy]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    if (userId) {
        return <UserPage id={userId} />;
    }

    if (users) {
        let filteredUsers;

        if (selectedProf) {
            filteredUsers = users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            );
        } else if (query) {
            filteredUsers = users.filter(
                (user) => user.name.toLowerCase().includes(query)
            );
        } else {
            filteredUsers = users;
        }

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <Search value={searchValue} onChange={handleSearchChange} />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            caret={caret}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    }
    return "loading...";
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
