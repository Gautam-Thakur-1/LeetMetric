import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl mb-8">So Sorry! The page you are looking for, does not exist.</p>
      <Button variant="ghost" onClick={() => navigate("/")} className="opacity-80 hover:opacity-100  mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go to HomePage
      </Button>
    </div>
  );
};

export default NotFoundPage;