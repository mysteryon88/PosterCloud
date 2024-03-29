// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Tickets.sol";

//https://sepolia.etherscan.io/address/0x2088A990D6A8c42A953F78bBd276d83775b61d5b
//http://localhost:3000/check?eventid=123&ticketid=456

contract PosterCloud {
    struct Event {
        string name;
        string info;
        uint256 timestamp;
        address nftAddress;
    }

    address private owner;
    Event[] private events;

    event EventCreated(
        uint256 indexed eventId,
        string indexed name,
        address nftAddress,
        uint256 blockTimestamp
    );
    event EventEdited(uint256 indexed eventId, uint256 blockTimestamp);
    event EventDeleted(uint256 indexed eventId, uint256 blockTimestamp);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier validEventId(uint256 _eventId) {
        require(_eventId < events.length, "Event ID out of range");
        _;
    }

    function addEvent(
        string memory _name,
        uint256 _timestamp,
        string memory _info,
        uint256 _totalTickets
    ) public onlyOwner {
        Tickets nftAddress = new Tickets(_name, _totalTickets);

        events.push(Event(_name, _info, _timestamp, address(nftAddress)));
        emit EventCreated(
            events.length - 1,
            _name,
            address(nftAddress),
            block.timestamp
        );
    }

    function editEvent(
        uint256 _eventId,
        string memory _name,
        uint256 _timestamp,
        string memory _info
    ) public onlyOwner validEventId(_eventId) {
        Event storage eventToEdit = events[_eventId];
        eventToEdit.name = _name;
        eventToEdit.timestamp = _timestamp;
        eventToEdit.info = _info;

        emit EventEdited(_eventId, block.timestamp);
    }

    function deleteEvent(
        uint256 _eventId
    ) public onlyOwner validEventId(_eventId) {
        if (_eventId < events.length - 1) {
            events[_eventId] = events[events.length - 1];
        }

        events.pop();

        emit EventDeleted(_eventId, block.timestamp);
    }

    function mintTicket(
        uint256 _eventId,
        string memory _uri,
        address _to
    ) public onlyOwner validEventId(_eventId) returns (uint256) {
        Event storage eventToMint = events[_eventId];

        Tickets(eventToMint.nftAddress).safeMint(_to, _uri);

        return block.timestamp;
    }

    function burnTicket(
        uint256 _eventId,
        uint256 _tockenId
    ) public onlyOwner validEventId(_eventId) returns (uint256) {
        Event storage eventToMint = events[_eventId];

        Tickets(eventToMint.nftAddress).burn(_tockenId);

        return block.timestamp;
    }

    function getEventsCount() public view returns (uint256) {
        return events.length;
    }

    function getEventInfo(
        uint256 _eventId
    )
        public
        view
        validEventId(_eventId)
        returns (string memory, uint256, string memory, address)
    {
        Event storage eventToGet = events[_eventId];
        return (
            eventToGet.name,
            eventToGet.timestamp,
            eventToGet.info,
            eventToGet.nftAddress
        );
    }

    function getTicketsFromEvent(
        uint256 _eventId
    ) public view validEventId(_eventId) returns (address) {
        Event storage eventToGet = events[_eventId];
        return eventToGet.nftAddress;
    }

    function checkTicket(
        uint256 _eventId,
        uint256 _tockenId
    ) public view validEventId(_eventId) returns (bool) {
        Event storage eventToCheck = events[_eventId];
        return Tickets(eventToCheck.nftAddress).checkTicket(_tockenId);
    }

    function setTicket(
        uint256 _eventId,
        uint256 _tockenId
    ) public onlyOwner validEventId(_eventId) {
        Event storage eventToSet = events[_eventId];
        Tickets(eventToSet.nftAddress).setTicket(_tockenId);
    }
}
