// this script would be responsible for initializing a bond: This script would take the address of a bond and call the set bond term and initalize bond function 



const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log('Signer that would be making changes: ' + deployer.address);

    const BOND_ADDR = "";


    console.log("Calling setBond terms");
    const customBond = ethers.getContractAt("CustomBond", BOND_ADDR);

    await (await customBond.setBondTerms('0', '46200')).wait();

    console.log("Bond terms Has been set");


    console.log("-=----=----=----=----=-");


    console.log("Init Bond ")

    await (await customBond.initializeBond('500000', '46200', '1476000', '4', '60000000000000000000', '30000000000000000000')).wait();
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})

