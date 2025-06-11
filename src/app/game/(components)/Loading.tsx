'use client'

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-lavender-950">
      <div className="animate-float mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="150px" height="150px">
          <path fill="#9e9ceb" d="M57.5,48.534a15.415,15.415,0,0,1-8.56,2.428,21.684,21.684,0,0,1-5.45-.73,12.7,12.7,0,0,0,4.09,2.149A3.368,3.368,0,0,1,50,55.608c0,.07-.01.15-.01.22a3.379,3.379,0,0,1-3.83,3.138,15.434,15.434,0,0,1-8.03-3.858,21.882,21.882,0,0,1-3.33-3.787l.17,2.269a4.985,4.985,0,1,1-9.94,0l.17-2.269a21.882,21.882,0,0,1-3.33,3.787,15.434,15.434,0,0,1-8.03,3.858,3.379,3.379,0,0,1-3.83-3.138c0-.07-.01-.15-.01-.22a3.368,3.368,0,0,1,2.42-3.227,12.7,12.7,0,0,0,4.09-2.149,21.684,21.684,0,0,1-5.45.73A15.415,15.415,0,0,1,2.5,48.534a3.38,3.38,0,0,1,1.88-6.186,3.446,3.446,0,0,1,1.43.31,13.072,13.072,0,0,0,6.61,1.079,25,25,0,1,1,35.16,0,13.072,13.072,0,0,0,6.61-1.079,3.446,3.446,0,0,1,1.43-.31,3.38,3.38,0,0,1,1.88,6.186Z"/>
          <circle cx="30" cy="25" r="10" fill="#fff"/>
          <path fill="#5c608c" d="M33,41a3,3,0,0,1-6,0c0-1.657,1.343-2,3-2S33,39.343,33,41Z"/>
          <path fill="#5da0ff" d="M34.78,23.51s.01,0,0,.01A5.2,5.2,0,0,1,35,25a5,5,0,1,1-5-5,5.2,5.2,0,0,1,1.48.22c.01-.01.01,0,.01,0Z"/>
          <circle cx="32.5" cy="22.5" r="2.5" fill="#fff"/>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-lavender-100 mb-4 text-shadow">Loading Game...</h2>
      <div className="w-64 h-3 bg-lavender-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-lavender-400 transition-all duration-200" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-lavender-300">{progress}%</p>
      
      <div className="mt-8 text-lavender-400 text-sm animate-pulse">
        Preparing code squid...
      </div>
    </div>
  );
}
