const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // Kiwii Labs
    const KLTokenPayout = await ethers.getContractFactory('BondPayoutToken');
    const kltokenPayout = await KLTokenPayout.deploy("Kiwii Labs", "KLABS");
    await kltokenPayout.deployed();
    console.log("Kiwi Labs token Payout Contract: " + kltokenPayout.address);


    const KLTokenPrincipal = await ethers.getContractFactory('BondPrincipalToken');
    const kltokenPrincipal = await KLTokenPrincipal.deploy("Kiwii Labs NLP", "KLABS-ETH NLP");
    await kltokenPrincipal.deployed();
    console.log("Kiwi Labs token Principal Contract: " + kltokenPrincipal.address);

    /// Kiwiii
    const KiwiiTokenPayout = await ethers.getContractFactory('BondPayoutToken');
    const kiwiitokenPayout = await KiwiiTokenPayout.deploy("Kiwii", "KIWII");
    await kiwiitokenPayout.deployed();
    console.log("Kiwi token Payout Contract: " + kiwiitokenPayout.address);


    const KiwiiTokenPrincipal = await ethers.getContractFactory('BondPrincipalToken');
    const kiwiitokenPrincipal = await KiwiiTokenPrincipal.deploy("Kiwii NLP", "KIWII-ETH NLP");
    await kiwiitokenPrincipal.deployed();
    console.log("Kiwi token Principal Contract: " + kiwiitokenPrincipal.address);

    /// Bondii
    const BondiiTokenPayout = await ethers.getContractFactory('BondPayoutToken');
    const bondiitokenPayout = await BondiiTokenPayout.deploy("Bondii", "BDI");
    await bondiitokenPayout.deployed();
    console.log("Bondii token Payout Contract: " + bondiitokenPayout.address);


    const BondiiTokenPrincipal = await ethers.getContractFactory('BondPrincipalToken');
    const bondiitokenPrincipal = await BondiiTokenPrincipal.deploy("Bondii NLP", "BDI-ETH NLP");
    await bondiitokenPrincipal.deployed();
    console.log("Bondii token Principal Contract: " + bondiitokenPrincipal.address);

    /// Farmii
    const FarmiiTokenPayout = await ethers.getContractFactory('BondPayoutToken');
    const farmiitokenPayout = await FarmiiTokenPayout.deploy("Farmii", "FMI");
    await farmiitokenPayout.deployed();
    console.log("Farmii token Payout Contract: " + farmiitokenPayout.address);


    const FarmiiTokenPrincipal = await ethers.getContractFactory('BondPrincipalToken');
    const farmiitokenPrincipal = await FarmiiTokenPrincipal.deploy("Farmii NLP", "FMI-ETH NLP");
    await farmiitokenPrincipal.deployed();
    console.log("Farmii token Principal Contract: " + farmiitokenPrincipal.address);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})