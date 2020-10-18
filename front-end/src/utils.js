export const pingPong = (x, max) => {
    let ret = x % (2 * max);
    ret = ret > x ? 2 * x - ret : ret;
    return ret;
};