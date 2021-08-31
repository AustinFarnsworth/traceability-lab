module.exports = {
    getPath: (req, res) => {
        res.sendFile(path.join(__dirname, '/client/index.html'))
        rollbar.info('html file served succesfully')
    }
}
