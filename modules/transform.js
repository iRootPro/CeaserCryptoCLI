const stream = require('stream')
const {pipeline} = require('stream')
const {getInputFile, getOutputFile, getShift, getAction} = require('./args')
const fs = require('fs')
const {crypt} = require('./crypt')

const cryptStream = new stream.Transform({objectMode: true});

cryptStream._transform = (chunk, encoding, cb) => {
    try {
        cb(null, crypt(chunk.toString(), getShift(), getAction()))
    } catch (err) {
        cb(err)
    }
}

const coding = () => {
    let inputStream
    let outputStream
    if (getInputFile()) {
        inputStream = fs.createReadStream(getInputFile())
    } else {
        console.log('Enter phrase to encode or decode:')
        inputStream = process.stdin
    }

    if (getOutputFile()) {
        outputStream = fs.createWriteStream(getOutputFile(), {flags: 'a'})
    } else {
        outputStream = process.stdout
    }

    pipeline(
        inputStream,
        cryptStream,
        outputStream,
        err => {
            if (err) {
                console.error('Failed', err)
            } else {
                console.log('Done')
            }
        }
    )
}


module.exports = {coding}