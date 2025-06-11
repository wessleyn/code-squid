'use client'

import { useEffect, useRef, useState } from 'react';
import { EventBus } from '../(utils)/EventBus';
import isBrowser from '../(utils)/isBrowser';
import { GameScene, IRefGameScene } from './GameScene';
import MainMenu from './MainMenu';
import WaterBackground from './WaterBackground';

export default function GameClient() {
    const [gameStarted, setGameStarted] = useState(false);
    const [isGamePreloaded, setIsGamePreloaded] = useState(false);
    const phaserRef = useRef<IRefGameScene | null>(null);
    const currentSceneRef = useRef<Phaser.Scene | null>(null);

    // Handle starting the game
    const handleStartGame = () => {
        // If the game is already loaded and paused, resume it
        if (currentSceneRef.current && currentSceneRef.current.scene.key.includes('Level')) {
            currentSceneRef.current.scene.resume();
        }
        setGameStarted(true);
    };

    // This event is fired when a scene has loaded and is ready
    const handleSceneChange = (scene_instance: Phaser.Scene) => {
        if (isBrowser()) {
            if (phaserRef.current && scene_instance) {
                currentSceneRef.current = scene_instance;

                // If we're in Level_1 and game hasn't started, pause the scene
                if (scene_instance.scene.key.includes('Level') && !gameStarted) {
                    scene_instance.scene.pause();
                    setIsGamePreloaded(true);
                }

                if (scene_instance.scene.key === 'MainMenu') {
                    //show mainmenu
                    setGameStarted(false);
                }
            }
        }
    }

    // Listen for the preload-complete event
    useEffect(() => {
        const handlePreloadComplete = () => {
            setIsGamePreloaded(true);
        };

        EventBus.on('preload-complete', handlePreloadComplete);

        return () => {
            EventBus.removeListener('preload-complete', handlePreloadComplete);
        };
    }, []);

    // Show MainMenu when game is not started, but preload the game in background
    if (!gameStarted) {
        return (
            <div className="h-screen w-full overflow-hidden relative">
                <WaterBackground />
                <MainMenu onStartGame={handleStartGame} isLoading={!isGamePreloaded} />

                {/* Hidden game container for preloading */}
                <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', visibility: 'hidden' }}>
                    <GameScene ref={phaserRef} currentActiveScene={handleSceneChange} />
                </div>
            </div>
        );
    }

    return (
        <div id="app" className="h-screen w-full relative">
            <WaterBackground />
            <GameScene ref={phaserRef} currentActiveScene={handleSceneChange} />
        </div>
    );
}
