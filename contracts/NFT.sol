// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFT template V1
 * @author txbias.eth
 * @dev Uses ERC721 non-fungible token standard. Effort was made to reduce gas cost, however, OZ ERC721Enumerable is a gas-heavy contract.
 */
contract NFT is ERC721Enumerable, Ownable {
    string public _baseTokenURI;

    bool public saleIsActive;

    uint256 public reserved = 10;

    uint256 public constant MINT_PRICE = 0.08 ether;

   /**
    * @dev Intialize contract with ipfs URI
    */
    constructor(string memory _initBaseURI) ERC721("Genesis NFTs", "NFT") {
        setBaseURI(_initBaseURI);
    }

   /**
    * @dev Get the baseURI
    */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    //=======PUBLIC USE FUNCTIONS=======//

   /**
    * @dev Mint function. Uses OZ _safeMint()
    */
    function mint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(saleIsActive, "Sale paused");
        require(_mintAmount < 2, "Only mint 2 at one time");
        require(supply + _mintAmount <= 100 - reserved, "Sold out");
        require(msg.value >= MINT_PRICE * _mintAmount, "Wrong ETH value");

        for (uint256 i; i < _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

   /**
    * @dev Get the number of tokens in a owners wallet
    */
    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    //=======OWNABLE FUNCTIONS=======//

   /**
    * @dev The owner can change the baseURI
    */
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
    * @dev The owner can mint reserved NFTs to an address
    */
    function mintReserved(address _to, uint256 _mintAmount) external onlyOwner {
        require(_mintAmount <= reserved, "Exceeds reserved supply");

        uint256 supply = totalSupply();
        for (uint256 i; i < _mintAmount; i++) {
            _safeMint(_to, supply + i);
        }

        reserved -= _mintAmount;
    }

    /**
    * @dev Change the state of sale.
    */
    function toggleSaleIsActive() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    /**
    * @dev Withdraw all funds in the contract
    */
    function withdraw() public onlyOwner {
        (bool itWorked, ) = msg.sender.call{value: address(this).balance}("");
        require(itWorked, "Withdraw failed");
    }
}