const AssetDistibutor = artifacts.require("AssetDistibutor");

module.exports = function(deployer) {
   deployer.deploy(AssetDistibutor);
};
