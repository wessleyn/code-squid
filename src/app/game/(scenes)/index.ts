import Level_1 from '@levels/Level_1';
import { AUTO, Game } from 'phaser';
import { LevelOver } from './LevelOver';
import { Preloader } from './Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#00FFFFFF',
    scene: [
        Preloader,
        Level_1,
        // NextLevel,
        LevelOver
    ],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
