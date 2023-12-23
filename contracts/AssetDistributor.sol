// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract AssetDistibutor {
	mapping (address => uint) balances;
	address owner;

	constructor() {
		owner = msg.sender;
	}

	function addBalance(address sender) external payable{
		balances[sender] += msg.value;
	}

	function showBalance(address addr) external view returns (uint) {
		return balances[addr];
	}

	function checkContractBalance() external view returns (uint) {
		return address(this).balance;
	}


}
