import React from 'react';
import { UserPayload } from '../store/userSlice';

interface ChildProps {
  userData: UserPayload
}

const userlist = ({userData}:ChildProps) => {
  return (
    <div>
    </div>
  );
};

export default userlist;