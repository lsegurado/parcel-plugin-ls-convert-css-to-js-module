const Asset = require('parcel-bundler/src/Asset.js');
const fs: typeof import('fs') = require('fs');

class cssAsset extends Asset {
    constructor(...args) {
        super(...args);
        this.type = 'js';
    }
    parse(style: string) {
        const regexImports = new RegExp(/@import '[^']*';|@import "[^"]*";/, 'g');
        const imports: Array<string> = style.match(regexImports);
        const cssFileDir = this.basename.replace(this.name,'');
        process.chdir(cssFileDir);
        const importsFormatted = imports ? imports.map(value => value.replace('@import ', '').replace('\'', '').replace('\"', '').replace(';','').replace('\'','')).map(value => fs.readFileSync(value, "utf8")) : [];
        const styleWithoutImports = style.replace(regexImports, '');

        let resultString = '';
        if (importsFormatted.length > 0) {
            const styles: string[] = importsFormatted;
            styles.forEach(style => resultString = resultString.concat(style));
            resultString = resultString.concat(styleWithoutImports);
        } else {
            resultString = styleWithoutImports;
        }
        return `export default '${this.minifyString(resultString)}'`
    }
    generate() {
        return this.ast;
    }

    minifyString(string) {
        return string.replace(/\s+/g, ' ').trim();
    }
}
module.exports = cssAsset;
