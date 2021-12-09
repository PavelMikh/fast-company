import React, {useState} from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const removeUser = (id) => (setUsers(users.filter(user => user._id !== id)));

  const getQualityClasses = (color) => {
    let classes = 'badge m-2 ';
    return classes += 'bg-' + color;
  }

  const getQualities = (qualities) => (
    qualities.map(quality => (<span key={quality._id} className={getQualityClasses(quality.color)}>{quality.name}</span>))
  );

  const getTableHead = () => (
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col"></th>
      </tr>
    </thead>
  );

  const getTableBody = () => (
    <tbody>
      {
        users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{getQualities(user.qualities)}</td>
            <td key={user.profession._id}>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td><button type="button" className="btn btn-danger" onClick={() => {removeUser(user._id)}}>delete</button></td>
          </tr>
        ))
      }     
    </tbody>
  );

  const getUsersTable = (number) => {
    if (number) {
      return <table className="table">
               {getTableHead()}
               {getTableBody()}
             </table>
    }
  };

  const getCounterText = (number) => {
    if (number === 0) {
      return 'Никто с тобой не тусанет.'
    }

    const tempNumber = number % 10;
    if ((number <= 10 || number >= 20) && (tempNumber === 2 || tempNumber === 3 || tempNumber === 4)) {
      return `${number} человека тусанут с тобой сегодня.`;
    }

    return `${number} человек тусанет с тобой сегодня.`;
  }

  const getCounterClasses = (number) => {
    let classes = 'badge  fs-3 '
    return number !== 0 ? classes += 'bg-primary' : classes += 'bg-danger';
  }

  const getUsersCounter = (number) => (<span className={getCounterClasses(number)}>{getCounterText(number)}</span>);

  return <React.Fragment>
    {getUsersCounter(users.length)}
    {getUsersTable(users.length)}
  </React.Fragment>
}

export default Users;