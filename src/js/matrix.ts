export class Matrix<T> {
    constructor(data: T[][]) {
        this._size = [data.length, data[0].length];
        this._data = data;
    }

    get( [row, col]: [number, number] ): T {
        return this._data[row][col];
    }
    set( [row, col]: [number, number], val: T ) {
        this._data[row][col] = val;
    }
    size(): [number, number] {
        return this._size;
    }

    slice( rows: number[], cols: number[] ): Matrix<T> {
        let data = [];
        if (rows.length == 0) rows = [...Array(this._size[0]).keys()];
        if (cols.length == 0) cols = [...Array(this._size[1]).keys()];

        for (let row_num of rows) {
            let row = [];
            for (let col_num of cols) {
                row.push( this.get( [row_num, col_num] ) );
            }
            data.push(row);
        }

        return new Matrix(data);
    }

    flatten(): T[] {
        return this._data.flat();
    }

    map<C>(f: (value: T, index: [number, number]) => C): Matrix<C> {
        let data: C[][] = this._data.map( (row, row_num) => 
            row.map((val, col_num) => f(val, [row_num, col_num]))
        );
        return new Matrix(data);
    }
    fold<C>(init: C, f: (acc: C, value: T, index: [number, number]) => C): C {
        this.forEach( (val, index) => init = f(init, val, index) );
        return init;
    }
    forEach(f: (value: T, index: [number, number]) => void) {
        this._data.forEach( (row, row_num) => 
            row.forEach((val, col_num) => f(val, [row_num, col_num]))
        );
    }
    zip(rhs: Matrix<T>): Matrix<[T, T]> {
        if (this._size[0] != rhs._size[0] || this._size[1] != rhs._size[1]) {
            throw Error();
        }
        return this.map( (val, [row, col]) => [val, rhs.get([row, col])]);
    }
    consume(): T[][] {
        return this._data;
    }
    transpose(): Matrix<T> {
        let data: T[][] = [];
        for (let i = 0; i < this._size[1]; i++) data.push([]);

        this.forEach( (val, [_, col]) => data[col].push(val) );
        return new Matrix(data);
    }
    rows(): Row<T>[] {
        return this._data.map( row => new Row(row) );
    }
    cols(): Col<T>[] {
        return this.transpose().rows().map( row => new Col(row.consume()[0]) );
    }

    private _size: [number, number];
    private _data: T[][];
}
import {Vec} from './vector.js';

export class Row<T> extends Matrix<T> {
    constructor(data: T[]) {
        super([data]);
    }
    toVec(): Vec<T> {
        return new Vec(this.flatten());
    }
}
export class Col<T> extends Matrix<T> {
    constructor(data: T[]) {
        let _data = data.map(e => [e]);
        super(_data);
    }
    toVec(): Vec<T> {
        return new Vec(this.flatten());
    }
}

export function add(lhs: Matrix<number>, rhs: Matrix<number>): Matrix<number> {
    return lhs.zip(rhs).map( ([v1, v2]) => v1 + v2 );
}
export function sub(lhs: Matrix<number>, rhs: Matrix<number>): Matrix<number> {
    return lhs.zip(rhs).map( ([v1, v2]) => v1 - v2 );
}
export function mul(lhs: Matrix<number>, rhs: Matrix<number>): Matrix<number> {
    if (lhs.size()[1] != rhs.size()[0]) {
        throw Error();
    }

    let matrix = zeros( [lhs.size()[0], rhs.size()[1]] );
    matrix.map( (_, [row_num, col_num]) => {
        let row = lhs.slice([row_num], []);
        let col = rhs.slice([], [col_num]);

        let val = row.zip(col.transpose()).fold( 0, (acc, [v1, v2]) => acc + v1 * v2 );
        matrix.set( [row_num, col_num], val );
    })
    return matrix;
}
export function mul_scal(matrix: Matrix<number>, num: number): Matrix<number> {
    return matrix.map( val => val * num );
}
export function div_scal(matrix: Matrix<number>, num: number): Matrix<number> {
    if (num == 0) throw Error();
    return matrix.map( val => val / num );
}
export function zeros([rows, cols]: [number, number]): Matrix<number> {
    let data: number[][] = [];
    for (let row = 0; row < rows; row++) {
        let row_data = [];
        for (let col = 0; col < cols; col++) {
            row_data.push(0);
        }
        data.push(row_data);
    }
    return new Matrix(data);
}
export function eye(size: number): Matrix<number> {
    let matrix = zeros([size, size]).map( (val, [row, col]) => row == col ? 1 : val );
    return matrix;
}