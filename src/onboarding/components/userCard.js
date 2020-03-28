import React from 'react';
import '../styles/styles.css';

const UserCard = React.memo(props => {
  const { accountId, age, firstName, lastName } = props['item'];
  return (
    <div className="card" key={accountId}>
      <img
        src={require('../../assests/img_avatar2.png')}
        alt="Avatar"
        className="card-img"
      />
      <div className="container">
        <h4>
          <b>{`${firstName} ${lastName} `}</b>
        </h4>
        <p>{`Age: ${age} `}</p>
      </div>
    </div>
  );
});

export default UserCard;
