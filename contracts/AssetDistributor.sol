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
	
	function witchDrawToAccount(address payable addr, uint amount) external {
		require(msg.sender == owner, "Only owner can withdraw");
		require(amount <= address(this).balance, "Not enough balance");
		addr.transfer(amount);
	}


}
