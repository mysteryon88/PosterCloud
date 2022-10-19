// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Tickets.sol";

contract Poster {
    struct Event {
        string description;
        string URI;
        uint price;
        uint numberTickets;
        uint totalTickets;
        address tickets;
    }

    struct Organizer {
        string organizerName;
        mapping(string => Event) events; //event title - Event
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
        uint totalTickets
    ) external {
        Tickets tickets = new Tickets(eventName, abbreviation);
        //address _tickets = address(tickets);
        organizers[msg.sender].events[eventName].price = price;
        organizers[msg.sender].events[eventName].totalTickets = totalTickets;
        organizers[msg.sender].events[eventName].tickets = address(tickets);
    }

    function buyTicket(
        address organizer,
        string memory eventName /*, uint count*/
    ) external payable {
        require(
            msg.value == organizers[organizer].events[eventName].price,
            "Need the correct amount"
        );
        require(
            organizers[msg.sender].events[eventName].numberTickets ==
                organizers[msg.sender].events[eventName].totalTickets,
            "Sold out!"
        );
        ITicket ticket = ITicket(
            organizers[organizer].events[eventName].tickets
        );
        ticket.safeMint(msg.sender, "URI");
        organizers[msg.sender].events[eventName].numberTickets++;
    }

    receive() external payable {}

    fallback() external payable {}
}
