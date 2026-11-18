import { useEffect, useState } from 'react';
import FriendCard from './FriendCard';

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        setFriends(data);
      })
  }, []);

  return (
    <div className="pt-10 pb-20">
      <h3 className='text-2xl font-bold text-[#1B2631] mb-4'>Your Friends</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        {friends.map(friend => <FriendCard key={friend.id} friend={friend}></FriendCard>)}
      </div>
    </div>
  );
};

export default Friends;