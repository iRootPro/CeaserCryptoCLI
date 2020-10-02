const {program} = require('commander')
const fs = require('fs')

program
    .storeOptionsAsProperties(false)

program
    .option('-s, --shift <offset>', 'a shift')
    .option('-i, --input <inputFilename>', 'an input file')
    .option('-o, --output <outputFilename>', 'an output file')
    .option('-a, --action <action>', 'an action encode/decode')

program.parse(process.argv)

const programOpts = program.opts()

const validArgs = () => {
    if (!programOpts.shift) {
        console.error('Shift argument must be required, --shift')
        process.exit(1)
    }
    if (!programOpts.action) {
        console.error('Action argument must be required, --action')
    }
    if (programOpts.input) {
        fs.access(programOpts.input, fs.constants.F_OK, err => {
            if (err) {
                console.error(`Problem with file ${programOpts.input}`, err.message)
                process.exit(1)
            }
        })
    }
    if (programOpts.output) {
        fs.access(programOpts.output, fs.constants.W_OK, err => {
            if (err) {
                console.error(`Problem with file ${programOpts.output}`, err.message)
                process.exit(1)
            }
        })
    }
    if (isNaN(programOpts.shift) || !Number.isInteger(+programOpts)) {
        console.error('Shift is invalid. Shift must be integer number')
        process.exit(1)
    }
}

const getShift = () => {
    return +programOpts.shift
}

const getAction = () => {
    return programOpts.action
}

const getInputFile = () => {
    return programOpts.input || false
}

const getOutputFile = () => {
    return programOpts.output || false
}


module.exports = {
    validArgs,
    getShift,
    getAction,
    getInputFile,
    getOutputFile
}