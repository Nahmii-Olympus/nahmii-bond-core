// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "./interfaces/IOlympusProFactoryStorage.sol";

import "./OlympusProCustomBond.sol";
import "./OlympusProCustomTreasury.sol";
import "./olympus-staking/stake-olympus.sol";

contract OlympusProFactory {
    
    /**
     * ===================================================
     * ----------------- STATE VARIABLE ------------------
     * ===================================================
     */

    address immutable private olympusProFactoryStorage;
    address immutable private olympusProSubsidyRouter;
    address immutable public olympusDAO;
    address public olympusTreasury;


    /**
     * ===================================================
     * ----------------- MODIFIERS -----------------------
     * ===================================================
     */

    modifier onlyDAO() {
        require( olympusDAO == msg.sender, "caller is not the DAO" );
        _;
    }
    

    /**
     * ===================================================
     * ----------------- CONSTRUCTION --------------------
     * ===================================================
     */
    
    /// @notice Here a good number of the state variable were  initailized 
    /// @param _olympusTreasury: this is the tresure where the fee would be sent to 
    /// @param _olympusProFactoryStorage: This is the contract that is hanlding the store of the addresses 
    /// @param _olympusProSubsidyRouter; This is the address on the sudidy router
    /// @param _olympusDAO: This is the address of the DAO changes done in this contract would be handled by this address.
    constructor(address _olympusTreasury, address _olympusProFactoryStorage, address _olympusProSubsidyRouter, address _olympusDAO) {
        require( _olympusTreasury != address(0) );
        olympusTreasury = _olympusTreasury;
        require( _olympusProFactoryStorage != address(0) );
        olympusProFactoryStorage = _olympusProFactoryStorage;
        require( _olympusProSubsidyRouter != address(0) );
        olympusProSubsidyRouter = _olympusProSubsidyRouter;
        require( _olympusDAO != address(0) );
        olympusDAO = _olympusDAO;
    }
    

    /**
     * ===================================================
     * ----------------- FUNCTIONS -----------------------
     * ===================================================
     */

    
    /**
        @notice change Olympus Treasury address, Only the olympus Tresury can make this change
        @param _olympusTreasury address on the new olympus Treasury
     */
    function changeTreasuryAddress(address _olympusTreasury) external onlyDAO() {
        olympusTreasury = _olympusTreasury;
    }
    
    /**
        @notice deploys custom treasury and custom bond contracts and returns address of both
        @param _payoutToken address
        @param _principalToken address
        @param _initialOwner address
        @param _tierCeilings uint[]
        @param _fees uint[]
        @param _feeInPayout bool
        @return _treasury address
        @return _bond address
     */
    function createBondAndTreasury(address _payoutToken, address _principalToken, address _initialOwner, uint[] calldata _tierCeilings, uint[] calldata _fees, bool _feeInPayout) external onlyDAO() returns(address _treasury, address _bond) {
    
        CustomTreasury treasury = new CustomTreasury(_payoutToken, _initialOwner);
        CustomBond bond = new CustomBond(address(treasury), _principalToken, olympusTreasury, olympusProSubsidyRouter, _initialOwner, olympusDAO, _tierCeilings, _fees, _feeInPayout);
        Staking stakingContract = new Staking(_payoutToken);
        
        return IOlympusProFactoryStorage(olympusProFactoryStorage).pushBond(
            _principalToken, address(treasury), address(bond), address(stakingContract), _initialOwner, _tierCeilings, _fees
        );
    }

    /**
        @notice deploys custom bond using the a already deployed bond contract
        @param _principalToken address of the intake token 
        @param _customTreasury address of the custom  deployed treasury 
        @param _initialOwner address of the accont to be the owner of this bond 
        @param _tierCeilings uint[] 
        @param _fees uint[]
        @param _feeInPayout bool
        @return _treasury address
        @return _bond address
     */
    function createBond(address _principalToken, address _customTreasury, address _initialOwner, uint[] calldata _tierCeilings, uint[] calldata _fees, bool _feeInPayout ) external onlyDAO() returns(address _treasury, address _bond) {

        CustomBond bond = new CustomBond(_customTreasury, _principalToken, olympusTreasury, olympusProSubsidyRouter, _initialOwner, olympusDAO, _tierCeilings, _fees, _feeInPayout);

        return IOlympusProFactoryStorage(olympusProFactoryStorage).pushBond(
            _principalToken, _customTreasury, address(bond), _initialOwner, _tierCeilings, _fees
        );
    }
    
}