import { Quat } from "./quaternion.js";
import { VecNum, scal, dot, cross, add } from "./vector.js";

export function rotate(vec: VecNum, quat: Quat): VecNum {
    let v1 = scal(quat.v, 2 * dot(vec, quat.v));
    let v2 = scal(vec, quat.s * quat.s - dot(quat.v, quat.v));
    let v3 = scal(cross(vec, quat.v), 2 * quat.s);
    let vr = add(v1, add(v2, v3));
    return vr;
}