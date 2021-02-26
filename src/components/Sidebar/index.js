import React from 'react';
import useUser from '../../hooks/use-user';

const Sidebar = () => {
  // coming from firestore
  const {
    user: { docId, userId, following, username, fullName } = {}, // default for errors
  } = useUser();

  return <div></div>;
};

export default Sidebar;
