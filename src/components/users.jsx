import React from 'react';
import User from './user';

const Users = (props) => {
  const {users} = props;

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

  const getTableBody = () => (
    <tbody>
      {
        users.map(user => (
          <User key={user._id} user={user} onRemove={props.onRemove} />
        ))
      }     
    </tbody>
  );

  const getUsersTable = (number) => {
    if (number) {
      return (
        <table className="table">
          {getTableHead()}
          {getTableBody()}
        </table>
      );
    }
  };

  return getUsersTable(users.length)
}

export default Users;