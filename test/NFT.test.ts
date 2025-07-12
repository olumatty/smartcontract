import { expect } from "chai";
import { ethers } from "hardhat";
import { NFT__factory } from "../typechain-types";

describe("NFT Contract", function () {
  it("should deploy the contract", async function () {
    const [_, addrl] = await ethers.getSigners();
    const NFTFactory = (await ethers.getContractFactory(
      "NFT",
      addrl
    )) as NFT__factory;

    const nft = await NFTFactory.deploy("NFT", "NFT", "https://nft.api.com/");

    await nft.deploymentTransaction()?.wait();

    const mintPrice = ethers.parseEther("0.01");
    await nft.connect(addrl).mint(1, { value: mintPrice });

    const totalSupply = await nft.totalSupply();
    expect(totalSupply).to.equal(1);

    const ownerOfToken = await nft.ownerOf(1);
    expect(ownerOfToken).to.equal(addrl.address);
  });
});
