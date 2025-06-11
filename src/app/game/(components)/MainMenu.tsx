'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Navigation items for the sidebar
const navItems = [
  { id: 'story', label: 'Story', icon: '📖' },
  { id: 'puzzle', label: 'Puzzle', icon: '🧩' },
  { id: 'arena', label: 'Arena', icon: '🏆' },
  { id: 'live', label: 'Roam', icon: '🔴' },
];

// Mock game stats
const gameStats = {
  level: 5,
  experience: 1250,
  squidCoins: 780,
  achievements: 8,
};

export default function MainMenu({ onStartGame, isLoading = false }: { onStartGame: () => void, isLoading?: boolean }) {
  const [activeNav, setActiveNav] = useState('story');
  const [hasProgress, setHasProgress] = useState(false); // TODO: load data here
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  // Progress bar animation for loading state
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 10);
          return newProgress > 95 ? 95 : newProgress; // Cap at 95% until fully loaded
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100); // Complete progress when loading is done
    }
  }, [isLoading]);

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
  };

  // Toggle this for testing
  const toggleProgress = () => {
    setHasProgress(!hasProgress);
  };

  return (
    <div className="h-full w-full flex">
      {/* Main content area - left side */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* Top status bar */}
        <div className="absolute top-4 right-4 bg-lavender-900/70 p-3 rounded-lg backdrop-blur-sm z-10 flex gap-4 shadow-lg border border-lavender-700/50">
          <div className="flex flex-col items-center">
            <span className="text-xs text-lavender-300">LEVEL</span>
            <span className="text-lg font-bold text-white">{gameStats.level}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-lavender-300">XP</span>
            <span className="text-lg font-bold text-white">{gameStats.experience}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-lavender-300">COINS</span>
            <span className="text-lg font-bold text-white">{gameStats.squidCoins}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-lavender-300">ACHIEVEMENTS</span>
            <span className="text-lg font-bold text-white">{gameStats.achievements}</span>
          </div>
        </div>

        {/* Squid character */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="animate-float" onDoubleClick={toggleProgress}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="300px" height="300px">
              <path fill="#9e9ceb" d="M57.5,48.534a15.415,15.415,0,0,1-8.56,2.428,21.684,21.684,0,0,1-5.45-.73,12.7,12.7,0,0,0,4.09,2.149A3.368,3.368,0,0,1,50,55.608c0,.07-.01.15-.01.22a3.379,3.379,0,0,1-3.83,3.138,15.434,15.434,0,0,1-8.03-3.858,21.882,21.882,0,0,1-3.33-3.787l.17,2.269a4.985,4.985,0,1,1-9.94,0l.17-2.269a21.882,21.882,0,0,1-3.33,3.787,15.434,15.434,0,0,1-8.03,3.858,3.379,3.379,0,0,1-3.83-3.138c0-.07-.01-.15-.01-.22a3.368,3.368,0,0,1,2.42-3.227,12.7,12.7,0,0,0,4.09-2.149,21.684,21.684,0,0,1-5.45.73A15.415,15.415,0,0,1,2.5,48.534a3.38,3.38,0,0,1,1.88-6.186,3.446,3.446,0,0,1,1.43.31,13.072,13.072,0,0,0,6.61,1.079,25,25,0,1,1,35.16,0,13.072,13.072,0,0,0,6.61-1.079,3.446,3.446,0,0,1,1.43-.31,3.38,3.38,0,0,1,1.88,6.186Z" />
              <circle cx="30" cy="25" r="10" fill="#fff" />
              <path fill="#5c608c" d="M33,41a3,3,0,0,1-6,0c0-1.657,1.343-2,3-2S33,39.343,33,41Z" />
              <path fill="#5da0ff" d="M34.78,23.51s.01,0,0,.01A5.2,5.2,0,0,1,35,25a5,5,0,1,1-5-5,5.2,5.2,0,0,1,1.48.22c.01-.01.01,0,.01,0Z" />
              <circle cx="32.5" cy="22.5" r="2.5" fill="#fff" />
              <path fill="#373737" d="M59.9,46.441a4.379,4.379,0,0,0-.827-3.407,4.44,4.44,0,0,0-5.3-1.284,11.449,11.449,0,0,1-3.914,1A25.756,25.756,0,0,0,56,25.98,26.005,26.005,0,0,0,12.32,6.93,1,1,0,1,0,13.68,8.4a23.989,23.989,0,0,1,33.2,34.63,1,1,0,0,0,.62,1.707A14.185,14.185,0,0,0,54.6,43.568a2.445,2.445,0,0,1,2.887.7,2.4,2.4,0,0,1-.538,3.433,14.5,14.5,0,0,1-8.014,2.266,20.848,20.848,0,0,1-5.2-.7,1,1,0,0,0-.861,1.759,13.645,13.645,0,0,0,4.436,2.321,2.4,2.4,0,0,1,.789,4.131,2.327,2.327,0,0,1-1.8.5A14.518,14.518,0,0,1,38.8,54.362a21.018,21.018,0,0,1-3.178-3.615A1,1,0,0,0,33.8,51.4l.17,2.269a3.985,3.985,0,1,1-7.946,0L26.2,51.4a1,1,0,0,0-1.815-.649,20.989,20.989,0,0,1-3.174,3.611,14.514,14.514,0,0,1-7.51,3.618c-2.827.41-3.665-3.839-.992-4.637a13.627,13.627,0,0,0,4.415-2.315,1,1,0,0,0-.861-1.759,20.848,20.848,0,0,1-5.2.7A14.494,14.494,0,0,1,3.05,47.7a2.4,2.4,0,0,1-.539-3.437,2.451,2.451,0,0,1,2.882-.7,14.177,14.177,0,0,0,7.11,1.167,1,1,0,0,0,.62-1.707A23.966,23.966,0,0,1,10.8,11.589a1,1,0,1,0-1.6-1.2,25.968,25.968,0,0,0,.942,32.363,11.44,11.44,0,0,1-3.917-1A4.382,4.382,0,0,0,1.953,49.37a16.481,16.481,0,0,0,9.016,2.592A4.331,4.331,0,0,0,9,55.6a4.444,4.444,0,0,0,4.984,4.354,16.51,16.51,0,0,0,8.552-4.1,20.98,20.98,0,0,0,1.494-1.477,5.984,5.984,0,0,0,11.94,0q.726.791,1.5,1.481a16.515,16.515,0,0,0,8.55,4.1,4.412,4.412,0,0,0,3.344-.927A4.489,4.489,0,0,0,51,55.608a4.332,4.332,0,0,0-1.969-3.646,16.483,16.483,0,0,0,9.019-2.594A4.3,4.3,0,0,0,59.9,46.441Z" />
              <path fill="#373737" d="M26,41a4,4,0,0,0,8,0c0-1.991-1.346-3-4-3S26,39.009,26,41Zm6,0a2,2,0,0,1-4,0c0-.469,0-1,2-1S32,40.531,32,41Z" />
              <path fill="#373737" d="M41,25A11,11,0,1,0,30,36,11.013,11.013,0,0,0,41,25ZM30,34a9,9,0,1,1,9-9A9.01,9.01,0,0,1,30,34Z" />
              <path fill="#373737" d="M32.5,19a3.421,3.421,0,0,0-1.065.184A6.138,6.138,0,0,0,30,19a6,6,0,1,0,6,6,6.188,6.188,0,0,0-.186-1.427A3.438,3.438,0,0,0,36,22.5,3.5,3.5,0,0,0,32.5,19ZM34,22.5A1.5,1.5,0,1,1,32.5,21,1.5,1.5,0,0,1,34,22.5ZM30,29a3.995,3.995,0,0,1-.687-7.931,3.487,3.487,0,0,0,4.618,4.618A4,4,0,0,1,30,29Z" />
            </svg>
          </div>
        </div>

        {/* Loading progress bar or start button */}
        <div className="mb-10 flex flex-col items-center">
          {isLoading ? (
            <>
              <div className="w-64 h-3 bg-lavender-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-lavender-400 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-lavender-300 mb-4">Loading game resources... {progress}%</p>
            </>
          ) : (
            <button
              onClick={onStartGame}
              className="py-4 px-12 bg-lavender-600 hover:bg-lavender-500 text-white rounded-full text-2xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              {hasProgress ? 'Continue' : 'Start'}
            </button>
          )}
        </div>
      </div>

      {/* Sidebar - right side */}
      <div className="w-64 bg-lavender-900/80 backdrop-blur-sm border-l border-lavender-700/50">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-lavender-100 mb-8">Code Squid</h1>

          <nav className="flex flex-col gap-3">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeNav === item.id
                    ? 'bg-lavender-600 text-white'
                    : 'text-lavender-300 hover:bg-lavender-800'
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-12 p-4 bg-lavender-800/50 rounded-lg">
            <h3 className="text-sm font-semibold text-lavender-300 mb-2">ACTIVE MODE</h3>
            <div className="text-lg font-bold text-white">
              {navItems.find(item => item.id === activeNav)?.label || 'Story'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
