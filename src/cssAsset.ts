const Asset = require('parcel-bundler/src/Asset.js');
const fs: typeof import('fs') = require('fs');

class cssAsset extends Asset {
    constructor(...args) {
        super(...args);
        this.type = 'js';
    }
    parse(style: string) {
        const regexImports = new RegExp(/@import '[^']*';|@import "[^"]*";/, 'g');
        const imports = style.match(regexImports);
        const importsFormatted = imports ? imports.map((value, index) => value.replace('@import', `import style${index} from `)) : [];
        const styleWithoutImports = style.replace(regexImports, '');

        let resultString = '';
        if (importsFormatted.length > 0) {
            importsFormatted.forEach(importFormatted => resultString = resultString.concat(importFormatted));
            resultString = resultString.concat(`let style = '${this.minifyString(styleWithoutImports)}';`);
            importsFormatted.forEach((_value, index) => resultString = resultString.concat(`style = style.concat(style${index});`));
            resultString = resultString.concat(`export default style;`);
        } else {
            resultString = resultString.concat(`export default '${this.minifyString(styleWithoutImports)}';`);
        }
        return resultString;
    }
    generate() {
        return this.ast;
    }
    minifyString(string) {
        return string.replace(/\s+/g, ' ').trim();
    }
}
module.exports = cssAsset;
