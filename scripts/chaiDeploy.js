const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.getContractFactory("Chai");
  //instance of contract
  const contract = await chai.deploy();
  //deploying the instance of the contract
  await contract.deployed();
  console.log("Contract address", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
