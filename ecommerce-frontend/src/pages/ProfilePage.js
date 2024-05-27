import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log('User in ProfilePage:', user);
  }, [user]);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default ProfilePage;
