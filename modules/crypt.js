module.exports.crypt = (str, shift, action) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    if (action !== 'encode') shift *= -1
    return str.split('').map(letter => {
        debugger
        const lowerCaseLetter = letter.toLowerCase()
        const indexLetter = alphabet.indexOf(lowerCaseLetter)
        if (indexLetter >= 0) {
            const isLowerCaseLetter = letter === lowerCaseLetter
            let shiftCrypt = (indexLetter + shift) % alphabet.length
            if (shiftCrypt < 0) {
                shiftCrypt += alphabet.length
            }
            let cryptoLetter = alphabet[shiftCrypt]
            if (!isLowerCaseLetter) return cryptoLetter.toUpperCase()
            return cryptoLetter
        } else return letter
    }).join('')
}