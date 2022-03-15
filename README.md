# NFT template V1

This is a basic NFT (ERC721) template.

This project uses [Hardhat](https://hardhat.org/) for development.

## Use cases

- Need to change the URI at a later date
- Need to be able to change the sale state (true or false)
- Need to be able to reserve NFTs and mint the reserved for free
- Need to be able to see all tokenIds inside an owners wallet

## On testing

Some great testing resources:
- https://dev.to/stermi/how-to-create-tests-for-your-solidity-smart-contract-2238
- https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/test/token/ERC721/ERC721.behavior.js
- https://hardhat.org/tutorial/testing-contracts.html
- https://dev.to/jacobedawson/import-test-a-popular-nft-smart-contract-with-hardhat-ethers-12i5
- https://hardhat.org/tutorial/testing-contracts.html

## On gas optimization

Using OpenZeppelin is convenient and safe, however, `ERC721Enumerable.sol` is well known to be very gas-heavy. I have coded the contract to reduce gas usage as much as possible but still use OZ `ERC721Enumberale.sol`. Soon, I plan to make another template that removes the need for OZ `ERC721Enumberale.sol`.

## Hardhat shell commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```
