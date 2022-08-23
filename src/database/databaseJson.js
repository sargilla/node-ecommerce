const fs = require('fs')
const path = require('path')

module.exports = {
    readJson: function (filename) {
        const pJson = fs.readFileSync(path.join(__dirname, filename));
        try {
            const elements = JSON.parse(pJson)
            return elements
        } catch (e) {
            console.log(`el archivo  ${pJson} puede estar vacio`)
            return []
        }
    },
    writeJson: function (dataArray, filename) {
        const data = JSON.stringify(dataArray, null, 4)
        const pJson = fs.writeFileSync(path.join(__dirname, filename), data);
        return pJson
    },
    lastElementId: function(array) {
        if (array.length == 0) { return 0 }
        return Math.max(...array.map(ele => ele.id))
    },
}