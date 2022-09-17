const get_eqn = (length) => {
    if (length == 8) {
        return ["9","3","/","4","^","=","8","1"]
    } else {
        return ["9","3","/","4","+","5","*","=","3","5"]
    }

}


module.exports = { get_eqn };

module.exports.add = function (x) {
    return x;
};