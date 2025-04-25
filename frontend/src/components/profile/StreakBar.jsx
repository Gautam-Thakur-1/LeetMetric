import React, { useRef } from 'react';
import { format, eachDayOfInterval, subDays, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const StreakBar = ({ streak }) => {
  const scrollContainerRef = useRef(null);
  const { current, longest, submissions = 221, totalActiveDays = 80 } = streak;
  
  const today = startOfDay(new Date());
  const yearAgo = subDays(today, 365);
  const dates = eachDayOfInterval({ start: yearAgo, end: today });
  
  const mockSubmissions = dates.map(date => ({
    date: format(date, 'yyyy-MM-dd'),
    count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0
  }));

  const getSubmissionColor = (count) => {
    if (count === 0) return 'bg-[#1b1f23]';
    if (count <= 1) return 'bg-[#0e4429]';
    if (count <= 3) return 'bg-[#006d32]';
    if (count <= 5) return 'bg-[#26a641]';
    return 'bg-[#39d353]';
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const weeks = Array.from({ length: 52 }).map((_, weekIndex) => {
    const weekDays = Array.from({ length: 7 }).map((_, dayIndex) => {
      const submissionData = mockSubmissions[weekIndex * 7 + dayIndex];
      return {
        date: submissionData?.date,
        count: submissionData?.count || 0
      };
    });
    return weekDays;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-900">
          Contributions
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{submissions} total</span>
          <span>{totalActiveDays} active days</span>
          <div className="flex items-center gap-2">
            <span>Current streak:</span>
            <span className="font-semibold text-emerald-600">{current} days</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Longest streak:</span>
            <span className="font-semibold text-emerald-600">{longest} days</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="inline-flex gap-1 p-4 min-w-full">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`h-3 w-3 rounded-sm ${getSubmissionColor(day.count)} transition-all hover:scale-125`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};