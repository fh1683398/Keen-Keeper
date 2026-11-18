// src/components/Friends/FriendDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { addCheckIn } from '../../utils/checkInStorage';

const statusStyles = {
  overdue: 'bg-[#DC2626] text-white',
  'almost due': 'bg-[#F59E0B] text-white',
  'almost-due': 'bg-[#F59E0B] text-white',
  'on-track': 'bg-[#234636] text-white',
};

const statusLabels = {
  overdue: 'Overdue',
  'almost due': 'Almost Due',
  'almost-due': 'Almost Due',
  'on-track': 'On-Track',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const FriendDetails = ({
  friend: friendProp,
  onSnooze,
  onArchive,
  onDelete,
  onEditGoal,
}) => {
  const { id } = useParams();
  const [friend, setFriend] = useState(friendProp || null);

  useEffect(() => {
    if (friendProp) {
      setFriend(friendProp);
      return;
    }

    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        const found = id
          ? data.find((item) => String(item.id) === String(id))
          : data[0];
        setFriend(found || null);
      })
      .catch((err) => console.error('Failed to load friend details:', err));
  }, [id, friendProp]);

  const handleCheckIn = (type) => {
    if (!friend) return;

    addCheckIn({
      id: crypto.randomUUID(),
      friendId: friend.id,
      friendName: friend.name,
      friendPicture: friend.picture,
      type,
      timestamp: new Date().toISOString(),
    });

    toast.success(`Logged ${type} with ${friend.name}`);
  };

  if (!friend) {
    return (
      <section className="w-full bg-[#F7F9F9] py-12">
        <div className="max-w-[1110px] mx-auto px-4 sm:px-6 text-center text-sm text-slate-500">
          Loading friend details...
        </div>
      </section>
    );
  }

  const {
    name,
    picture,
    email,
    days_since_contact,
    status,
    tags = [],
    bio,
    goal,
    next_due_date,
  } = friend;

  return (
    <section className="w-full bg-[#F7F9F9] py-8 sm:py-12">
      <div className="max-w-[1110px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-3">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.035)] p-7 flex flex-col items-center text-center">
              <img
                src={picture}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border border-slate-200"
              />

              <h1 className="mt-4 text-lg font-bold text-[#1B2631]">
                {name}
              </h1>

              <span
                className={`mt-2.5 text-[11px] font-semibold px-3 py-1 rounded-full ${
                  statusStyles[status] || 'bg-slate-200 text-slate-700'
                }`}
              >
                {statusLabels[status] || status}
              </span>

              <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#DCFCE7] text-[#166534] text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {bio && (
                <p className="mt-3.5 text-xs sm:text-[13px] italic text-slate-600 leading-relaxed">
                  “{bio}”
                </p>
              )}

              {email && (
                <p className="mt-2 text-xs text-slate-400">
                  Preferred: {email}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              onClick={() => onSnooze?.(friend)}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#1B2631] shadow-[0_1px_4px_rgba(15,23,42,0.02)] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Snooze 2 Weeks</span>
            </button>

            <button
              type="button"
              onClick={() => onArchive?.(friend)}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#1B2631] shadow-[0_1px_4px_rgba(15,23,42,0.02)] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M5 7v11a2 2 0 002 2h10a2 2 0 002-2V7M10 12h4" />
              </svg>
              <span>Archive</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete?.(friend)}
              className="w-full bg-white hover:bg-red-50/60 border border-slate-200/90 rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#EF4444] shadow-[0_1px_4px_rgba(15,23,42,0.02)] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
              </svg>
              <span>Delete</span>
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-5">
            {/* Top 3 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.035)] py-7 px-5 text-center">
                <div className="text-2xl sm:text-[28px] font-bold text-[#234636] leading-none">
                  {days_since_contact}
                </div>
                <div className="mt-2.5 text-xs sm:text-sm text-[#64748B]">
                  Days Since Contact
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.035)] py-7 px-5 text-center">
                <div className="text-2xl sm:text-[28px] font-bold text-[#234636] leading-none">
                  {goal}
                </div>
                <div className="mt-2.5 text-xs sm:text-sm text-[#64748B]">
                  Goal (Days)
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.035)] py-7 px-5 text-center">
                <div className="text-2xl sm:text-[28px] font-bold text-[#234636] leading-none">
                  {formatDate(next_due_date)}
                </div>
                <div className="mt-2.5 text-xs sm:text-sm text-[#64748B]">
                  Next Due
                </div>
              </div>
            </div>

            {/* Relationship Goal Card */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.035)] p-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#234636]">
                  Relationship Goal
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-500">
                  Connect every <span className="font-bold text-[#1B2631]">{goal} days</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onEditGoal?.(friend)}
                className="bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-[#1B2631] text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* Quick Check-In Card */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.035)] p-6">
              <h2 className="text-base font-bold text-[#234636]">
                Quick Check-In
              </h2>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => handleCheckIn('call')}
                  className="bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-lg py-5 px-4 flex flex-col items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#1B2631] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 text-[#1B2631]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
                  </svg>
                  <span>Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCheckIn('text')}
                  className="bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-lg py-5 px-4 flex flex-col items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#1B2631] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 text-[#1B2631]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Text</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCheckIn('video')}
                  className="bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/80 rounded-lg py-5 px-4 flex flex-col items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#1B2631] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 text-[#1B2631]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendDetails;