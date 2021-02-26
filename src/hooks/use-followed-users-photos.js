import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

const useFollowedUsersPhotos = () => {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const followingUserIds = await getUserByUserId(userId);

      if (followingUserIds && followingUserIds[0].following.length > 0) {
        let followedUserPhotos = await getFollowedPhotos(
          userId,
          followingUserIds[0].following
        );

        // we need to call a function that will get us the photos

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); // newest photos first
        setPhotos(followedUserPhotos);
      }
    };
    getTimelinePhotos();
  }, [userId]);

  return { photos };
};

export default useFollowedUsersPhotos;
