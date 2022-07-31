
// class Screen {
//     constructor(canvas: HTMLCanvasElement, width: number, height: number) {
//         this._canvas = canvas;
//         this.width = width;
//         this.height = height;
//     }

//     public get width(): number {
//         return this._canvas.width;
//     }
//     public set width(width: number) {
//         this._canvas.width = width;
//     }
//     public get height(): number {
//         return this._canvas.height;
//     }
//     public set height(height: number) {
//         this._canvas.height = height;
//     }
//     clear() {
//         this._canvas.getContext('2d')!.clearRect(0, 0, this.width, this.height);
//     }

//     public _canvas: HTMLCanvasElement;
// }

// type Point = [number, number];
// class GameObject {
//     draw(canvas: HTMLCanvasElement) {}
// }
// class Line extends GameObject {
//     constructor(p1: Point, p2: Point) {
//         super();
//         this.p1 = p1;
//         this.p2 = p2;
//     }
//     draw(canvas: HTMLCanvasElement) {
//         const ctx = canvas.getContext('2d')!;

//         ctx.beginPath();       // Start a new path
//         ctx.moveTo(this.p1[0], this.p1[1]);    // Move the pen to (30, 50)
//         ctx.lineTo(this.p2[0], this.p2[1]);  // Draw a line to (150, 100)
//         ctx.stroke();  
//     }
//     private p1: Point;
//     private p2: Point;
// }
// class Game {
//     constructor(screen: Screen, fps: number) {
//         this._fps = fps;
//         this._screen = screen;
//         this._objects = [];

//         setInterval( () => {
//             this._screen.clear();
//             this.render();
//         }, 1000 / fps );
//     }

//     render() {
//         this._objects.forEach( obj => obj.draw(this._screen._canvas) );
//     }
//     addObject(object: GameObject) {
//         this._objects.push(object);
//     }

//     private _screen: Screen;
//     private _fps: number;
//     private _objects: GameObject[];
// }

import {Vec3} from './vector.js';

const main = () => {
    let v1 = new Vec3([1, 0, 0]);
    let v2 = new Vec3([2, 1, 0]);
    console.log(v1.dot(v2));
}

main();