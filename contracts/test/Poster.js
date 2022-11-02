const { expect } = require("chai");
const { ethers } = require("hardhat");
const abi  = require( './abi.json') ;

describe("Poster", function () {
  let owner, name1, name2, client1, client2, poster

  before(async function () {
    [owner, name1, name2, client1, client2] = await ethers.getSigners()
    const Poster = await ethers.getContractFactory("Poster", owner)
    poster = await Poster.deploy()

    return { poster, name1, name2, client1, client2 }
  })

  it("should be deployed", async function () {
    expect(poster.address).to.be.properAddress
  })

  it("function registration", async function () {

    await poster.connect(name1).registration("Name #1")
    await poster.connect(name2).registration("Name #2")

    expect(await poster.orgAddrToName(name1.address)).to.eq("Name #1")
    expect(await poster.orgAddrToName(name2.address)).to.eq("Name #2")

    expect(await poster.orgAddrToName(client1.address)).to.eq("")

    expect(await poster.organizersName(0)).to.eq("Name #1")
    expect(await poster.organizersName(1)).to.eq("Name #2")
  })

  it("function createEvent + modifier onlyOrganizers", async function () {
    await poster.connect(name1).createEvent("eventName", "ENA", "uri", "description", 100, 100, 23432)

    expect(await poster.organizers("Name #1")).to.eq(name1.address)

    const event = await poster.getEvent("Name #1", "eventName")
    expect(event[0]).to.eq("description")
    expect(event[1]).to.eq("uri")

    expect(event[4]).to.be.properAddress //ticket address
  })

  it("modifier onlyOrganizers", async function () {

    await expect(poster.connect(client1)
      .createEvent("eventName", "ENA", "uri", "description", 100, 100, 23432))
      .to.be.revertedWith("You are not registered as an organizer");

  })

  it("function buyTickets", async function () {

    await poster.connect(client1).buyTickets("Name #1", "eventName", 2, { value: 200 })

    const event = await poster.getEvent("Name #1", "eventName")
    expect(event[3]).to.eq(98) //number of tickets

    const tickets = new ethers.Contract(event[4], abi, owner);

    expect(await tickets.balanceOf(client1.address)).to.eq(2)
    expect(await tickets.name()).to.eq("eventName")
    expect(await tickets.symbol()).to.eq("ENA")
  })
});

