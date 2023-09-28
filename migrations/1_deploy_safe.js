const fs = require("fs");
const SafeContract = artifacts.require("SafeContract");

module.exports = async function (deployer) {
  await deployer.deploy(SafeContract);
  const instance = await SafeContract.deployed();
  let safeContractAddress = await instance.address;

  let config = "export const safeContractAddress = " + safeContractAddress;

  console.log("safeContractAddress = " + safeContractAddress);

  let data = JSON.stringify(config);

  fs.writeFileSync("config.js", JSON.parse(data));
};