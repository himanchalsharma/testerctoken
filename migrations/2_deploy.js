const TCCToken = artifacts.require("./TCCToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TCCToken);
};
