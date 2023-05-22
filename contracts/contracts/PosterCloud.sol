// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Tickets.sol";

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
        uint256 indexed timestamp,
        string info,
        address nftAddress,
        uint256 blockTimestamp
    );
    event EventEdited(
        uint256 indexed eventId,
        string indexed name,
        uint256 indexed timestamp,
        string info,
        uint256 blockTimestamp
    );
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
            _timestamp,
            _info,
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

        emit EventEdited(_eventId, _name, _timestamp, _info, block.timestamp);
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

    function getEventsCount() public view returns (uint256) {
        return events.length;
    }

    function getEvent(
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
}
