const generateRandomString = function () {
    return Math.random().toString(20).substr(2, 8)
}
export default generateRandomString