import React, {useState} from "react";
import api from './api';
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [bookmarks, setBookmarks] = useState(
        users.map(user => {
            return {id: user._id, type: 'bi bi-bookmark'};
        })
    );

    const toggleBookmark = (id) => {
        const newBookmarkState = bookmarks.map(bookmark => {
            if (bookmark.id === id) {
                bookmark.type === 'bi bi-bookmark'
                        ? bookmark.type = 'bi bi-bookmark-fill'
                        : bookmark.type = 'bi bi-bookmark';
            }

            return bookmark;
        });
        
        setBookmarks(newBookmarkState);
    }

    const removeUser = (id) => {
        setUsers(users.filter(user => user._id !== id));
    }

    const renderApp = () => {
        if (!users.length) {
            return <SearchStatus users={users} />
        }

        return (
            <>
                <SearchStatus users={users} />
                <Users users={users} bookmarks={bookmarks} onRemove={removeUser} onBookmarkClick={toggleBookmark} />
            </>
        );
    }

    return renderApp();
}

export default App;