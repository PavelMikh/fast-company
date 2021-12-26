import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState();
    const [bookmarks, setBookmarks] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
            setBookmarks(data.map((user) => {
                return { id: user._id, type: "bi bi-bookmark" };
            }));
        });
    }, []);

    const toggleBookmark = (id) => {
        const newBookmarkState = bookmarks.map((bookmark) => {
            if (bookmark.id === id) {
                bookmark.type === "bi bi-bookmark"
                    ? (bookmark.type = "bi bi-bookmark-fill")
                    : (bookmark.type = "bi bi-bookmark");
            }

            return bookmark;
        });

        setBookmarks(newBookmarkState);
    };

    const removeUser = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };

    return (
        <>
            {users && bookmarks && (
                <Users
                    users={users}
                    bookmarks={bookmarks}
                    onRemove={removeUser}
                    onBookmarkClick={toggleBookmark}
                />
            )}
        </>
    );
};

export default App;
