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
    consume(): T[] {
        return this._data;
    }
    private _data: T[];
    private _len: number;
}

export type VecNum = Vec<number>;

export function dot(lhs: VecNum, rhs: VecNum): number {
    return lhs.zip(rhs).fold(0, (acc, [v1, v2]) => acc + v1 * v2);
}
export function scal(vec: VecNum, scal: number): VecNum {
    return vec.map( (val) => val * scal );
}
export function add(lhs: VecNum, rhs: VecNum): VecNum {
    return lhs.zipWith(rhs, ([v1, v2]) => v1 + v2);
}
export function sub(lhs: VecNum, rhs: VecNum): VecNum {
    return lhs.zipWith(rhs, ([v1, v2]) => v1 - v2);
}
export function cross(lhs: VecNum, rhs: VecNum): VecNum {
    if (lhs.len() != 3 || rhs.len() != 3) throw Error('Both vectors must have the length of 3');
    let x = lhs.get(1) * rhs.get(2) - lhs.get(2) * rhs.get(1);
    let y = lhs.get(2) * rhs.get(0) - lhs.get(0) * rhs.get(2);
    let z = lhs.get(0) * rhs.get(1) - lhs.get(1) * rhs.get(0);

    return new Vec([x, y, z]);
}

export function norm(vec: VecNum): number {
    return Math.sqrt( norm_sq(vec) );
}
export function norm_sq(vec: VecNum): number {
    let x = vec.get(0);
    let y = vec.get(1);
    let z = vec.get(2);
    return x*x + y*y + z*z;
}