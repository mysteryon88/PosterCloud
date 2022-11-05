// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

//import "./Tickets/Tickets.sol";
import "./Tickets.sol";

contract Poster {
    struct Event {
        string description;
        string uri;
        uint price;
        uint totalTickets;
        address tickets;
        uint date;
    }

    struct Organizer {
        address organizerAddr;
        mapping(string => Event) events; //event title - Event
    }

    struct Clients {
        string name;
        address[] tickets;
    }

    string[] public organizersName;

    mapping(address => string) public orgAddrToName; // addr - name

    mapping(string => Organizer) public organizers; //name - Organizer

    mapping (address => Clients) clients; //clients - tickets

    event orgRegistered(string indexed orgName, address ordAddr);

    event eventCreated(
        string indexed orgName,
        string indexed eventName,
        address tickets
    );

    event bought(uint _timestamp);

    receive() external payable {}

    fallback() external payable {}

    function registration(string memory orgName) external payable {
        //require(msg.value < 10000000000000000 , "It is necessary to make a contribution of 0.01 Ether");ы
        organizers[orgName].organizerAddr = msg.sender;
        orgAddrToName[msg.sender] = orgName;
        organizersName.push(orgName);
        emit orgRegistered(orgName, msg.sender);
    }

    function createEvent(
        string memory eventName,
        string memory abbreviation,
        string memory uri,
        string memory description,
        uint256 price,
        uint256 totalTickets,
        uint256 date
    ) external onlyOrganizers {
        string memory name = orgAddrToName[msg.sender];

        Tickets tickets = new Tickets(eventName, abbreviation, totalTickets);

        Event memory _event;

        _event.price = price;
        _event.totalTickets = totalTickets;
        _event.tickets = address(tickets);
        _event.uri = uri;
        _event.date = date;
        _event.description = description;

        organizers[name].events[eventName] = _event;
    }

    function buyTickets(
        string memory organizer,
        string memory eventName,
        uint256 count
    ) external payable {
        Event memory _event = organizers[organizer].events[eventName];

        require(msg.value == (_event.price * count), "Need the correct amount");
        ITickets ticket = ITickets(_event.tickets);
        
        require(_event.totalTickets - count >= 0, "Choose fewer tickets");
        
        //mint tickets
        for (uint8 i = 0; i < count; ++i) {
            ticket.safeMintTicket(msg.sender, _event.uri);
            _event.totalTickets--;
        }
        organizers[organizer].events[eventName] = _event;
    }

    function ticketRefund(
        string memory organizer,
        string memory eventName,
        uint256 ticketId
    ) external payable {
        Event memory _event = organizers[organizer].events[eventName];
        payable(msg.sender).transfer(_event.price);
        ITickets ticket = ITickets(_event.tickets);
        ticket.burnTicket(ticketId);
    }

    function getEvent(string memory organizer, string memory eventName)
        public
        view
        returns (Event memory)
    {
        return organizers[organizer].events[eventName];
    }

    modifier onlyOrganizers() {
        require(
            keccak256(abi.encodePacked(orgAddrToName[msg.sender])) !=
                keccak256(""),
            "You are not registered as an organizer"
        );
        _;
    }
}
