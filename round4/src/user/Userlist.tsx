import React from 'react';
import { UserPayload } from '../store/userSlice';

interface ChildProps {
  userData: UserPayload
}

const userlist = ({userData}:ChildProps) => {
  return (
    <div>
      <p>{userData.email}</p>
      <p>{userData.expiresIn}</p>
      <p>{userData.idToken}</p>
    </div>
  );
};

export default userlist;