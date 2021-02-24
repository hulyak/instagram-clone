import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserObjByUserId } from '../services/firebase';

// pull user information
export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // query for the user data in the firestore
      const [response] = await getUserObjByUserId(user.uid);
      setActiveUser({ ...response });
      setActiveUser(); // pass user response to the state of activeUser
    }
    if (user && user.id) {
      getUserObjByUserId();
    }
  }, [user]);

  console.log(activeUser);
  return { user: activeUser }; // return activeUser as user to the hook when called
}
