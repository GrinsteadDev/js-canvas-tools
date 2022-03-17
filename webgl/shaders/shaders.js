import { default_frag } from "./fragment/default.js";
import { default_vert } from "./vertex/default.js";

/**
 * A collection of often used shaders from most basic "default" to more complex ones.
 * These shaders are intended to be used with the provided shapes api; however, they can
 * be used with custom implementations.
 */
const shaders = {
    default: {
        fragment: default_frag,
        vertex: default_vert
    }
}

export { shaders };