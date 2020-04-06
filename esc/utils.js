const isAlphaNum = s => {
    if (typeof s !== "string") return false;
    let alphanumRe = /[^a-z0-9]/i;
    return !(alphanumRe.test(s) || s.length === 0);
};

module.exports = {
    isAlphaNum
};
