// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ownable.sol";
import "./safemath.sol";


contract PackMarket is Ownable{

    using SafeMath for uint256;

    uint256 public packPrice = 0.0001 ether;
    uint256 public packsAvailable = 100;
    uint256 public totalPacksSold = 0;

    event PackPurchased(address indexed buyer, uint256 packId);

    function purchasePack() public payable {
        require(packsAvailable > 0, "All card packs are currently sold out");
        require(msg.value == packPrice, "Incorrect payment amount");

        totalPacksSold = totalPacksSold.add(1);
        packsAvailable = packsAvailable.sub(1);

        emit PackPurchased(msg.sender, totalPacksSold);
    }

    receive() external payable {
        purchasePack();
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function updatePacksAvailable(uint256 newQty) external onlyOwner {
        // reset the number of packs available
        packsAvailable = newQty;
    }    
    
    function updatePackPrice(uint256 newPrice) external onlyOwner {
        // newPrice in wei
        packPrice = newPrice;
    }

    function getPacksAvailable() external view returns (uint) {
        return packsAvailable;
    }

    function getTotalPacksSold() external view returns (uint) {
        return totalPacksSold;
    }
}