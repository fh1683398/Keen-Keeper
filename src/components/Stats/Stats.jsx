// src/pages/Stats.jsx
import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getCheckIns } from '../../utils/checkInStorage';

const Stats = () => {
  const [checkIns] = useState(() => getCheckIns());

  const textCount = checkIns.filter((item) => item.type === 'text').length;
  const callCount = checkIns.filter((item) => item.type === 'call').length;
  const videoCount = checkIns.filter((item) => item.type === 'video').length;

  const data = [
    { name: 'Text', value: textCount, color: '#7C3AED' },
    { name: 'Call', value: callCount, color: '#234636' },
    { name: 'Video', value: videoCount, color: '#2E9E5B' },
  ];

  const total = checkIns.length;

  return (
    <section className="w-full bg-[#F7F9F9] py-10 sm:py-12">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight text-[#1B2631]">
          Friendship Analytics
        </h1>

        <div className="mt-6 bg-white rounded-xl border border-slate-200/70 shadow-[0_2px_12px_rgba(15,23,42,0.03)] p-6 sm:p-8">
          <h2 className="text-sm sm:text-base font-bold text-[#234636]">
            By Interaction Type
          </h2>

          {total === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-[#1B2631]">
                No interaction data yet.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Log a Call, Text, or Video from any friend’s profile to see your breakdown.
              </p>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center">
              <div className="w-full max-w-[300px] h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={88}
                      paddingAngle={5}
                      cornerRadius={6}
                      stroke="none"
                    >
                      {data.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} check-ins`, name]}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend matching the design */}
              <div className="mt-2 flex items-center justify-center gap-6">
                {data.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-1.5 text-xs text-[#64748B]"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Stats;