// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Banner from '../components/Banner/Banner';
import Friends from '../components/Friends/Friends';
import { getCheckIns } from '../utils/checkInStorage';

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const checkIns = getCheckIns();

  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error('Failed to fetch friends:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === 'on-track').length;
  const needAttention = friends.filter(
    (f) => f.status === 'overdue' || f.status === 'almost due'
  ).length;

  const interactionsThisMonth = checkIns.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="bg-[#F7F9F9]">
      <div className="max-w-[1110px] mx-auto px-4 lg:px-0">
        <Banner
          totalFriends={totalFriends}
          onTrack={onTrack}
          needAttention={needAttention}
          interactionsThisMonth={interactionsThisMonth}
        />

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-4 border-slate-200 border-t-[#234636] rounded-full animate-spin" />
            <p className="text-xs sm:text-sm text-[#64748B]">
              Loading your friends...
            </p>
          </div>
        ) : (
          <Friends friends={friends} />
        )}
      </div>
    </div>
  );
};

export default Home;