const Asset = require('parcel-bundler/src/Asset.js');
const convertCssStringIntoJsModule = require('@lsegurado/ls-convert-css-to-js-module/bin/convertCssStringIntoJsModule');

class cssAsset extends Asset {
    constructor(...args) {
        super(...args);
        this.type = 'js';
    }
    parse(style: string) {
        return convertCssStringIntoJsModule(style);
    }
    generate() {
        return this.ast;
    }
}
module.exports = cssAsset;
