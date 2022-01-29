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

    const getInitialValue = () => {
        const data = {
            email: "",
            profession: "",
            sex: "male",
            qualities: []
        };
        const initialValue = Object.keys(data).reduce((acc, keyName) => {
            const isContain = Object.prototype.hasOwnProperty.call(user, keyName);
            if (isContain) {
                if (keyName === "profession") {
                    acc[keyName] = user[keyName]._id;
                    return acc;
                }

                if (keyName === "qualities") {
                    acc[keyName] = user[keyName].map((prop) => {
                        return { label: prop.name, value: prop._id };
                    });
                    return acc;
                }

                acc[keyName] = user[keyName];
            }
            return acc;
        }, {});

        return initialValue;
    };

    return (
        user
            ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <EditForm
                                initialValue={getInitialValue()}
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
