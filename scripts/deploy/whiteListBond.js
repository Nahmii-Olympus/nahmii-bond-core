const { ethers } = require("hardhat");

async function main() {

    console.log("Getting Signers");
    const [deployer, dao] = await ethers.getSigners();


    const _t1 = "0xb33a2C955ac21d73Eaa8805E1A8dd1D8c6248992"
    const _t2 = "0x8F65E5E451dFA2c6444DbE3D46418656D0699bcB"
    const _t3 = "0x9BE1bF1AbC52c35d83F35b107A562F23faB615E1"
    const _t4 = "0x36a88435207f0D6fbdfd87821726202B7E166C50"


    const t1 = await ethers.getContractAt("CustomTreasury", "0xF1eEeA46e6027CF0FF59c988b0616Ae48a752f39");
    const t2 = await ethers.getContractAt("CustomTreasury", "0xf18067098a2a67E0A1a652799cA02fDB3DFfA8d4");
    const t3 = await ethers.getContractAt("CustomTreasury", "0x62F819DF23e8623291413A27f049bD47eB9624fF");
    const t4 = await ethers.getContractAt("CustomTreasury", "0x309989Ef3310f81837Ef5492B3961A4CB48fd03f");




    await (await t1.connect(dao).whitelistBondContract(_t1)).wait();
    await (await t2.connect(dao).whitelistBondContract(_t2)).wait();
    await (await t3.connect(dao).whitelistBondContract(_t3)).wait();
    await (await t4.connect(dao).whitelistBondContract(_t4)).wait();


    console.log("DONE!!!!");


 



}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})