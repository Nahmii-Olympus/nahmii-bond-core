// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "./interfaces/IOlympusProFactoryStorage.sol";

import "./OlympusProCustomBond.sol";
import "./OlympusProCustomTreasury.sol";
import {Staking} from "./olympus-staking/stake-olympus.sol";

contract OlympusProFactory {

    address immutable private olympusProFactoryStorage;
    address immutable private olympusProSubsidyRouter;
    address immutable public olympusDAO;
    address public olympusTreasury;

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
    


    function changeTreasuryAddress(address _olympusTreasury) external {
        onlyDAO;
        olympusTreasury = _olympusTreasury;
    }
    

    function onlyDAO() internal view {
        require( olympusDAO == msg.sender, "caller is not the DAO" );
    }

    function createBondAndTreasury(address _payoutToken, address _principalToken, address _initialOwner, uint[] calldata _tierCeilings, uint[] calldata _fees, bool _feeInPayout) external returns(address _treasury, address _bond) {
        onlyDAO;
        CustomTreasury treasury = new CustomTreasury(_payoutToken, _initialOwner);
        CustomBond bond = new CustomBond(address(treasury), _principalToken, olympusTreasury, olympusProSubsidyRouter, _initialOwner, olympusDAO, _tierCeilings, _fees, _feeInPayout);
        // Staking stakingContract = new Staking(_payoutToken);
        address stakingContract = address(0);
        
        
        return IOlympusProFactoryStorage(olympusProFactoryStorage).pushBond(
            [_principalToken, address(treasury), address(bond), address(stakingContract), _initialOwner], _tierCeilings, _fees
        );
    }    
}