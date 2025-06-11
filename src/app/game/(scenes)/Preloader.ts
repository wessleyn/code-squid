import isBrowser from '@utils/isBrowser';
import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {

    }

    preload() {
        this.load.setPath('assets');

    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        // Notify any listeners that preloading is complete
        if (isBrowser()) {
            // Import EventBus dynamically to avoid server-side issues
            import('../(utils)/EventBus').then(({ EventBus }) => {
                // Emit the preload-complete event
                EventBus.emit('preload-complete');

                //  Move to the current level here based on play data.
                this.scene.start('Level_1');
            });
        } else {
            //  Move to the current level here based on play data.
            this.scene.start('Level_1');
        }
    }
}
