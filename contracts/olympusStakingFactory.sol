// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;


import {Staking} from "./olympus-staking/stake-olympus.sol";

contract olympusStakingFactory {

    

        function createNewStake(address _payoutToken) external returns(address ) {
    
        Staking stakingContract = new Staking(_payoutToken);
        return address(stakingContract);
    }

}