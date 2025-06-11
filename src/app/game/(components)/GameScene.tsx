import { EventBus } from '@utils/EventBus';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

export interface IRefGameScene {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

export const GameScene = forwardRef<IRefGameScene, IProps>(function Game({ currentActiveScene }, ref) {
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() => {
        let StartGame: any = null;

        // Only import and run Phaser in the browser
        if (typeof window !== 'undefined') {
            // Dynamic import to ensure Phaser is only loaded client-side
            import('../(scenes)').then((module) => {
                StartGame = module.default;
                if (game.current === null) { // we have no game instance yet
                    game.current = StartGame("game-container"); // start a new one

                    // point the ref to the game instance
                    if (typeof ref === 'function') {
                        ref({ game: game.current, scene: null });
                    } else if (ref) {
                        ref.current = { game: game.current, scene: null };
                    }
                }
            });
        }

        return () => { // Cleanup the game instance when the component unmounts
            if (game.current) {
                game.current.destroy(true);
                if (game.current !== null) {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
                if (currentActiveScene && typeof currentActiveScene === 'function') {
                    currentActiveScene(scene_instance);
                }

                if (typeof ref === 'function') {
                    ref({ game: game.current, scene: scene_instance });
                } else if (ref) {
                    ref.current = { game: game.current, scene: scene_instance };
                }
            });
        }

        return () => {
            if (typeof window !== 'undefined') {
                EventBus.removeListener('current-scene-ready');
            }
        }
    }, [currentActiveScene, ref]);

    return (
        <div id="game-container"></div>
    );
});
