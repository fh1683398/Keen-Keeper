// src/pages/Timeline.jsx
import { useState } from 'react';
import { Link } from 'react-router';
import {getCheckIns} from '../../utils/checkInStorage';

const typeConfig = {
  call: {
    label: 'Call',
    icon: (
      <svg className="w-6 h-6 text-[#475569]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
      </svg>
    ),
  },
  text: {
    label: 'Text',
    icon: (
      <svg className="w-6 h-6 text-[#64748B]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  video: {
    label: 'Video',
    icon: (
      <svg className="w-6 h-6 text-[#475569]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  meetup: {
    label: 'Meetup',
    icon: (
      <svg className="w-6 h-6 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const Timeline = () => {
  const [checkIns] = useState(() => getCheckIns());
  const [filter, setFilter] = useState('all');

  const filteredCheckIns =
    filter === 'all'
      ? checkIns
      : checkIns.filter((item) => item.type === filter);

  return (
    <section className="w-full bg-[#F7F9F9] py-10 sm:py-12">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight text-[#1B2631]">
          Timeline
        </h1>

        {/* Filter Dropdown */}
        <div className="mt-5 relative inline-block">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter timeline"
            className="appearance-none bg-white border border-slate-200/90 rounded-lg pl-4 pr-10 py-2.5 text-xs sm:text-sm text-[#475569] shadow-[0_1px_4px_rgba(15,23,42,0.02)] focus:outline-none focus:border-[#234636] cursor-pointer min-w-[200px]"
          >
            <option value="all">Filter timeline</option>
            <option value="call">Calls</option>
            <option value="text">Texts</option>
            <option value="video">Videos</option>
          </select>
          <svg
            className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Timeline List */}
        {filteredCheckIns.length === 0 ? (
          <div className="mt-6 bg-white rounded-lg border border-slate-200/70 p-10 text-center">
            <p className="text-sm font-medium text-[#1B2631]">
              {checkIns.length === 0
                ? 'No check-ins logged yet.'
                : `No ${filter} check-ins found.`}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Open any friend’s profile and click Call, Text, or Video to log an interaction.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {filteredCheckIns.map((item) => {
              const config = typeConfig[item.type] || typeConfig.call;

              return (
                <Link
                  key={item.id}
                  to={`/friends/${item.friendId}`}
                  className="bg-white hover:bg-slate-50/80 rounded-lg border border-slate-200/70 shadow-[0_1px_4px_rgba(15,23,42,0.02)] px-5 py-4 flex items-center gap-4 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {config.icon}
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-[#475569]">
                      <span className="font-bold text-[#234636]">
                        {config.label}
                      </span>{' '}
                      with{' '}
                      <span className="font-medium text-[#1B2631]">
                        {item.friendName}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[11px] sm:text-xs text-[#64748B]">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;