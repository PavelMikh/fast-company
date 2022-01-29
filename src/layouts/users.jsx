import React from "react";
import { useParams, useHistory } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersList from "../components/page/usersLIstPage";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
    const params = useParams();
    const history = useHistory();
    const { userId, edit } = params;

    return (
        <>
            {userId
                ? (edit
                    ? <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <UserEditPage
                                    history={history}
                                    urlParam={edit}
                                    id={userId}
                                />
                            </div>
                        </div>
                    </div>
                    : <UserPage id={userId} />)
                : <UsersList />}
        </>
    );
};

export default Users;
