import React from 'react';

export const ProfileStats = ({ stats }) => {
  const statItems = [
    { label: 'Acceptance Rate', value: `${stats.acceptanceRate}%` },
    { label: 'Submissions', value: stats.submissions },
    { label: 'Accepted', value: stats.accepted },
    { label: 'Contest Rating', value: Math.floor(stats.contestRating) },
    { label: 'Contest Attended', value: stats.contestsAttended },
    { label: 'Reputation', value: stats.reputation },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="p-2 bg-gray-50 dark:bg-[#EBD3F8] rounded-lg flex flex-col justify-between  h-24">
          <p className="text-sm font-medium  text-gray-650">{item.label}</p>
          <p className="text-xl font-mono font-semibold  text-gray-900">{item.value}</p>
        </div>
      ))}
  </div>

  );
};  