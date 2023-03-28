// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//  import "hardhat/console.sol";

contract Token{
    string public name="Hardhat Token";
    string public symbol="HHT";
    uint public TotalSupply=1000;
    address public owner;

    mapping (address=>uint) balances;

    constructor(){
        balances[msg.sender]=TotalSupply;
        owner=msg.sender;
    }

    function transfer(address to , uint256 amount) external  {
        // console.log("**Sender Balance is %s**",balances[msg.sender]);
        // console.log("**The amount %s is sent to %s account**",amount,to);
        require(balances[msg.sender]>=amount,"Not enough tokens");
        balances[msg.sender]-=amount;
        balances[to]+=amount;
        
    }
    function balanceof(address account) external view returns(uint256){
        return balances[account];
    }
}
