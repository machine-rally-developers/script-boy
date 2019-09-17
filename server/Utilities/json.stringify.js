let stringify = data => {

    return typeof data === "object" ? JSON.stringify(data) : data
}
module.exports = stringify;