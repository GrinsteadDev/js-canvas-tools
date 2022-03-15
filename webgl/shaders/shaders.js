import { frag } from "./fragment/default.js";
import { vert } from "./vertex/default.js";

const shaders = {
    default: {
        fragment: frag,
        vertex: vert
    }
}

export { shaders };