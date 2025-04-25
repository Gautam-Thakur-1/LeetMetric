import React from 'react';
import { User, Award, Calendar } from 'lucide-react';

export const ProfileHeader = ({ userData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      <div className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative -mt-12 rounded-full bg-white p-1 shadow-md">
          {userData.avatar ? (
            <img 
              src={userData.avatar} 
              alt={`${userData.username}'s avatar`}
              className="h-20 w-20 rounded-full"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="h-10 w-10 text-indigo-600" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            {userData.username}
          </h1>
          <div className="flex items-center mt-1 text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Joined {userData.joinDate}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
          <div className="flex items-center px-3 py-1 bg-indigo-50 rounded-full">
            <Award className="h-4 w-4 text-indigo-600 mr-1" />
            <span className="text-sm text-indigo-700 font-medium">
              Rank: {userData.rank}
            </span>
          </div>
          
          <div className="flex items-center px-3 py-1 bg-emerald-50 rounded-full">
            <span className="text-sm text-emerald-700 font-medium">
              Solved: {userData.problemStats.solved}/{userData.problemStats.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};