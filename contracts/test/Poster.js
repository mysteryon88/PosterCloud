const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Poster", function () {
  let owner

  beforeEach(async function () {
    [owner] = await ethers.getSigners()
    const Poster = await ethers.getContractFactory("Poster", owner)
    poster = await Poster.deploy()
    await poster.deployed()
  })

  it("should be deployed", async function () {
    expect(poster.address).to.be.properAddress
  })

  it("check deploy", async function () {
    let addr = await poster.addr(0)
    console.log(addr)
    
  })

});