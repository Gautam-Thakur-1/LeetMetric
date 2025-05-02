import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const UserInputPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/profile/${username}`);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Code2 className="h-10 w-10 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold dark:text-[#EBD3F8] text-gray-900 mb-4">
            <span className='tracking-wider dark:text-[#ffffff] text-indigo-800'>LeetMetric: </span>LeetCode Profile Analyzer
          </h1>
          <p className="dark:text-[#EBD3F8]">
            Enter a LeetCode username to view their stats and progress
          </p>
        </div>

        <Card>  
          <form  onSubmit={handleSubmit} className="hover:scale-105 transition-transform duration-200 p-12 space-y-6">
            <div>
              <label htmlFor="username" className=" dark:text-[#EBD3F8] block text-sm font-medium  text-gray-700 mb-1">
                LeetCode Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                  placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-gray-900
                  transition-all duration-200 ease-in-out"
                placeholder="e.g. Gautam_Thakur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <Button 
              type="submit" 
              isLoading={isLoading}
              className="group w-full dark:bg-[#7A1CAC] dark:text-[#ffffff]"
            >
              <span className="flex items-center justify-center">
                View Profile
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};