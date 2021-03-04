module.exports = {
    success (data) {
        this.body = {
            ...data
        }
    },
    fail (data, result = 500) {
        this.body = {
            code: result,
            data
        }
    }
}