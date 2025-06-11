import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { EventBus } from './scenes/EventBus';

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref) {
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() => {
        let StartGame: any = null;

        // Only import and run Phaser in the browser
        if (typeof window !== 'undefined') {
            // Dynamic import to ensure Phaser is only loaded client-side
            import('./scenes/main').then((module) => {
                StartGame = module.default;
                if (game.current === null) {
                    game.current = StartGame("game-container");

                    if (typeof ref === 'function') {
                        ref({ game: game.current, scene: null });
                    } else if (ref) {
                        ref.current = { game: game.current, scene: null };
                    }
                }
            });
        }

        return () => {
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
