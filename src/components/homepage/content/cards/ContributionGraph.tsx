'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
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

// Enhanced cache with TTL and size limits
const contributionCache = new Map();
const CACHE_TTL = 3600000; // 1 hour
const MAX_CACHE_SIZE = 50;

// Precompute color mappings for better performance
const COLOR_MAP = {
  0: 'bg-[#100f0f]',
  1: 'bg-[#1e1e1e]', 
  2: 'bg-[#0e4429]',
  3: 'bg-[#26a641]',
  4: 'bg-[#39d353]',
} as const;

// Utility function to manage cache size
const manageCacheSize = () => {
  if (contributionCache.size > MAX_CACHE_SIZE) {
    const oldestKey = Array.from(contributionCache.keys())[0];
    contributionCache.delete(oldestKey);
  }
};

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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Memoized responsive detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    
    // Throttle resize events for better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkIsMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Improved streak calculation with edge cases handled
  const calculateStreaks = useCallback((contributions: ContributionDay[]) => {
    if (!contributions.length) return;

    let current = 0;
    let longest = 0;
    let tempLongest = 0;
    
    // Calculate current streak (most recent consecutive days with contributions)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Sort by date descending for current streak calculation
    const sortedByRecent = [...contributions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate current streak from most recent day backwards
    for (const day of sortedByRecent) {
      const dayDate = new Date(day.date);
      if (dayDate > today) continue; // Skip future dates
      
      if (day.count > 0) {
        current++;
      } else {
        break;
      }
    }

    // Calculate longest streak from sorted array (chronological)
    const sortedChronologically = [...contributions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    for (const day of sortedChronologically) {
      if (day.count > 0) {
        tempLongest++;
        longest = Math.max(longest, tempLongest);
      } else {
        tempLongest = 0;
      }
    }

    setCurrentStreak(current);
    setLongestStreak(longest);
  }, []);

  // Enhanced data fetching with better error handling and retry logic
  const fetchData = useCallback(async (retryCount = 0) => {
    const cacheKey = `contributions-${username}`;
    const cachedData = contributionCache.get(cacheKey);
    
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_TTL) {
      setData(cachedData.data);
      setTotalContributions(cachedData.totalContributions);
      setIsLoading(false);
      calculateStreaks(cachedData.data);
      setLastUpdated(new Date(cachedData.timestamp));
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

      // Precompute level mapping for better performance
      const levelMap: { [key: string]: number } = {
        'NONE': 0,
        'FIRST_QUARTILE': 1,
        'SECOND_QUARTILE': 2,
        'THIRD_QUARTILE': 3,
        'FOURTH_QUARTILE': 4
      };

      const contributions: ContributionDay[] = contributionDays.map(day => {
        const date = new Date(day.date);
        return {
          date: day.date,
          count: day.contributionCount,
          level: levelMap[day.contributionLevel] || 0,
          month: date.toLocaleString('default', { month: 'short' }),
          weekDay: date.getDay()
        };
      });

      const timestamp = Date.now();
      manageCacheSize();
      contributionCache.set(cacheKey, {
        data: contributions,
        totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
        timestamp
      });

      setData(contributions);
      setTotalContributions(user.contributionsCollection.contributionCalendar.totalContributions);
      calculateStreaks(contributions);
      setLastUpdated(new Date(timestamp));
    } catch (err) {
      console.error('Error fetching GitHub contributions:', err);
      
      // Retry logic for transient errors
      if (retryCount < 2) {
        setTimeout(() => fetchData(retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      
      setError(err instanceof Error ? err.message : 'An error occurred while fetching contributions');
    } finally {
      setIsLoading(false);
    }
  }, [username, calculateStreaks]);

  // Auto-refresh data every hour
  useEffect(() => {
    fetchData();
    
    const interval = setInterval(() => {
      fetchData();
    }, CACHE_TTL);
    
    return () => clearInterval(interval);
  }, [fetchData]);

  // Memoized color function for better performance
  const getColor = useCallback((level: number): string => {
    return COLOR_MAP[level as keyof typeof COLOR_MAP] || COLOR_MAP[0];
  }, []);

  // Memoized month labels calculation
  const monthLabels = useMemo(() => {
    const months: {[key: string]: boolean} = {};
    data.forEach(day => {
      if (day.month) {
        months[day.month] = true;
      }
    });
    return Object.keys(months);
  }, [data]);

  // Enhanced day interaction handlers
  const handleDayHover = useCallback((day: ContributionDay) => {
    setSelectedDay(day);
  }, []);

  const handleDayClick = useCallback((day: ContributionDay) => {
    setSelectedDay(day);
    // Auto-clear selection on mobile after delay
    setTimeout(() => setSelectedDay(null), 3000);
  }, []);

  // Clear selection when not hovering
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (!isMobile) {
      setSelectedDay(null);
    }
  }, [isMobile]);

  // Keyboard navigation support
  const handleKeyDown = useCallback((event: React.KeyboardEvent, day: ContributionDay) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDayClick(day);
    }
  }, [handleDayClick]);

  // Memoized day labels
  const dayLabels = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], []);

  // Activity level calculation
  const activityLevel = useMemo(() => {
    if (totalContributions > 1500) return 'High';
    if (totalContributions > 750) return 'Medium';
    return 'Low';
  }, [totalContributions]);

  const activityPercentage = useMemo(() => {
    return Math.min((totalContributions / 2000) * 100, 100);
  }, [totalContributions]);

  // Skeleton loader remains the same (keeping your aesthetic)
  if (isLoading) {
    return (
      <div className={`flex flex-col items-center p-2 md:p-4 backdrop-blur-[2px] transition-all duration-200 ease hover:-translate-y-1 hover:backdrop-brightness-130 hover:backdrop-saturate-150 active:backdrop-brightness-130 active:backdrop-saturate-150 rounded-xl ${className}`}>
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
      <div className={`flex flex-col items-center p-2 md:p-4 backdrop-blur-[2px] transition-all duration-200 ease hover:-translate-y-1 hover:backdrop-brightness-130 hover:backdrop-saturate-150 active:backdrop-brightness-130 active:backdrop-saturate-150 rounded-xl ${className}`}>
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
      className={`flex flex-col items-center p-2 md:p-4 backdrop-blur-[2px] transition-all duration-200 ease hover:-translate-y-1 hover:backdrop-brightness-130 hover:backdrop-saturate-150 active:backdrop-brightness-130 active:backdrop-saturate-150 rounded-xl ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start w-full mb-2">
        <div className="flex flex-col">
          <h2 className="text-base md:text-lg font-semibold text-white">
            {username}&apos;s Contributions 
          </h2>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
        <button 
          onClick={() => fetchData()}
          className="p-1 text-gray-400 hover:text-gray-300 transition-colors rounded-full hover:bg-[#2a2a2a]"
          aria-label="Refresh data"
          title="Refresh contributions"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 self-start">
        {totalContributions.toLocaleString()} contributions in the last year
      </p>

      {/* Enhanced stats row with better calculations */}
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
          <span className="font-semibold text-white text-sm">{Math.round(totalContributions / data.length)}</span>
          <span className="text-gray-400 text-xs">Daily avg</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden h-auto">
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
              {monthLabels.map((month, i) => (
                <div key={i} className="flex-1 text-center min-w-[14px] md:min-w-[16px]">{month}</div>
              ))}
            </div>

            {/* Contribution grid with performance optimizations */}
            <div className="grid grid-flow-col grid-rows-7 gap-0.5 md:gap-1">
              {data.map(day => (
                <button
                  key={day.date}
                  className={`w-2 h-2 rounded-[1px] md:rounded-[2px] cursor-pointer ${getColor(day.level)} transition-all duration-200 ${isHovering ? 'hover:scale-125 hover:shadow-sm' : ''} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
                  onMouseEnter={() => handleDayHover(day)}
                  onMouseLeave={() => !isMobile && setSelectedDay(null)}
                  onClick={() => isMobile && handleDayClick(day)}
                  onKeyDown={(e) => handleKeyDown(e, day)}
                  aria-label={`${day.count} contributions on ${day.date}`}
                  title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced legend */}
      <div className="flex items-center mt-3 md:mt-4 text-xs">
        <span className="text-gray-400 mr-2">Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div
            key={level}
            className={`w-2 h-2 rounded-sm mx-0.5 ${getColor(level)}`}
            aria-label={`Contribution level ${level}`}
          />
        ))}
        <span className="text-gray-400 ml-2">More</span>
      </div>

      {/* Activity level indicator with smooth animation */}
      <div className="mt-3 w-full bg-[#1e1e1e] rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${activityPercentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-1 mb-2">
        Activity level: {activityLevel}
      </p>

      {/* Enhanced tooltip with better accessibility */}
      <div 
        className="w-full bg-[#1e1e1e] text-content text-xs py-2 px-3 rounded-md shadow-lg mb-3 transition-all duration-200 min-h-[60px] flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        {selectedDay ? (
          <div className="text-center">
            <p className="font-semibold text-white">{selectedDay.count} contribution{selectedDay.count !== 1 ? 's' : ''}</p>
            <p className="text-gray-400">
              {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            {isMobile ? 'Tap a square to view details' : 'Hover over a square to view details'}
          </p>
        )}
      </div>
    </div>
  );
}