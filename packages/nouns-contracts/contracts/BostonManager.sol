// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

contract BostonManager {
    uint256 public reservePrice;
    uint8 public minBidIncrementPercentage;
    uint256 public duration;
    uint256 public timeBuffer;

    // Sets reserve price on contract deploy
    constructor(uint256 _reservePrice, uint8 _minBidIncrementPercentage, uint256 _duration, uint256 _timeBuffer) {
        reservePrice = _reservePrice;
        minBidIncrementPercentage = _minBidIncrementPercentage;
        duration = _duration;
        timeBuffer = _timeBuffer;
    }

    // Returns reservePrice
    function getReservePrice() public view returns (uint256) {
        return reservePrice;
    }

    // returns minBidIncrementPercentage
    function getMinBidIncrementPercentage() public view returns (uint8) {
        return minBidIncrementPercentage;
    }

    // Returns duration of auction
    function getDuration() public view returns (uint256) {
        return duration;
    }

    // Returns timeBuffer
    function getTimeBuffer() public view returns (uint256) {
        return timeBuffer;
    }

    // TODO: set reserve price based on if caller is owner (Boston DAO)
}
