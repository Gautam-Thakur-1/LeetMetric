import express from 'express';
import fetch from 'node-fetch';
import { OpenAI } from 'openai';

const router = express.Router();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const leetCodeAPI = 'https://leetcode.com/graphql';
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
            starRating
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

    const { matchedUser } = data.data;
    const stats = matchedUser.submitStats.acSubmissionNum.reduce((acc, curr) => {
      acc[curr.difficulty.toLowerCase()] = curr.count;
      return acc;
    }, {});

    const profile = {
      username: matchedUser.username,
      totalSolved: stats.all || 0,
      easySolved: stats.easy || 0,
      mediumSolved: stats.medium || 0,
      hardSolved: stats.hard || 0,
      ranking: matchedUser.profile.ranking,
      reputation: matchedUser.profile.reputation,
      acceptanceRate: ((stats.all / matchedUser.submitStats.acSubmissionNum[0].submissions) * 100).toFixed(1),
    };

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LeetCode profile' });
  }
});

router.post('/analyze', async (req, res) => {
  try {
    const { profile } = req.body;
    
    const prompt = `
      Analyze this LeetCode profile:
      - Total problems solved: ${profile.totalSolved}
      - Easy: ${profile.easySolved}
      - Medium: ${profile.mediumSolved}
      - Hard: ${profile.hardSolved}
      - Acceptance rate: ${profile.acceptanceRate}%
      - Ranking: ${profile.ranking}

      Provide a detailed analysis including:
      1. Current skill level assessment
      2. Areas of strength and improvement
      3. Recommendations for next steps
      4. Suggested problem types to focus on
      Keep the tone encouraging and constructive.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze profile' });
  }
});

export default router;