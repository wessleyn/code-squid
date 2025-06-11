import Level_1 from '@levels/Level_1';
import { AUTO, Game } from 'phaser';
import { Boot } from './Boot';
import { LevelOver } from './LevelOver';
import { Preloader } from './Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        Level_1,
        // NextLevel,
        LevelOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
