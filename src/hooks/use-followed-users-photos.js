import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';

const useFollowedUsersPhotos = () => {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {};
    getTimelinePhotos();
  }, [userId]);

  return { photos };
};

export default useFollowedUsersPhotos;
