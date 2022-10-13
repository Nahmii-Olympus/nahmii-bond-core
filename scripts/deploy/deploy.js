const { ethers } = require("hardhat");

async function main() {

    console.log("Getting Signers");
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    console.log("Stating Addresses");
    const olympusDAO = "0x4D8071E0A353B42E62d7CD37F307EBC057A21BD5";
    const olympusTreasury = "0xFdB6f40f0e45f1F0a4BBc5A0F398a15DdB67f57f";

    console.log("Deploying Router");
    const OlympusProSubsidyRouter = await ethers.getContractFactory('OPSubsidyRouter');
    const olympusProSubsidyRouter = await OlympusProSubsidyRouter.deploy();
    await olympusProSubsidyRouter.deployed();
    console.log(olympusProSubsidyRouter.address);

    console.log("Deploying Storage");
    const OlympusProFactoryStorage = await ethers.getContractFactory('OlympusProFactoryStorage');
    const olympusProFactoryStorage = await OlympusProFactoryStorage.deploy();
    await olympusProFactoryStorage.deployed();
    console.log(olympusProFactoryStorage.address)

    console.log("Deploying factory")
    const OlympusProFactory = await ethers.getContractFactory('OlympusProFactory');
    const olympusProFactory = await OlympusProFactory.deploy(olympusTreasury, olympusProFactoryStorage.address, olympusProSubsidyRouter.address, olympusDAO);
    await olympusProFactory.deployed();
    console.log(olympusProFactory.address);

    console.log("Setting factory New Owner");
    await (await olympusProFactoryStorage.setFactoryAddress(olympusProFactory.address)).wait();

    console.log("Transferring Ownership to DAO")
    await (await olympusProSubsidyRouter.transferManagment(olympusDAO)).wait();
    await (await olympusProFactoryStorage.transferManagment(olympusDAO)).wait();

    console.log("Subsidy Router: " + olympusProSubsidyRouter.address);
    console.log("Olympus Pro Storage: " + olympusProFactoryStorage.address);
    console.log("Olympus Pro Factory: " + olympusProFactory.address);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})