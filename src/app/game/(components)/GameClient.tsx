'use client'

import { useRef, useState } from 'react';
import { GameScene, IRefGameScene } from './GameScene';
import MainMenu from './MainMenu';
import WaterBackground from './WaterBackground';

export default function GameClient() {
    const [gameStarted, setGameStarted] = useState(false);
    const phaserRef = useRef<IRefGameScene | null>(null);

    // Start the game - this would transition to the Phaser game
    const handleStartGame = () => {
        setGameStarted(true);
    };

    if (!gameStarted) {
        return (
            <div className="h-screen w-full overflow-hidden relative">
                <WaterBackground />
                <MainMenu onStartGame={handleStartGame} />
            </div>
        );
    }

    return (
        <div id="app" className="h-screen w-full relative">
            <WaterBackground />
            <GameScene ref={phaserRef} currentActiveScene={() => { }} />
        </div>
    );
}
