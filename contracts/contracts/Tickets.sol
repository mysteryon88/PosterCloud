// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface ITickets {
    function safeMintTicket(address to, string memory uri) external;
    function burnTicket(uint256 tokenId) external;
    function getTotalTickets() external view returns (uint256);
}

contract Tickets is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping (address => uint256[]) private clientsTicketId;

    address private posterAddress;

    uint256 private totalTickets;

    constructor(string memory eventName, string memory abbreviation, uint256 _totalTickets)
        ERC721(eventName, abbreviation)
    {
        posterAddress = msg.sender;
        totalTickets = _totalTickets;
    }

    function getTotalTickets() external view returns(uint256){
        return totalTickets;
    }

    function safeMintTicket(address to, string memory uri) external onlyPoster {
        require(totalTickets != 0, "Sold out!");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        clientsTicketId[to].push(tokenId);
        totalTickets--;
    }

    function burnTicket(uint256 tokenId) external onlyPoster {
        //require(ERC721.ownerOf(tokenId) == msg.sender, "You are not owner!");
        _burn(tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    modifier onlyPoster() {
        require( posterAddress == msg.sender,
            "You are not registered as an organizer"
        );
        _;
    }
}
