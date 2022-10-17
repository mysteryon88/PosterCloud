// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Tickets.sol";

contract Poster {
    struct Event {
        string eventName;
        string description;
        uint price;
        uint numberTickets;
    }

    struct Organizer {
        string organizerName;
        mapping(address => Event) events;
    }

    mapping(address => Organizer) public organizers;

    function registration(string memory name) external payable {
        //require(msg.value < 10000000000000000 , "It is necessary to make a contribution of 0.01 Ether");
        organizers[msg.sender].organizerName = name;
    }

    function createEvent(
        string memory eventName,
        string memory abbreviation,
        uint price,
        uint numberTickets
    ) external {
        Tickets tickets = new Tickets(eventName, abbreviation);
        organizers[msg.sender].events[address(tickets)].eventName = eventName;
        organizers[msg.sender].events[address(tickets)].price = price;
        organizers[msg.sender]
            .events[address(tickets)]
            .numberTickets = numberTickets;
    }

    function buyTicket(address organizer, address events/*, uint count*/) external payable {
        require(
            msg.value == organizers[organizer].events[events].price,
            "Need the correct amount"
        );
        
    }

    receive() external payable {}

    fallback() external payable {}
}
