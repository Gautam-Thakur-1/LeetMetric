import React from 'react';

export const DifficultyChart = ({ easy, medium, hard }) => {
  const total = easy + medium + hard || 1;
  
  const easyPercent = Math.round((easy / total) * 100);
  const mediumPercent = Math.round((medium / total) * 100);
  const hardPercent = Math.round((hard / total) * 100);

  return (
    <div className="space-y-4">
      <div className="flex h-10  rounded-md overflow-hidden">
        {easy > 0 && (
          <div 
            className="bg-emerald-500 flex items-center justify-center text-xs font-medium text-white transition-all duration-300 hover:brightness-110"
            style={{ width: `${easyPercent}%` }}
            title={`Easy: ${easy} problems (${easyPercent}%)`}
          >
            {easyPercent >= 10 && `${easyPercent}%`}
          </div>
        )}
        {medium > 0 && (
          <div 
            className="bg-amber-500 flex items-center justify-center text-xs font-medium text-white transition-all duration-300 hover:brightness-110"
            style={{ width: `${mediumPercent}%` }}
            title={`Medium: ${medium} problems (${mediumPercent}%)`}
          >
            {mediumPercent >= 10 && `${mediumPercent}%`}
          </div>
        )}
        {hard > 0 && (
          <div 
            className="bg-rose-500 flex items-center justify-center text-xs font-medium text-white transition-all duration-300 hover:brightness-110"
            style={{ width: `${hardPercent}%` }}
            title={`Hard: ${hard} problems (${hardPercent}%)`}
          >
            {hardPercent >= 10 && `${hardPercent}%`}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1"> 
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-sm mr-2"></div>
            <span className="text-sm font-medium dark:text-white text-gray-700">Easy</span>
          </div>
          <p className="text-2xl font-semibold dark:text-white text-gray-900">{easy}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-500 rounded-sm mr-2"></div>
            <span className="text-sm font-medium dark:text-white text-gray-700">Medium</span>
          </div>
          <p className="text-2xl font-semibold dark:text-white text-gray-900">{medium}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-rose-500 rounded-sm mr-2"></div>
            <span className="text-sm font-medium dark:text-white text-gray-700">Hard</span>
          </div>
          <p className="text-2xl font-semibold dark:text-white text-gray-900">{hard}</p>
        </div>
      </div>
    </div>
  );
};  