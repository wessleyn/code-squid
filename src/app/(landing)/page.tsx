import Image from "next/image";
import Link from "next/link";
import squidSvg from './squid.svg';

export default function LandingPage() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
            {/* Underwater bubbles effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/70"
                        style={{
                            width: `${Math.random() * 50 + 10}px`,
                            height: `${Math.random() * 50 + 10}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `rise ${Math.random() * 10 + 15}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Light rays effect */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white/70 origin-bottom"
                        style={{
                            width: `${Math.random() * 100 + 50}px`,
                            height: '100%',
                            left: `${Math.random() * 100}%`,
                            transform: 'rotate(5deg)',
                            filter: 'blur(10px)'
                        }}
                    />
                ))}
            </div>

            <div className="z-10 p-8 text-center">
                <h1 className="text-5xl font-bold text-white mb-6 text-shadow">Code Squid</h1>

                <div className="relative w-64 h-64 mb-8 mx-auto">
                    <Image
                        src={squidSvg}
                        alt="Code Squid Logo"
                        fill
                        className="animate-float"
                        style={{
                            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
                        }}
                    />
                </div>

                <div className="flex justify-center space-x-6 mt-8">
                    <button className="px-6 py-3 rounded-lg bg-lavender-400 text-white font-medium hover:bg-lavender-500 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Credits
                    </button>
                    <Link
                        href='/game'
                        className="px-6 py-3 rounded-lg bg-lavender-600 text-white font-medium hover:bg-lavender-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Begin
                    </Link>
                    <button className="px-6 py-3 rounded-lg bg-lavender-400 text-white font-medium hover:bg-lavender-500 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Download
                    </button>
                </div>

                <p className="mt-16 text-white/80 italic">
                    A lost squid on a coding journey
                </p>
            </div>
        </div>
    )
}