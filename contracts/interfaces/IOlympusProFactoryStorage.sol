// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

interface IOlympusProFactoryStorage {
    function pushBond(address[5] memory _addresses, uint[] calldata _tierCeilings, uint[] calldata _fees) external returns(address _treasury, address _bond);
}