// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract GetRandomNumbers is VRFConsumerBase, ConfirmedOwner(msg.sender) {
    // variables
    bytes32 private keyHash;
    uint private fee;
    uint public randomResult;

    //  constructor
    //  vrfCoordinator: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
    //  LINK address: 0xa36085F69e2889c224210F603D836748e7dC0088
    //  keyHash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
    //  fee: 100000000000000000
    constructor() VRFConsumerBase(0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9,
        0xa36085F69e2889c224210F603D836748e7dC0088
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18 ;
    }
    function getRandomNumber()public returns(bytes32 requestId){
        return requestRandomness(keyHash,fee);
    }
    function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
        randomResult = _randomness;
    }
}