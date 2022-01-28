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
                    ? <UserEditPage
                        history={history}
                        urlParam={edit}
                        id={userId}
                    />
                    : <UserPage id={userId} />)
                : <UsersList />}
        </>
    );
};

export default Users;
