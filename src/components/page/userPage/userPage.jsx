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

    const handleButtonClick = () => {
        history.push(`${history.location.pathname}/edit`);
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
            <button onClick={handleButtonClick}>Редактировать данные</button>
        </>
        : <p>Загрузка данных...</p>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
