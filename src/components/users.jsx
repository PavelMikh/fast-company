import React from 'react';
import User from './user';

const Users = (props) => {
  const {users, bookmarks} = props;

  const getTableHead = () => (
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Избранное</th>
        <th scope="col"></th>
      </tr>
    </thead>
  );

  const getBookmarkById = (id) => {
    return bookmarks.filter(bookmark => bookmark.id === id)[0];
  }

  const getTableBody = () => (
    <tbody>
      {
        users.map(user => (
          <User 
            key={user._id}
            user={user}
            bookmark={getBookmarkById(user._id)}
            onRemove={props.onRemove}
            onBookmarkClick={props.onBookmarkClick}
          />
        ))
      }     
    </tbody>
  );

  const getUsersTable = (number) => {
    return (
      <table className="table">
        {getTableHead()}
        {getTableBody()}
      </table>
    );
  };

  return getUsersTable(users.length)
}

export default Users;