// this script would be responsible for initializing a bond: This script would take the address of a bond and call the set bond term and initalize bond function 



const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log('Signer that would be making changes: ' + deployer.address);

    KiwiLabsPayoutToken = "0x5118a1875197aFB7AC1D7711851a71183ADECEE0";
    KiwiLabsPrincipalToken = "0xF7Bb849857e48877f39007BabaC0E4DdC5fD1B5C";
    
    KiwiPayoutToken  = "0x95bf3239768e61d98B6B89EFe9a2FaBd89f6A644";
    KiwiPrincipalToken = "0x63C27dDcb6C3BB9ccB4247DBa75Ce813955a87DC";
    
    BondiiPayoutToken = "0x5cf44F9E9dEffDbF1C54fD516F525A0348B56445";
    BondiiPrincipalToken = "0x4d219E15bc25866B73221859064cd7E1DA6382A8";

    FarmiiPayoutToken = "0xcc2719eb63f692B908F508B2822C5aBB796655a8";
    FarmiiPrincipalToken = "0x1F61b170E3dF614CCE5a0dC02FF06C15650aC478";

    const RecieverAddress = "0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7";
    const sendAmount = ethers.utils.parseEther("500");

    // KIWII LABS
    console.log("Sending KiwiLabsPayoutToken");
    const KiwiLabsPayoutTokenSend = await ethers.getContractAt("BondPayoutToken", KiwiLabsPayoutToken);
    await (await KiwiLabsPayoutTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("KiwiLabsPayoutToken Sent");
    console.log("-=----=----=----=----=-");

    console.log("Sending KiwiLabsPrincipalToken");
    const KiwiLabsPrincipalTokenSend = await ethers.getContractAt("BondPrincipalToken", KiwiLabsPrincipalToken);
    await (await KiwiLabsPrincipalTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("KiwiLabsPrincipalToken Sent");
    console.log("-=----=----=----=----=-");

    // KIWII
    console.log("Sending KiwiPayoutToken");
    const KiwiPayoutTokenSend = await ethers.getContractAt("BondPayoutToken", KiwiPayoutToken);
    await (await KiwiPayoutTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("KiwiPayoutToken Sent");
    console.log("-=----=----=----=----=-");

    console.log("Sending KiwiPrincipalToken");
    const KiwiPrincipalTokenSend = await ethers.getContractAt("BondPrincipalToken", KiwiPrincipalToken);
    await (await KiwiPrincipalTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("KiwiPrincipalToken Sent");
    console.log("-=----=----=----=----=-");


    // BONDII
    console.log("Sending BondiiPayoutToken");
    const BondiiPayoutTokenSend = await ethers.getContractAt("BondPayoutToken", BondiiPayoutToken);
    await (await BondiiPayoutTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("BondiiPayoutToken Sent");
    console.log("-=----=----=----=----=-");

    console.log("Sending BondiiPrincipalToken");
    const BondiiPrincipalTokenSend = await ethers.getContractAt("BondPrincipalToken", BondiiPrincipalToken);
    await (await BondiiPrincipalTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("BondiiPrincipalToken Sent");
    console.log("-=----=----=----=----=-");


    // FARMII
    console.log("Sending FarmiiPayoutToken");
    const FarmiiPayoutTokenSend = await ethers.getContractAt("BondPayoutToken", FarmiiPayoutToken);
    await (await FarmiiPayoutTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("FarmiiPayoutToken Sent");
    console.log("-=----=----=----=----=-");

    console.log("Sending FarmiiPrincipalToken");
    const FarmiiPrincipalTokenSend = await ethers.getContractAt("BondPrincipalToken", FarmiiPrincipalToken);
    await (await FarmiiPrincipalTokenSend.transfer(RecieverAddress, sendAmount)).wait();
    console.log("FarmiiPrincipalToken Sent");
    console.log("-=----=----=----=----=-");

}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})

