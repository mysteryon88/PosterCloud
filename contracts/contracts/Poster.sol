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
        address organizerAddr;
        mapping(string => Event) events; //event title - Event
    }

    string[] organizersName;

    mapping(address => string) public orgAddrToName; // addr - name

    mapping(string => Organizer) public organizers; //name - Organizer

    receive() external payable {}

    fallback() external payable {}

    function registration(string memory orgName) external payable {
        //require(msg.value < 10000000000000000 , "It is necessary to make a contribution of 0.01 Ether");
        //organizers[msg.sender].organizerName = name;
        organizers[orgName].organizerAddr = msg.sender;
        orgAddrToName[msg.sender] = orgName;
        organizersName.push(orgName);
    }

    function createEvent(
        string memory eventName,
        string memory abbreviation,
        uint price,
        uint totalTickets
    ) external {
        Tickets tickets = new Tickets(eventName, abbreviation);
        string memory name = orgAddrToName[msg.sender];
        Event memory _event = organizers[name].events[eventName];
        //address _tickets = address(tickets);
        _event.price = price;
        _event.totalTickets = totalTickets;
        _event.tickets = address(tickets);
    }

    function buyTicket(
        string memory organizer,
        string memory eventName /*, uint count*/
    ) external payable {
        Event memory _event = organizers[organizer].events[eventName];
        require(msg.value == _event.price, "Need the correct amount");
        require(_event.numberTickets == _event.totalTickets, "Sold out!");
        ITicket ticket = ITicket(_event.tickets);
        ticket.safeMint(msg.sender, _event.URI);
        _event.numberTickets++;
    }
}
