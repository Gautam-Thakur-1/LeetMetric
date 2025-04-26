import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { DifficultyChart } from "../components/profile/DifficultyChart";
import { StreakBar } from "../components/profile/StreakBar";
import { ProfileStats } from "../components/profile/ProfileStats";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { getUserProfile } from "../utils/mockData";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await getUserProfile(username);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <Card className="text-center max-w-md w-full p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            User Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            We couldn't find a LeetCode profile for "{username}". Please check
            the username and try again.
          </p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Search
      </Button>

      <ProfileHeader userData={userData} />

      <div className="mt-4">
        <Card className="p-6">
          <StreakBar username={username} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Problem Difficulty
          </h2>
          <DifficultyChart
            easy={userData.problemStats.easy}
            medium={userData.problemStats.medium}
            hard={userData.problemStats.hard}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Detailed Statistics
          </h2>
          <ProfileStats stats={userData.stats} />
        </Card>
      </div>
    </div>
  );
};
