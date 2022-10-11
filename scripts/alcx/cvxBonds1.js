async function main() {

    async function mineBlocks(blockNumber) {
        while (blockNumber > 0) {
          blockNumber--;
          await hre.network.provider.request({
            method: "evm_mine",
            params: [],
          });
        }
    }

    const [deployer, admin, user, mockDAO] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // Deploy Mock Principal token
    const Principal = await ethers.getContractFactory('Principal');
    const principal = await Principal.deploy('1');

    // Deploy Mock Payout token
    const Payout = await ethers.getContractFactory('Payout');
    const payout = await Payout.deploy('1');

    // Deploy Mock Treaury
    const MockTreasury = await ethers.getContractFactory('MockTreasury');
    const mockTreasury = await MockTreasury.deploy(deployer.address);

    // Deplopy Olympus Pro Subsidy Router
    const OlympusProSubsidyRouter = await ethers.getContractFactory('OPSubsidyRouter');
    const olympusProSubsidyRouter = await OlympusProSubsidyRouter.deploy();

    // Deplopy Factory storage
    const OlympusProFactoryStorage = await ethers.getContractFactory('OlympusProFactoryStorage');
    const olympusProFactoryStorage = await OlympusProFactoryStorage.deploy();

    // Deploy Factory
    const OlympusProFactory = await ethers.getContractFactory('OlympusProFactory');
    const olympusProFactory = await OlympusProFactory.deploy(mockTreasury.address, olympusProFactoryStorage.address, olympusProSubsidyRouter.address, mockDAO.address);

    // Toggle factory address a in storage
    await olympusProFactoryStorage.setFactoryAddress(olympusProFactory.address);

    // Get contract factory for custom treasury and custom bond
    const CustomTreasury = await ethers.getContractFactory('CustomOLDTreasury');
    const CustomBond = await ethers.getContractFactory('CustomALCXBond');

    // deploy contracts
    const customTreasury = await CustomTreasury.deploy(payout.address, admin.address);
    const customBond = await CustomBond.deploy(customTreasury.address, principal.address, mockTreasury.address, olympusProSubsidyRouter.address, admin.address, mockDAO.address, ['0'], ['20000'], false);

    // Toggle bond in treasury
    await customTreasury.connect(admin).toggleBondContract(customBond.address);

    // Mint amount of payout token and principal token
    await payout.mint(customTreasury.address, '1594211026029309303922057');
    await principal.mint(user.address, '100000000000000000000000000');

    // Approve bond contract to spend principal tokens
    await principal.connect(user).approve(customBond.address, '10000000000000000000000000');

    // Set vesting rate
    await customBond.connect(admin).setBondTerms('0', '46200');

    /* Assuming ALCX price of $200 and CVX price of $26 */

    // Initialize bond
    await customBond.connect(admin).initializeBond('57000', '46200', '69230768', '10', '40000000000000000000000', '19000000000000000000000');

    console.log("Bond Price BEFORE bonds: " + (await customBond.trueBondPrice()).toString());

    let totalBlocksPassed = 0;
    let bondNum = 1;

    async function bond() {
      while(totalBlocksPassed < 184800) {
        await customBond.connect(user).deposit('1103000000000000000000', '1000000000', user.address );
        console.log("Bond Price After bond (BOND " + (+bondNum) + "): " + (await customBond.trueBondPrice()).toString());

        console.log()

        let blocksPassed = 1600;
        await mineBlocks(1600);
        while((await customBond.trueBondPrice()).toNumber() > 73076922) {
            await mineBlocks(2);
            blocksPassed = blocksPassed + 2;
        }
        totalBlocksPassed = totalBlocksPassed + blocksPassed; 

        console.log("Blocks Passed (BOND " + (+bondNum + +1) + "): " +  blocksPassed);
        console.log("Bond Price after day (BOND " + (+bondNum + +1) + "): " +  (await customBond.trueBondPrice()).toString());
        bondNum++;
      }
    }
    
    await bond();

    console.log("Total Blocks Passed: " + totalBlocksPassed);
    console.log("Payout given: " + (await customBond.totalPayoutGiven()).toString());
    console.log("Principal Bonded: " + (await customBond.totalPrincipalBonded()).toString());
    console.log("PRINCIPAL FEES TAKEN IN: " + (await principal.balanceOf(mockTreasury.address)).toString());


}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})