import {add, Vec, VecNum, norm_sq, dot, scal, cross} from './vector.js';

export class Quat {
    constructor(data: number[]) {
        if (data.length != 4) throw Error();
        this._s = data[0];
        this._v = new Vec( data.slice(1) );
    }
    static from(angle: number, vec: VecNum): Quat {
        if (vec.len() != 3) throw Error();
        let s = Math.cos(angle / 2.0);
        let v = vec.map( val => Math.sin(angle / 2.0) * val );
        return new Quat( [ s, v.get(0), v.get(1), v.get(2)] );
    }
    norm(): number {
        return Math.sqrt( this.norm_sq() );
    }
    norm_sq(): number {
        return this.s * this.s + norm_sq(this._v);
    }

    mul(rhs: Quat): Quat {
        let s = this.s * rhs.s - dot(this._v, rhs.v);
        let v1 = scal(rhs.v, this.s); 
        let v2 = scal(this.v, rhs.s);
        let v3 = cross(this.v, rhs.v);
        let v = add(v1, add(v2, v3)); 
        return new Quat( [s, v.get(0), v.get(1), v.get(2)] );
    }
    
    get s(): number {
        return this._s;
    }
    get v(): VecNum {
        return this._v;
    }
    
    private _s: number;
    private _v: VecNum;
}