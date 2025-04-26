import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const transformLeetCodeData = (rawData) => {
  const user = rawData.data.matchedUser;
  const questions = rawData.data.allQuestionsCount;
  const contestData = rawData.data.userContestRanking;

  if (!user) return null;

  const profile = user.profile;
  const acData = user.submitStats.acSubmissionNum;
  const totalSubmissions = user.submitStats.totalSubmissionNum;

  const getDifficultyCount = (difficulty) =>
    acData.find((d) => d.difficulty.toLowerCase() === difficulty)?.count || 0;

  const getTotalQuestionsByDifficulty = (difficulty) =>
    questions.find((q) => q.difficulty.toLowerCase() === difficulty)?.count ||
    0;

  const accepted = acData.find((d) => d.difficulty === "All")?.count || 0;
  const total = totalSubmissions[0]?.submissions || 0;

  const calendarObj = JSON.parse(user.userCalendar.submissionCalendar || "{}");
  const sortedTimestamps = Object.keys(calendarObj).map(Number).sort();
  const lastWeek = sortedTimestamps.slice(-7).map((ts) => calendarObj[ts] > 0);

  return {
    username: user.username,
    avatar: profile.userAvatar || null,
    joinDate: null, // Not available
    rank: profile.ranking?.toLocaleString() ?? null,
    problemStats: {
      totalSubmissions: total,
      solved: accepted,
      easy: getDifficultyCount("easy"),
      medium: getDifficultyCount("medium"),
      hard: getDifficultyCount("hard"),
      totalEasy: getTotalQuestionsByDifficulty("easy"),
      totalMedium: getTotalQuestionsByDifficulty("medium"),
      totalHard: getTotalQuestionsByDifficulty("hard"),
      totalQuestions:
        getTotalQuestionsByDifficulty("easy") +
        getTotalQuestionsByDifficulty("medium") +
        getTotalQuestionsByDifficulty("hard"),
    },
    streak: {
      current: null,
      longest: null,
      lastWeek,
    },
    stats: {
      acceptanceRate: total ? ((accepted / total) * 100).toFixed(1) : null,
      submissions: total,
      accepted,
      contestRating: contestData?.rating ?? null,
      contestsAttended: contestData?.attendedContestsCount ?? null,
      solutions: null,
      reputation: profile.reputation ?? 0,
      views: null,
    },
  };
};

const getStreakCalendar = (calendarJSON, daysBack = 365) => {
  const calendarObj = JSON.parse(calendarJSON || "{}");
  const now = new Date();
  const streakData = [];

  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const timestamp = Math.floor(date.setUTCHours(0, 0, 0, 0) / 1000);
    const count = calendarObj[timestamp] || 0;

    streakData.push({
      date: date.toISOString().slice(0, 10),
      count,
    });
  }

  const activeDays = streakData.filter((d) => d.count > 0).length;

  return { streakData, activeDays };
};

router.get("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const leetCodeAPI = "https://leetcode.com/graphql";
    const query = `
    query getUserDashboardData($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          userAvatar
          reputation
          ranking
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            submissions
          }
        }
        userCalendar {
          submissionCalendar
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
    }
  `;

    const response = await fetch(leetCodeAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (!data.data.matchedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const transformedProfile = transformLeetCodeData(data);
    console.log(transformLeetCodeData);
    res.json(transformedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch LeetCode profile" });
  }
});

router.get("/profile/:username/streak", async (req, res) => {
  try {
    const { username } = req.params;
    const leetCodeAPI = "https://leetcode.com/graphql";

    const query = `
      query getUserSubmissionCalendar($username: String!) {
        matchedUser(username: $username) {
          username
          userCalendar {
            submissionCalendar
          }
        }
      }
    `;

    const response = await fetch(leetCodeAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (!data.data.matchedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const calendarJSON = data.data.matchedUser.userCalendar.submissionCalendar;
    const { streakData, activeDays } = getStreakCalendar(calendarJSON);

    res.json({
      username,
      activeDays,
      calendar: streakData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch streak data" });
  }
});

export default router;
