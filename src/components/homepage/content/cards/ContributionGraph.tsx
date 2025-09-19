'use client';

import { useEffect, useState, useCallback } from 'react';
import { graphql } from '@octokit/graphql';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
  month?: string;
  weekDay?: number;
}

interface GitHubResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: Array<{
          contributionDays: Array<{
            contributionCount: number;
            contributionLevel: string;
            date: string;
          }>;
        }>;
        totalContributions: number;
      };
    };
  };
}

interface ContributionGraphProps {
  username?: string;
  className?: string;
}

// Add a cache to prevent unnecessary API calls
const contributionCache = new Map();

export default function ContributionGraph({ 
  username = 'denverdelamasa', 
  className = '' 
}: ContributionGraphProps) {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const fetchData = useCallback(async () => {
    // Check cache first
    const cacheKey = `contributions-${username}`;
    const cachedData = contributionCache.get(cacheKey);
    
    if (cachedData && (Date.now() - cachedData.timestamp) < 3600000) { // 1 hour cache
      setData(cachedData.data);
      setTotalContributions(cachedData.totalContributions);
      setIsLoading(false);
      calculateStreaks(cachedData.data);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      
      if (!GITHUB_TOKEN) {
        throw new Error('GitHub token not configured');
      }

      const { user } = await graphql<GitHubResponse>(
        `
          query ($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      contributionCount
                      contributionLevel
                      date
                    }
                  }
                  totalContributions
                }
              }
            }
          }
        `,
        {
          username,
          headers: {
            authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );

      const contributionDays = user.contributionsCollection.contributionCalendar.weeks.flatMap(
        week => week.contributionDays
      );

      const mapLevel = (level: string): number => {
        switch (level) {
          case 'NONE': return 0;
          case 'FIRST_QUARTILE': return 1;
          case 'SECOND_QUARTILE': return 2;
          case 'THIRD_QUARTILE': return 3;
          case 'FOURTH_QUARTILE': return 4;
          default: return 0;
        }
      };

      // Add additional metadata for each day
      const contributions: ContributionDay[] = contributionDays.map(day => {
        const date = new Date(day.date);
        return {
          date: day.date,
          count: day.contributionCount,
          level: mapLevel(day.contributionLevel),
          month: date.toLocaleString('default', { month: 'short' }),
          weekDay: date.getDay()
        };
      });

      // Cache the data
      contributionCache.set(cacheKey, {
        data: contributions,
        totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
        timestamp: Date.now()
      });

      setData(contributions);
      setTotalContributions(user.contributionsCollection.contributionCalendar.totalContributions);
      calculateStreaks(contributions);
    } catch (err) {
      console.error('Error fetching GitHub contributions:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching contributions');
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const calculateStreaks = (contributions: ContributionDay[]) => {
    let current = 0;
    let longest = 0;
    let tempLongest = 0;
    
    // Today's date for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Iterate through contributions to calculate streaks
    for (let i = contributions.length - 1; i >= 0; i--) {
      const day = contributions[i];
      const contributionDate = new Date(day.date);
      
      if (day.count > 0) {
        tempLongest++;
        // Check if this is the most recent day with contributions
        if (i === contributions.length - 1) {
          current = 1;
          // Check previous days for current streak
          for (let j = i - 1; j >= 0; j--) {
            if (contributions[j].count > 0) {
              current++;
            } else {
              break;
            }
          }
        }
      } else {
        if (tempLongest > longest) {
          longest = tempLongest;
        }
        tempLongest = 0;
      }
    }
    
    // Check if the last day was part of the longest streak
    if (tempLongest > longest) {
      longest = tempLongest;
    }
    
    setCurrentStreak(current);
    setLongestStreak(longest);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getColor = (level: number): string => {
    switch (level) {
      case 0: return 'bg-[#100f0f]';
      case 1: return 'bg-[#1e1e1e]';
      case 2: return 'bg-green-700/70';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-300';
      default: return 'bg-[#100f0f]';
    }
  };

  const handleDayHover = (day: ContributionDay) => {
    setSelectedDay(day);
  };

  const handleDayClick = (day: ContributionDay) => {
    setSelectedDay(day);
    // On mobile, keep the day selected for a moment to show the tooltip
    setTimeout(() => setSelectedDay(null), 2000);
  };

  // Group data by month for displaying month labels
  const monthLabels = () => {
    const months: {[key: string]: boolean} = {};
    data.forEach(day => {
      if (day.month) {
        months[day.month] = true;
      }
    });
    return Object.keys(months);
  };

  // Get day of week labels
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Skeleton loader for the graph
  if (isLoading) {
    return (
      <div className={`flex flex-col items-center p-4 md:p-6 bg-[#100f0f] rounded-xl shadow-lg ${className}`}>
        <div className="h-6 w-40 bg-[#1e1e1e] rounded mb-4 animate-pulse"></div>
        <div className="flex overflow-auto w-full">
          <div className="flex flex-col justify-between mr-1 md:mr-2 text-xs text-gray-400">
            {dayLabels.map((_, i) => (
              <div key={i} className="h-2 md:h-3 w-4 md:w-6 bg-[#1e1e1e] rounded mb-1 animate-pulse"></div>
            ))}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-0.5 md:gap-1">
            {Array.from({ length: 364 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-sm bg-[#1e1e1e] animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-xs text-gray-400 mr-2">Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-2 h-2 rounded-sm mx-0.5 ${getColor(level)}`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-2">More</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 md:p-6 bg-[#100f0f] rounded-xl shadow-lg ${className}`}>
        <div className="text-red-500 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-12 w-8 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-medium text-white mb-1 text-sm md:text-base">Unable to load contributions</h1>
        <p className="text-xs md:text-sm text-gray-400 text-center mb-4">{error}</p>
        <button
          onClick={() => fetchData()}
          className="px-3 py-1.5 md:px-4 md:py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs md:text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`flex flex-col items-center p-2 md:p-4 ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setSelectedDay(null);
      }}
    >
      <div className="flex justify-between items-start w-full mb-2">
        <h2 className="text-base md:text-lg font-semibold text-white">
          {username}&apos;s Contributions 
        </h2>
        <button 
          onClick={() => fetchData()}
          className="p-1 text-gray-400 hover:text-gray-300 transition-colors rounded-full"
          aria-label="Refresh data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 self-start">
        {totalContributions.toLocaleString()} contributions in the last year
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 w-full mb-3 md:mb-4 text-xs">
        <div className="flex flex-col items-center bg-[#1e1e1e] py-1 px-1 md:px-2 rounded-lg">
          <span className="font-semibold text-white text-sm">{currentStreak}</span>
          <span className="text-gray-400 text-xs">Current streak</span>
        </div>
        <div className="flex flex-col items-center bg-[#1e1e1e] py-1 px-1 md:px-2 rounded-lg">
          <span className="font-semibold text-white text-sm">{longestStreak}</span>
          <span className="text-gray-400 text-xs">Longest streak</span>
        </div>
        <div className="flex flex-col items-center bg-[#1e1e1e] py-1 px-1 md:px-2 rounded-lg">
          <span className="font-semibold text-white text-sm">{Math.round(totalContributions / 365)}</span>
          <span className="text-gray-400 text-xs">Daily avg</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex min-w-max">
          {/* Day of week labels */}
          <div className="flex flex-col justify-between mr-1 md:mr-2 text-xs text-gray-400">
            {dayLabels.map((day, i) => (
              <div key={i} className="h-2 md:h-3 text-center text-[10px] md:text-xs" style={{ visibility: i % 2 === 0 ? 'visible' : 'hidden' }}>
                {day}
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Month labels */}
            <div className="flex text-[10px] md:text-xs text-gray-400 mb-1">
              {monthLabels().map((month, i) => (
                <div key={i} className="flex-1 text-center min-w-[14px] md:min-w-[16px]">{month}</div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-0.5 md:gap-1">
              {data.map(day => (
                <div
                  key={day.date}
                  className={`w-2 h-2 rounded-[1px] md:rounded-[2px] cursor-pointer ${getColor(day.level)} transition-all duration-200 ${isHovering ? 'hover:scale-125 hover:shadow-sm' : ''}`}
                  onMouseEnter={() => handleDayHover(day)}
                  onMouseLeave={() => !isMobile && setSelectedDay(null)}
                  onClick={() => isMobile && handleDayClick(day)}
                  aria-label={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center mt-3 md:mt-4 text-xs">
        <span className="text-gray-400 mr-2">Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div
            key={level}
            className={`w-2 h-2 rounded-sm mx-0.5 ${getColor(level)}`}
          />
        ))}
        <span className="text-gray-400 ml-2">More</span>
      </div>

      {/* Activity level indicator */}
      <div className="mt-3 w-full bg-[#1e1e1e] rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(totalContributions / 2000) * 100 > 100 ? 100 : (totalContributions / 2000) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-1 mb-2">
        Activity level: {totalContributions > 1500 ? 'High' : totalContributions > 750 ? 'Medium' : 'Low'}
      </p>
      {/* Always visible tooltip - static inside card */}
      <div className="w-full bg-[#1e1e1e] text-white text-xs py-2 px-3 rounded-md shadow-lg mb-3 transition-all duration-200">
        {selectedDay ? (
          <>
            <p><strong>{selectedDay.count} contributions</strong></p>
            <p>on {new Date(selectedDay.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </>
        ) : (
          <p className="text-center text-gray-400">{isMobile ? 'Tap a square to view details' : 'Hover over a square to view details'}</p>
        )}
      </div>
    </div>
  );
}