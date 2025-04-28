//data format
  //         {username,
  //         avatar: null,
  //         joinDate: 'January 2022',
  //         rank: '145,678',
  //         problemStats: {
  //           total: 2390,
  //           solved: 387,
  //           easy: 150,
  //           medium: 200,
  //           hard: 37
  //         },
  //         streak: {
  //           current: 12,
  //           longest: 30,
  //           lastWeek: [true, true, false, true, true, false, true]
  //         },
  //         stats: {
  //           acceptanceRate: 65.2,
  //           submissions: 768,
  //           accepted: 501,
  //           contestRating: 1578,
  //           contestsAttended: 12,
  //           solutions: 24,
  //           reputation: 350,
  //           views: 1243
  //         }
  //       }
// Fetch user profile from local API
export const getUserProfile = async (username) => {

  const baseUrl = "https://leet-metric-jet.vercel.app/"
  
  try {
    const response = await fetch(`${baseUrl}/api/profile/${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
