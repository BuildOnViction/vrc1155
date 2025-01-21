// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6;

import "./Address.sol";
import "./SafeMath.sol";

/**
 * @title Lite VRC25 implementation
 * @notice Lite VRC25 implementation for opt-in to gas sponsor program. This replace Ownable from OpenZeppelin as well.
 */
abstract contract VRC25 {
    using Address for address;
    using SafeMath for uint256;

    // The order of _balances, _minFeem, _issuer must not be changed to pass validation of gas sponsor application
    mapping (address => uint256) private _balances;
    uint256 private _minFee;
    address private _owner;
    address private _newOwner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == msg.sender, "VRC25: caller is not the owner");
        _;
    }

    /**
     * @notice Returns the amount of tokens owned by `account`. This is used for apply FreeGas only.
     * @param account The address to query the balance of.
     * @return An uint256 representing the amount owned by the passed address.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @notice Owner of the token. This is used for apply FreeGas only.
     */
    function issuer() public view returns (address) {
        return _owner;
    }

    /**
     * @notice Owner of the token.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev The amount fee that will be lost when transferring. This is used for apply FreeGas only.
     */
    function minFee() public view returns (uint256) {
        return _minFee;
    }

    /**
     * @dev Accept the ownership transfer. This is to make sure that the contract is
     * transferred to a working address
     *
     * Can only be called by the newly transfered owner.
     */
    function acceptOwnership() external {
        require(msg.sender == _newOwner, "VRC25: only new owner can accept ownership");
        address oldOwner = _owner;
        _owner = _newOwner;
        _newOwner = address(0);
        emit OwnershipTransferred(oldOwner, _owner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     *
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) external virtual onlyOwner {
        require(newOwner != address(0), "VRC25: new owner is the zero address");
        _newOwner = newOwner;
    }
}
