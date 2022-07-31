import {Row, Col} from './matrix.js';

export class Vec<T> {
    constructor(data: T[]) {
        this._data = data;
        this._len = data.length;
    }
    len(): number {
        return this._len;
    }
    get(index: number): T {
        return this._data[index];
    }
    set(index: number, val: T) {
        this._data[index] = val;
    }
    slice(start: number, end: number): Vec<T> {
        return new Vec(this._data.slice(start, end));
    }
    toRow(): Row<T> {
        return new Row(this._data);
    }
    toCol(): Col<T> {
        return new Col(this._data);
    }
    map<C>(f: (value: T, index: number) => C): Vec<C> {
        let data: C[] = this._data.map( (val, i) => f(val, i));
        return new Vec(data);
    }
    fold<C>(init: C, f: (acc: C, value: T, index: number) => C): C {
        this.forEach( (val, index) => init = f(init, val, index) );
        return init;
    }
    forEach(f: (value: T, index: number) => void) {
        this._data.forEach( (val, i) => f(val, i) );
    }
    zip(rhs: Vec<T>): Vec<[T, T]> {
        if (this._len != rhs._len) {
            throw Error();
        }
        return this.map( (val, i) => [val, rhs.get(i)]);
    }
    zipWith<C>(rhs: Vec<T>, f: (value: [T, T], index: number) => C): Vec<C> {
        if (this._len != rhs._len) {
            throw Error();
        }
        return this.zip(rhs).map( (val, i) => f(val, i));
    }
    
    private _data: T[];
    private _len: number;
}

export class Vec3 extends Vec<number> {
    constructor(data: [number, number, number]) {
        super(data);
    }
    
    cross(rhs: Vec3): Vec3 {
        let x = this.get(1) * rhs.get(2) - this.get(2) * rhs.get(1);
        let y = this.get(2) * rhs.get(0) - this.get(0) * rhs.get(2);
        let z = this.get(0) * rhs.get(1) - this.get(1) * rhs.get(0);

        return new Vec3([x, y, z]);
    }
    dot(rhs: Vec3): number {
        return this.zip(rhs).fold(0, (acc, [v1, v2]) => acc + v1 * v2);
    }
    scal(rhs: number) {
        return this.map( (val) => val * rhs );
    }
    add(rhs: Vec3) {
        return this.zipWith(rhs, ([v1, v2]) => v1 + v2);
    }
}