const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Contract", () => {

    beforeEach(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();

        priceInWei = "80000000000000000"

        NFT = await ethers.getContractFactory("NFT");
        nft = await NFT.deploy("ipfs://mockCID/")

        nft = await nft.deployed()
        
    });

    describe("Deployment", () => {
        it("should set the correct owner", async () => {
            expect(await nft.owner()).to.equal(owner.address)
        });
        it("should set right BaseURI", async() => {
           expect(await nft.setBaseURI("ipfs://mockCID/").toString("ipfs://mockCID/"));
        })
        it("should be able to toggle saleIsActive", async () => {
            await nft.toggleSaleIsActive()
            assert.equal((await nft.saleIsActive()).toString(), "true")
        });
        it("should have the right price", async () => {
            price = await nft.MINT_PRICE()
            assert.equal(price.toString(), priceInWei)
        });
    });

    describe("Mint NFTs", () => {
        it("should mint an NFT", async () => {
            await nft.toggleSaleIsActive()
            const price = await nft.MINT_PRICE()
            await nft.mint(1,{value: price})
            const tokensMinted = await nft.totalSupply()
            await expect(tokensMinted).to.equal(1)
        });
    });

    describe("Withdraw funds", () => {
        it("should fail to withdraw funds to msg.sender", async () => {
            const tx = nft.connect(addr1).withdraw();
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });
        it("should withdraw funds to msg.sender", async () => {
            const tx = nft.connect(owner).withdraw();
        });
    });
});