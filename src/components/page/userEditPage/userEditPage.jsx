import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import EditForm from "../../ui/editForm";

const UserEditPage = ({ history, urlParam, id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleSubmit = () => {
        const currentPath = history.location.pathname;
        history.replace(`${currentPath}`.replace(`/${urlParam}`, ""));
    };

    return (
        user
            ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <EditForm
                                user={user}
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>
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
