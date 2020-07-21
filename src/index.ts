import type ParcelBundler from "parcel-bundler";

module.exports = function (bundler: ParcelBundler) {
    bundler.addAssetType('css', require.resolve('./cssAsset'));
};
