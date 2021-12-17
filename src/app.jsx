import React, {useState} from "react";
import api from './api';
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const removeUser = (id) => {
        setUsers(users.filter(user => user._id !== id));
    }

    return <>
        <SearchStatus users={users} />
        <Users users={users} onRemove={removeUser} />
    </>
}

export default App;