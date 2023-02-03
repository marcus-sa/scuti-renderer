import { Scuti } from "../src/Scuti";
import {Room} from "../src/objects/rooms/Room";

const renderer = new Scuti({
    canvas: document.getElementById("app"),
    width: window.innerWidth,
    height: window.innerHeight,
    resources: './resources'
});

const tileMap =
    "xxxxxxxxxxxxxxxxxxxx\n" +
    "x222221111111111111x\n" +
    "x222221111111111111x\n" +
    "2222221111111111111x\n" +
    "x222221111111111111x\n" +
    "x222221111111111111x\n" +
    "x222221111111111111x\n" +
    "xxxxxxxx1111xxxxxxxx\n" +
    "xxxxxxxx0000xxxxxxxx\n" +
    "x000000x0000x000000x\n" +
    "x000000x0000x000000x\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "xxxxxxxx00000000000x\n" +
    "x000000x00000000000x\n" +
    "x000000x0000xxxxxxxx\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "xxxxxxxx0000x000000x\n" +
    "x000000x0000x000000x\n" +
    "x000000x0000x000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "xxxxxxxxxxxxxxxxxxxx\n";

const tileMap1 = "xxxxxx\n" +
    "x4444432110011111x\n" +
    "x444443211001xx00x\n" +
    "0000000011001xx00x\n" +
    "x0000000000000000x\n" +
    "x0001000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "00000000000001000x\n" +
    "x0000432100011110x\n" +
    "x0000000000001000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000100000000x\n" +
    "x0000001110000000x\n" +
    "x0000011211000000x\n" +
    "x0000012221000000x\n" +
    "x000111232111100x\n" +
    "x0001112321111000x\n" +
    "x0000012321000000x\n" +
    "x0000012221000000x\n" +
    "x0000011211000000x\n" +
    "x00000011100xxxxxx\n" +
    "x00000001000xxxxxx\n" +
    "x00000000000xxxxxx\n" +
    "x00000000000xxxxxx\n";

const room = new Room(renderer, {
    tileMap: tileMap1
});
