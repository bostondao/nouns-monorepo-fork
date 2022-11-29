// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

contract BostonManager {
    uint public reservePrice;

    // Sets reserve price on contract deploy
    constructor(uint _reservePrice) {
        reservePrice = _reservePrice;
    }

    // Returns reservePrice
    function getReservePrice() public view returns (uint) {
        return reservePrice;
    }

    // TODO: set reserve price based on if caller is owner (Boston DAO)
}
