import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "9vxelmrGYL";

interface LeetCodeUser {
  username: string;
  profile: {
    userAvatar: string;
    realName: string;
    aboutMe: string;
    ranking: number;
    reputation: number;
    contestsCount: number;
    contestRating: number;
    globalRanking: number;
  };
  submitStats: {
    acSubmissionNum: Array<{ difficulty: string; count: number; submissions: number }>;
    totalSubmissionNum: Array<{ difficulty: string; count: number; submissions: number }>;
  };
  languageProblemCount: Array<{ languageName: string; problemsSolved: number }>;
  userCalendar: { streak: number; totalActiveDays: number };
}

interface LeetCodeResponse {
  matchedUser: LeetCodeUser | null;
  recentAcSubmissionList: Array<{ id: string; title: string; titleSlug: string; timestamp: number }>;
  errors?: Array<{ message: string }>;
}

const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        userAvatar
        realName
        aboutMe
        ranking
        reputation
        contestsCount
        contestRating
        globalRanking
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      languageProblemCount {
        languageName
        problemsSolved
      }
      userCalendar {
        streak
        totalActiveDays
      }
    }
    recentAcSubmissionList(username: $username, limit: 15) {
      id
      title
      titleSlug
      timestamp
    }
  }
`;

async function fetchLeetCodeStats(): Promise<LeetCodeResponse> {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
      "Referer": `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
    },
    body: JSON.stringify({
      query: LEETCODE_GRAPHQL_QUERY,
      variables: { username: LEETCODE_USERNAME },
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API responded with ${response.status}`);
  }

  const data: LeetCodeResponse = await response.json();

  if (data.errors) {
    throw new Error(data.errors.map((e) => e.message).join(", "));
  }

  return data;
}

function processLeetCodeData(data: LeetCodeResponse) {
  const user = data.matchedUser;
  if (!user) {
    throw new Error("User not found");
  }

  const submissions = user.submitStats?.acSubmissionNum || [];
  const totalSubmissions = user.submitStats?.totalSubmissionNum || [];

  const getCount = (difficulty: string) => {
    const found = submissions.find((s) => s.difficulty === difficulty);
    return found?.count || 0;
  };

  const getTotal = (difficulty: string) => {
    const found = totalSubmissions.find((s) => s.difficulty === difficulty);
    return found?.count || 0;
  };

  const easySolved = getCount("Easy");
  const mediumSolved = getCount("Medium");
  const hardSolved = getCount("Hard");
  const totalSolved = getCount("All");

  const easyTotal = getTotal("Easy");
  const mediumTotal = getTotal("Medium");
  const hardTotal = getTotal("Hard");
  const totalQuestions = getTotal("All");

  const acceptanceRate = totalQuestions > 0
    ? parseFloat(((totalSolved / totalQuestions) * 100).toFixed(1))
    : 0;

  const languageStats = user.languageProblemCount
    ? user.languageProblemCount.map((lang) => ({
        languageName: lang.languageName,
        problemsSolved: lang.problemsSolved,
      }))
    : [];

  const streak = user.userCalendar?.streak || 0;
  const contestRating = user.profile?.contestRating || 0;
  const ranking = user.profile?.globalRanking || user.profile?.ranking || 0;

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalQuestions,
    easyQuestions: easyTotal,
    mediumQuestions: mediumTotal,
    hardQuestions: hardTotal,
    acceptanceRate,
    ranking,
    contestRating,
    streak,
    languageStats,
    profile: {
      avatar: user.profile?.userAvatar,
      realName: user.profile?.realName,
      aboutMe: user.profile?.aboutMe,
      reputation: user.profile?.reputation,
    },
  };
}

export async function GET() {
  try {
    const data = await fetchLeetCodeStats();
    const stats = processLeetCodeData(data);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to load live LeetCode statistics",
      },
      { status: 503 }
    );
  }
}