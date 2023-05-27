// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Tickets is ERC721, ERC721URIStorage, ERC721Burnable {
    uint256 private currentId;
    uint256 private total;
    address private owner;
    mapping(uint256 => bool) verifier;

    constructor(string memory name, uint256 _total) ERC721(name, "TIK") {
        owner = msg.sender;
        total = _total;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier validEventId(uint256 tokenId) {
        require(tokenId < currentId, "Token ID out of range");
        _;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = currentId++;
        require(total > tokenId, "Sold out");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) onlyOwner {
        super._burn(tokenId);
    }

    function burn(uint256 tokenId) public override onlyOwner {
        _burn(tokenId);
        total++;
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721, ERC721URIStorage)
        onlyOwner
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function checkTicket(uint256 tokenId) public view onlyOwner validEventId(tokenId) returns (bool) {
        return verifier[tokenId];
    }

    function setTicket(uint256 tokenId) public onlyOwner validEventId(tokenId){
        verifier[tokenId] = true;
    }
}
