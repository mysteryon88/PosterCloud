// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Tickets.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Poster {
 
    constructor() {
       // createTickets("winter", "WNT");
    }

    //Create a ticket for an event
    function createTickets(string memory eventName, string memory abbreviation) public {
        Tickets tickets = new Tickets(eventName, abbreviation);
        
    }
}
