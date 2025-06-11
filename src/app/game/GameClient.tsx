'use client'

import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './(components)/PhaserGame';

export default function GameClient() {
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {
        if (!phaserRef.current) return;

        const scene = phaserRef.current.scene as any;
        if (scene && scene.changeScene) {
            scene.changeScene();
        }
    }

    const moveSprite = () => {
        if (!phaserRef.current) return;

        const scene = phaserRef.current.scene as any;
        if (scene && scene.scene && scene.scene.key === 'MainMenu' && scene.moveLogo) {
            // Get the update logo position
            scene.moveLogo(({ x, y }: { x: number, y: number }) => {
                setSpritePosition({ x, y });
            });
        }
    }

    const addSprite = () => {
        if (!phaserRef.current) return;

        const scene = phaserRef.current.scene;
        if (!scene) return;

        // We need to ensure Phaser is available
        if (typeof window !== 'undefined' && (window as any).Phaser) {
            const Phaser = (window as any).Phaser;

            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: any) => {
        if (scene && scene.scene) {
            setCanMoveSprite(scene.scene.key !== 'MainMenu');
        }
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div>
                <div>
                    <button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button>
                </div>
                <div className="spritePosition">Sprite Position:
                    <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                </div>
                <div>
                    <button className="button" onClick={addSprite}>Add New Sprite</button>
                </div>
            </div>
        </div>
    )
}
