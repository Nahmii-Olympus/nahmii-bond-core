// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IERC20.sol";
contract Staking {

    uint public stakeReward; // Amount of token provided for rewards 
    uint totalStaked; // Total amount of tokens staked by users through vesting 
    IERC20 stakeToken; // contrac addres of token to be staked 

    event Staked(address indexed user, uint amount);
    event Withdrawn(address indexed user, uint amount);


    // Details of each user staking
    struct userDetail {
        uint amountStaked;
        uint stakeTime;
    }

    // mapping of address to struct of the details of the user
    mapping (address => userDetail) UserDetails;

    /// @notice Sets the token address 
    /// @param _stakeToken: This is the token to be staked
    constructor( address _stakeToken) {
        stakeToken = IERC20(_stakeToken);
    }

    /// @notice this function allows admin to add reward to the function 
   /// @param _amount: this is the amount to tokens to be deposited 
    function addReward( uint _amount)public {
        assert(_amount > 0);
        assert(IERC20(stakeToken).transferFrom(msg.sender, address(this), _amount));
        stakeReward += _amount; 
    }


   

    /// @param _amount: This is the amount of staking token the user want tot stake 
    /// @notice this function would be used by a user on the bonnd contract to stake token.
    function stake (uint _amount) public {

        userDetail storage usr = UserDetails[msg.sender];
        assert(_amount > 0);
        assert(usr.amountStaked == 0);
        assert(IERC20(stakeToken).transferFrom(msg.sender, address(this), _amount));
        usr.stakeTime = block.timestamp;
        usr.amountStaked = _amount;
        totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }

    /// @notice this function would calucate the reward the usr can claim
    /// @param addr: this is the address that is claiming 
    function calculateReward(address addr) 
    public 
    view
    returns(uint _currentReward)
     {
        userDetail memory usr = UserDetails[addr];
        _currentReward = (usr.amountStaked * stakeReward * 1e12) / (totalStaked / 1e6); 
    }

    /// @notice this function would be used to unstake 
    function withdrawStake () external {
       userDetail storage usr = UserDetails[msg.sender];
       uint releaseTime = usr.stakeTime + 30 days;
       assert(block.timestamp >= releaseTime);
       uint calcReward = (calculateReward(msg.sender) / 1e6);
       uint reward = calcReward + usr.amountStaked;
       totalStaked -= usr.amountStaked;
       usr.amountStaked = 0;
       usr.stakeTime = 0;
       stakeReward -= calcReward;
       IERC20(stakeToken).transfer(msg.sender, reward);
       emit Withdrawn (msg.sender, reward);
    }
   
}
