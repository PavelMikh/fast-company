import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

const UserEditPage = ({ history, urlParam, id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const handleClick = () => {
        const currentPath = history.location.pathname;
        history.replace(`${currentPath}`.replace(`/${urlParam}`, ""));
    };

    return (
        user
            ? (<div>
                <h1>user edit page</h1>
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleClick}
                >
                        Применить изменения
                </button>
            </div>
            ) : (
                <p>Загрузка данных...</p>
            )
    );
};

UserEditPage.propTypes = {
    history: PropTypes.object.isRequired,
    urlParam: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default UserEditPage;
