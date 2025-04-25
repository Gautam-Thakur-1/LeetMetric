import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const transformLeetCodeData = (rawData) => {
  const user = rawData.data.matchedUser;

  if (!user) return null;

  const profile = user.profile;
  const acData = user.submitStats.acSubmissionNum;
  const totalSubmissions = user.submitStats.totalSubmissionNum;

  const getDifficultyCount = (difficulty) =>
    acData.find(d => d.difficulty.toLowerCase() === difficulty)?.count || 0;

  const accepted = acData.find(d => d.difficulty === 'All')?.count || 0;
  const total = totalSubmissions[0]?.submissions || 0;

  const calendarObj = JSON.parse(user.userCalendar.submissionCalendar || '{}');
  const sortedTimestamps = Object.keys(calendarObj).map(Number).sort();
  const lastWeek = sortedTimestamps
    .slice(-7)
    .map(ts => calendarObj[ts] > 0);

  const transformed = {
    username: user.username,
    avatar: profile.userAvatar || null,
    joinDate: null, // Not available
    rank: profile.ranking?.toLocaleString() ?? null,
    problemStats: {
      total,
      solved: accepted,
      easy: getDifficultyCount('easy'),
      medium: getDifficultyCount('medium'),
      hard: getDifficultyCount('hard')
    },
    streak: {
      current: null,
      longest: null,
      lastWeek
    },
    stats: {
      acceptanceRate: total ? (accepted / total * 100).toFixed(1) : null,
      submissions: total,
      accepted,
      contestRating: null,
      contestsAttended: null,
      solutions: null,
      reputation: profile.reputation ?? 0,
      views: null
    }
  };

  return transformed;
};

router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const leetCodeAPI = 'https://leetcode.com/graphql';
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
      }
    `;

    const response = await fetch(leetCodeAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (!data.data.matchedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const transformedProfile = transformLeetCodeData(data);
    console.log(transformLeetCodeData)
    res.json(transformedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch LeetCode profile' });
  }
});

export default router;