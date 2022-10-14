// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;
pragma abicoder v2;
import "./types/Ownable.sol";


/// @notice this contract is used to handle storing bonds deatils 
contract OlympusProFactoryStorage is Ownable {
    
    /**
     * ===================================================
     * ----------------- STRUCT --------------------------
     * ===================================================
     */

    struct BondDetails {
        address _principalToken;
        address _treasuryAddress;
        address _bondAddress;
        address _stakingAddress;
        address _initialOwner;
        uint[] _tierCeilings;
        uint[] _fees;
    }
    
    /**
     * ===================================================
     * ----------------- STATE VARIABLE ------------------
     * ===================================================
     */

    BondDetails[] public bondDetails;
    address public olympusProFactory;
    mapping(address => uint) public indexOfBond;

    /**
     * ===================================================
     * ----------------- EVENT ---------------------------
     * ===================================================
     */

    event BondCreation(address treasury, address bond, address staking, address _initialOwner);
    
    /**
     * ===================================================
     * ----------------- FUNCTIONS -----------------------
     * ===================================================
     */
    
    function pushBond(address[5] memory addresses, uint[] calldata _tierCeilings, uint[] calldata _fees) external returns(address _treasury, address _bond, address _stake) {
        require(olympusProFactory == msg.sender, "Not Olympus Pro Factory");

        indexOfBond[addresses[2]] = bondDetails.length;
        
        bondDetails.push( BondDetails({
            _principalToken: addresses[0],
            _treasuryAddress: addresses[1],
            _bondAddress: addresses[2],
            _stakingAddress: addresses[3],
            _initialOwner: addresses[4],
            _tierCeilings: _tierCeilings,
            _fees: _fees
        }));

        emit BondCreation(addresses[1], addresses[2], addresses[3], addresses[0]);
        return( addresses[1], addresses[2], addresses[3] );
    }

    /**
        @notice changes olympus pro factory address
        @param _factory address
     */
    function setFactoryAddress(address _factory) external onlyPolicy() {
        olympusProFactory = _factory;
    }

    function fetchBondDetails() external view returns(BondDetails[] memory details) {
        details = bondDetails;
    }
}