import React from "react";

const SearchStatus = (props) => {
    const {users} = props;

    const getCounterClasses = (number) => {
        let classes = 'badge  fs-3 '
        return number !== 0 ? classes += 'bg-primary' : classes += 'bg-danger';
      }

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

      const getUsersCounter = (number) => (<span className={getCounterClasses(number)}>{getCounterText(number)}</span>);

    return <>
        {getUsersCounter(users.length)}
    </>
}

export default SearchStatus;