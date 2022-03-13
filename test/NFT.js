const { assert, expect } = require("chai"); //get assertions
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

// //create a group of test cases w describe()
// describe("NFT contract", function() {
//     // before(async () => {
//     //     [
//     //         owner,
//     //         address1, 
//     //         address2
//     //     ] = await ethers.getSigners();

//         // priceInWei = "80000000000000000";

//         const [owner] = await ethers.getSigners()

//         Contract =   await ethers.getContractFactory("NFT")
//         contract = await Contract.deploy("ipfs://generation-0/")
//         contract = await contract.deployed()
//     // });

//     // it("Should deploy", async () => {
//     //     address = contract.address
//     //     assert.notEqual(address, '')
//     //     assert.notEqual(address, 0x0)
//     //     assert.notEqual(address, null)
//     //     assert.notEqual(address, undefined)

//     // })
    

//     it("Should toggle saleIsActive", async () => {
//         const tx = await contract.toggleSaleIsActive;
//         tx.wait()
//         assert.equal((await contract.saleIsActive()).toString(), "true")
//     })
// });

// tokenUri = await contract.tokenURI(1);
// assert.equal(tokenUri.includes(`ipfs://generation-zero/`), true);

describe("NFT", () => {
 it("should deploy contract", async() => {
     const NFTContract = await ethers.getContractFactory("NFT");
     const nftContract = await NFTContract.deploy("ipfs://generation-0/")
    
     
    expect(await nftContract.setBaseURI("ipfs://generation-0/").toString("ipfs://generation-0/"));
 })
});
