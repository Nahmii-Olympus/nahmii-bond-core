const { ethers } = require("hardhat");

async function main() {

    console.log("Getting Signers");
    const [deployer, dao] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // token constant 

    const KIWII_LABS_PAYOUT = "0xFdc78DA8Bbd584C6f6E14468c77b6f09105CA63f";
    const KIWII_LABS_PRINCIPAL = "0xaDBA987955Eac146f1983062100046be46e632fA";

    const KIWII_PAYOUT = "0x9e92DE115F6c5a66c77062434Fa4F787Fd32daa9";
    const KIWII_PRINCIPAL = "0xE9d590484Cf0e68FF30bb5589658CD9B6cEd096f";

    const BONDII_PAYOUT = "0x0519C43Cdf9B75Ba0a265B3330655A0cAF6D4ED3";
    const BONDII_PRINCIPLE = "0x1d4657f5dD44ff59E14973862e0749978B74A7c0";

    const FARMII_PAYOUT = "0xD410219f5C87247d3F109695275A70Da7805f1b1";
    const FARMII_PRINCIPLE = "0x5C8f5D80FD653a885832dF5c1f09978C81A8cDC4";


    const olympusDAO = dao.address;
    const olympusTreasury = "0xf8E1d24aD086738fF31D31040967507801377B64";
    console.log("Stating Addresses");
  
    // Deploy Olympus Pro Subsidy Router
    console.log("Deploying Router");
    const OlympusProSubsidyRouter = await ethers.getContractFactory('OPSubsidyRouter');
    const olympusProSubsidyRouter = await OlympusProSubsidyRouter.deploy();
    await olympusProSubsidyRouter.deployed();
    console.log("Subsidy Router has been deployed");

    
    //Deploying the staking Factory
    console.log("Deploying the staking factory")
    const StakingFactory = await ethers.getContractFactory("olympusStakingFactory");
    const stakingFactory = await StakingFactory.deploy();
    await stakingFactory.deployed();


    // Deplopy Factory storage
    console.log("Deploying Storage");
    const OlympusProFactoryStorage = await ethers.getContractFactory('OlympusProFactoryStorage');
    const olympusProFactoryStorage = await OlympusProFactoryStorage.deploy();
    await olympusProFactoryStorage.deployed();


    // Deploy Factory
    console.log("Deploying factory")
    const OlympusProFactory = await ethers.getContractFactory('OlympusProFactory');
    const olympusProFactory = await OlympusProFactory.deploy(olympusTreasury, olympusProFactoryStorage.address, olympusProSubsidyRouter.address, olympusDAO, stakingFactory.address);
    await olympusProFactory.deployed();


    // Set factory address a in storage
    console.log("Setting factory address in storage");
    await olympusProFactoryStorage.setFactoryAddress(olympusProFactory.address);
    console.log("Setting factory New Owner");
    await (await olympusProFactoryStorage.setFactoryAddress(olympusProFactory.address)).wait();

    // Transfer managment
    await olympusProSubsidyRouter.transferManagment(olympusDAO);
    await olympusProFactoryStorage.transferManagment(olympusDAO);
    console.log("Transferring Ownership to DAO");


    console.log("Subsidy Router: " + olympusProSubsidyRouter.address);
    console.log("Olympus Pro Storage: " + olympusProFactoryStorage.address);
    console.log("Olympus Pro Factory: " + olympusProFactory.address);
    console.log("Staking Factory: " + stakingFactory.address);


    console.log("===== Carrying out Init transactions ====");

    console.log('Creating Bond and Treasury for partners');

    console.log("KIWII LABS");

    await (await olympusProFactory.createBondAndTreasury(KIWII_LABS_PAYOUT, KIWII_LABS_PRINCIPAL, olympusDAO, ["0"], ["33300"], true)).wait();

    console.log("KIWII");

    await (await olympusProFactory.createBondAndTreasury(KIWII_PAYOUT, KIWII_PRINCIPAL, olympusDAO, [0], [33300], true)).wait();

    console.log("Bondii");

    await (await olympusProFactory.createBondAndTreasury(BONDII_PAYOUT, BONDII_PRINCIPLE, olympusDAO, [0], [33300], true)).wait();

    console.log("Farmii");

    await (await olympusProFactory.createBondAndTreasury(FARMII_PAYOUT, FARMII_PRINCIPLE, olympusDAO, [0], [33300], true)).wait();


    console.log("INITIALIZING BOND");

    console.log('Obtaining the bonds and treasury');

    const BOND_AND_TRESURY_KIWII_LABS = await olympusProFactoryStorage.bondDetails(0);
    const BOND_AND_TRESURY_KIWII = await olympusProFactoryStorage.bondDetails(1);
    const BOND_AND_TRESURY_BONDII = await olympusProFactoryStorage.bondDetails(2);
    const BOND_AND_TRESURY_FARMII = await olympusProFactoryStorage.bondDetails(3);

    console.log("====== Frontend Data ========");
    console.log(BOND_AND_TRESURY_KIWII_LABS);
    console.log(BOND_AND_TRESURY_KIWII);
    console.log(BOND_AND_TRESURY_BONDII);
    console.log(BOND_AND_TRESURY_FARMII);
    console.log("=============================");


    console.log("------------------------");

    const customBondKiwiLab = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_KIWII_LABS._bondAddress);
    await (await customBondKiwiLab.connect(dao).setBondTerms('0', '46200')).wait();
    await (await customBondKiwiLab.connect(dao).initializeBond('500000', '46200', '1476000', '4', '60000000000000000000', '30000000000000000000')).wait();

    console.log("------------------------");

    const customBondKiwi = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_KIWII._bondAddress);
    await (await customBondKiwi.connect(dao).setBondTerms('0', '46200')).wait();
    await (await customBondKiwi.connect(dao).initializeBond('500000', '46200', '1476000', '4', '60000000000000000000', '30000000000000000000')).wait();


    console.log("------------------------");


    const customBondBondii = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_BONDII._bondAddress);
    await (await customBondBondii.connect(dao).setBondTerms('0', '46200')).wait();
    await (await customBondBondii.connect(dao).initializeBond('500000', '46200', '1476000', '4', '60000000000000000000', '30000000000000000000')).wait();


    console.log("------------------------");

    const customBondFarmii = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_FARMII._bondAddress);
    await (await customBondFarmii.connect(dao).setBondTerms('0', '46200')).wait();
    await (await customBondFarmii.connect(dao).initializeBond('500000', '46200', '1476000', '4', '60000000000000000000', '30000000000000000000')).wait();


    console.log("------------------------");




}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})