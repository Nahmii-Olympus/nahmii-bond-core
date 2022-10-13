const { ethers } = require("hardhat");

async function main() {

    console.log("Getting Signers");
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    const olympusDAO = "0x15fddc0d0397117b46903c1F6c735b55755C2a3a";
    const olympusTreasury = "0x31F8Cc382c9898b273eff4e0b7626a6987C846E8";
    console.log("Stating Addresses");
  
    // Deplopy Olympus Pro Subsidy Router
    console.log("Deploying Router");
    const OlympusProSubsidyRouter = await ethers.getContractFactory('OPSubsidyRouter');
    const olympusProSubsidyRouter = await OlympusProSubsidyRouter.deploy();
    await olympusProSubsidyRouter.deployed();
    console.log(olympusProSubsidyRouter.address);
    const ownable = await olympusProSubsidyRouter.policy();
    console.log("policy address", ownable);
    
    //Deploying the staking Factory
    console.log("Deploying the staking factory")
    const StakingFactory = await ethers.getContractFactory("olympusStakingFactory");
    const stakingFactory = await StakingFactory.deploy();
    await stakingFactory.deployed();
    console.log("Staking factory deployed", stakingFactory.address);

    // Deplopy Factory storage
    console.log("Deploying Storage");
    const OlympusProFactoryStorage = await ethers.getContractFactory('OlympusProFactoryStorage');
    const olympusProFactoryStorage = await OlympusProFactoryStorage.deploy();
    await olympusProFactoryStorage.deployed();
    console.log(olympusProFactoryStorage.address)

    // Deploy Factory
    console.log("Deploying factory")
    const OlympusProFactory = await ethers.getContractFactory('OlympusProFactory');
    const olympusProFactory = await OlympusProFactory.deploy(olympusTreasury, olympusProFactoryStorage.address, olympusProSubsidyRouter.address, olympusDAO, stakingFactory.address);
    await olympusProFactory.deployed();
    console.log(olympusProFactory.address);

    // Set factory address a in storage
    await olympusProFactoryStorage.setFactoryAddress(olympusProFactory.address);
    console.log("Setting factory New Owner");
    await (await olympusProFactoryStorage.setFactoryAddress(olympusProFactory.address)).wait();

    // Transfer managment
    await olympusProSubsidyRouter.transferManagment(olympusDAO);
    await olympusProFactoryStorage.transferManagment(olympusDAO);
    console.log("Transferring Ownership to DAO")

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