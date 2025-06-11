import { Scene } from 'phaser';
import { EventBus } from '../(utils)/EventBus';

export default class Level_1 extends Scene {
    gameText: Phaser.GameObjects.Text;

    constructor() {
        super('Level_1');
    }

    create() {
        // Get the center of the screen
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.gameText = this.add.text(centerX, centerY, 'LEVEL ONE', {
            fontFamily: 'Arial Black', 
            fontSize: 38, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Notify that the level is ready to be interacted with
        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('Level_Over');
    }
}
