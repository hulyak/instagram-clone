import React from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUsersPhotos from '../hooks/use-followed-users-photos';

const Timeline = () => {
  const { photos } = useFollowedUsersPhotos();
  return (
    <div className='container col-span-2'>
      {photos ? (
        photos.map((photo) => <p>I am a photo</p>)
      ) : (
        <Skeleton count={4} width={640} height={500} className='mb-5' />
      )}
      <p>I am a timeline</p>
    </div>
  );
};

export default Timeline;
