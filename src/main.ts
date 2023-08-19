import "./style.css";
import {Scuti} from "./Scuti.ts";
import {Room} from "./objects/rooms/Room.ts";
import {FloorMaterial} from "./objects/rooms/materials/FloorMaterial.ts";

console.log("Hello Word");

const renderer: Scuti = new Scuti({
    canvas: document.getElementById('app') as HTMLElement,
    width: window.innerWidth,
    height: window.innerHeight,
    resources: './resources'
});

await renderer.load();

const heightMap: string =`qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqxonmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqxppppppppppponmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqooooooooooooonmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqnnnnnnnnnnnnnnmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqmmmmmmmmmmmmmmmlkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqllllllllllllllllkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqkkkkkkkkkkkkkkkkkjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqjjjjjjjjjjjjjjjjjjihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqiiiiiiiiiiiiiiiiiiihgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqhhhhhhhhhhhhhhhhhhhhgfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqgggggggggggggggggggggfedcbaxxppppppppppppppppppppppqqq
qqqqqqqqffffffffffffffffffffffedcbaxxppppppppppppppppppppppqqq
qqqqqqqqeeeeeeeeffffffffffffeeedcbaxxppppppppppppppppppppppqqq
qqqqqqqqddddddddffffffffffffddddcbaxxppppppppppppppppppppppqqq
qqqqqqqqccccccccffffffffffffcccccbaxxppppppppppppppppppppppqqq
qqqqqqqqbbbbbbbbffffffffffffbbbbbbaxxppppppppppppppppppppppqqq
qqqppxxxaaaaaaaaffffffffffffaaaaaaaxxppppppppppppppppppppppqqq
qqqppxxx99999999ffffffffffff9999999xxppppppppppppppppppppppqqq
qqqppxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxppppppppppppppppppppppqqq
qqqppxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp555555553ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp555555553ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp555555553ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp555555553ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp555555553ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp555555553ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp555555553ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppp333333333ppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqppppppppppppppppppppppppppppppppppppppppppppppppppppppppqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
`;
const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
const room: Room = new Room({
    heightMap: heightMap,
    dragging: true,
    centerCamera: false,
    floorMaterial: new FloorMaterial(random),
    floorThickness: 8
});

renderer.add(room);

room.camera.zoom(1);

setInterval(() => {
    const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
    room.configuration.floorMaterial = new FloorMaterial(random)
    //room.configuration.floorThickness = Math.floor(Math.random() * (32 - 0 + 1)) + 0;
    room.configuration.floorThickness = 8;
}, 1000);

new FloorMaterial(101);

/*setTimeout(() => room.camera.zoom(2), 1000);
setTimeout(() => room.camera.zoom(4), 2000);
setTimeout(() => room.camera.zoom(5), 3000);
setTimeout(() => room.camera.zoom(8, 1), 4000);

setTimeout(() => room.camera.zoom(2), 5000);
setTimeout(() => room.camera.zoom(4), 6000);
setTimeout(() => room.camera.zoom(0.5), 7000);

setTimeout(() => room.camera.zoom(5), 8000);*/


/*setTimeout(() => room.camera.zoom = 3, 3000);
setTimeout(() => room.camera.zoom = 0.5, 4000);
setTimeout(() => room.camera.zoom = 2, 5000);
setTimeout(() => room.camera.zoom = 1, 6000);*/
