import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleToUsersTable = () => {
        history.push("/users");
    };

    return user
        ? <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <div>
                <Qualities qualities={user.qualities} />
            </div>
            <div>Встретился раз: {user.completedMeetings}</div>
            <h2>Оценка: {user.rate}</h2>
            <button onClick={handleToUsersTable}>Все пользователи</button>
        </>
        : "loading user data...";
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
