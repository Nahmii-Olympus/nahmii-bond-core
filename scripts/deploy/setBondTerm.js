const { ethers } = require("hardhat");

async function main() {

    console.log("Getting Signers");
    const [deployer, dao] = await ethers.getSigners();

    const STORAGE_CONTRACT = "";

    const olympusProFactoryStorage = await ethers.getContractAt("OlympusProFactoryStorage", STORAGE_CONTRACT)




    const BOND_AND_TRESURY_KIWII_LABS = await olympusProFactoryStorage.bondDetails(0);
    const BOND_AND_TRESURY_KIWII = await olympusProFactoryStorage.bondDetails(1);
    const BOND_AND_TRESURY_BONDII = await olympusProFactoryStorage.bondDetails(2);
    const BOND_AND_TRESURY_FARMII = await olympusProFactoryStorage.bondDetails(3);


    console.log("------------------------");

    const customBondKiwiLab = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_KIWII_LABS._bondAddress);
    await (await customBondKiwiLab.connect(dao).setBondTerms('1', '1000')).wait();
    await (await customBondKiwiLab.connect(dao).setBondTerms('2', '1000000000000000000000')).wait();

    console.log("------------------------");

    const customBondKiwi = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_KIWII._bondAddress);
    await (await customBondKiwi.connect(dao).setBondTerms('1', '1000')).wait();
    await (await customBondKiwiLab.connect(dao).setBondTerms('2', '1000000000000000000000')).wait();


    console.log("------------------------");


    const customBondBondii = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_BONDII._bondAddress);
    await (await customBondBondii.connect(dao).setBondTerms('1', '1000')).wait();
    await (await customBondKiwiLab.connect(dao).setBondTerms('2', '1000000000000000000000')).wait();


    console.log("------------------------");

    const customBondFarmii = await ethers.getContractAt("CustomBond", BOND_AND_TRESURY_FARMII._bondAddress);
    await (await customBondFarmii.connect(dao).setBondTerms('1', '1000')).wait();
    await (await customBondKiwiLab.connect(dao).setBondTerms('2', '1000000000000000000000')).wait();


    console.log("------------------------");




}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})