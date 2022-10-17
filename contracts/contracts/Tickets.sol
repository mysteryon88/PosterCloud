// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Tickets is ERC721, ERC721Burnable, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address public posterAddress;

    constructor(string memory eventName, string memory abbreviation) ERC721(eventName, abbreviation) {
        posterAddress = msg.sender;
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}